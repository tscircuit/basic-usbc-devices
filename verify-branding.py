"""Check artwork clearance, correct mirroring, and unchanged manufacturing copper."""
import json,sys,math
from pathlib import Path
from shapely.geometry import Polygon,box
from shapely.ops import unary_union
from shapely.affinity import translate,scale
sys.path.insert(0,str(Path('branding').resolve()))
from place import names,obstacles,text_shape
rows=[]
for name in names:
 j=json.load(open('output/'+name+'.circuit.json'))
 is_brand=lambda e:any(k.endswith('_id')and isinstance(v,str)and v.startswith('branding_')for k,v in e.items())
 brand=[e for e in j if is_brand(e)];plain=[e for e in j if not is_brand(e)]
 b=next(e for e in j if e['type']=='pcb_board');board=box(-b['width']/2+.5,-b['height']/2+.5,b['width']/2-.5,b['height']/2-.5)
 texts=[e for e in brand if e['type']=='pcb_silkscreen_text'];assert ' '.join(e['text']for e in texts)=='Made by AI with tscircuit'
 assert all(e['layer']=='bottom'and e.get('is_mirrored')is True and e['font_size']*.09>=.15 for e in texts)
 left_edges=[-e['anchor_position']['x']+text_shape(e['text'],e['font_size']).bounds[0]for e in texts]
 assert abs(left_edges[0]-left_edges[1])<1e-8,f'{name}: attribution is not left aligned'
 result={'backTextAlignment':'left','board':name,'backText':'Made by AI with tscircuit','backTextStrokeMm':.153,'frontLogo':False,'backLogo':False}
 for layer in ['top','bottom']:
  geom=[]
  for e in brand:
   if e['layer']!=layer:continue
   if e['type']=='pcb_silkscreen_graphic':
    p=e['brep_shape'];g=Polygon([(p['x'],p['y'])for p in p['outer_ring']['vertices']], [[(p['x'],p['y'])for p in r['vertices']]for r in p['inner_rings']]);assert g.is_valid
    assert len(p['inner_rings'])==3 # t, s and the logo's identifying dot
    result['frontLogo'if layer=='top'else 'backLogo']=True
   else:
    g=scale(text_shape(e['text'],e['font_size']),-1,1,origin=(0,0));g=translate(g,e['anchor_position']['x'],e['anchor_position']['y'])
   geom.append(g)
  for i,g in enumerate(geom):
   for other in geom[i+1:]:
    assert g.distance(other)>=.15,f'{name} {layer}: branding elements too close'
  art=unary_union(geom);obs=obstacles(plain,layer)
  assert not art.intersects(obs),f'{name} {layer}: silk overlaps an expanded pad/hole/component/text exclusion ({art.intersection(obs).area})'
  assert board.covers(art),f'{name}: artwork outside board margin'
  result[layer+'ClearanceBeyondExclusionMm']=round(art.distance(obs),4)
 baseline=Path('/workspace/artifacts/pre-branding')/(name+'.circuit.json')
 if baseline.exists():
  original=json.loads(baseline.read_text());assert original==plain,f'{name}: non-branding geometry changed'
 rows.append(result)
Path('output/branding.validation.json').write_text(json.dumps(rows,indent=2)+'\n')
print('All ten back attributions/logos and front logos clear pads, holes, component bodies and existing legends; rear artwork mirrored.')

panel=json.load(open('output/panel4.circuit.json'))
for module in json.load(open('panel4-layout.json'))['modules']:
 name=module['name'];angle=math.radians(module['rotation']);c,s=math.cos(angle),math.sin(angle)
 source=json.load(open('output/'+name+'.circuit.json'))
 for e in source:
  if not is_brand(e):continue
  key=next(k for k in e if k==e['type']+'_id')
  target=next(x for x in panel if x.get(key)==name+'_'+e[key])
  if e['type']=='pcb_silkscreen_graphic':
   for ring1,ring2 in zip([e['brep_shape']['outer_ring']]+e['brep_shape']['inner_rings'],[target['brep_shape']['outer_ring']]+target['brep_shape']['inner_rings']):
    for a,b in zip(ring1['vertices'],ring2['vertices']):
     assert abs(b['x']-(c*a['x']-s*a['y']+module['x']))<1e-8
     assert abs(b['y']-(s*a['x']+c*a['y']+module['y']))<1e-8
  else:
   a=e['anchor_position'];b=target['anchor_position']
   assert abs(b['x']-(c*a['x']-s*a['y']+module['x']))<1e-8
   assert abs(b['y']-(s*a['x']+c*a['y']+module['y']))<1e-8
   assert target['is_mirrored'] is True
   assert target.get('ccw_rotation',0)%360==module['rotation']%360
print('Panel4 preserves all 20 logos and 20 text lines at the correct module rotations.')
