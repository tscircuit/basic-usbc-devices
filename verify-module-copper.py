"""Audit physical connectivity of a finished Circuit JSON, including pours.
Run: python3 verify-module-copper.py display buzzer resetter
"""
import argparse,json,math
from pathlib import Path
from shapely.geometry import Point,LineString,Polygon,box
from shapely.affinity import rotate
from shapely.ops import unary_union

def audit(name, directory, check_shorts=False):
 j=json.load(open(directory / f'{name}.circuit.json'));parent={}
 def root(x):
  while x in parent:x=parent[x]
  return x
 def join(xs):
  for x in xs[1:]:
   a,b=root(xs[0]),root(x)
   if a!=b:parent[b]=a
 for t in j:
  if t['type']=='source_trace':join(t['connected_source_port_ids']+t['connected_source_net_ids'])
 for t in j:
  if t['type']=='source_component_internal_connection':join(t['source_port_ids'])
 pp={e['pcb_port_id']:e for e in j if e['type']=='pcb_port'}
 for e in j:
  if e['type']=='pcb_via':join([pp[p]['source_port_id'] for p in e.get('pcb_port_ids',[])])
 sts={e['source_trace_id']:e for e in j if e['type']=='source_trace'}
 labels={root(e['source_net_id']):e['name'] for e in j if e['type']=='source_net'}
 if name == 'button':
  # The supplier drawing connects across each row of the C2930544 footprint.
  switch = next(e for e in j if e['type']=='source_component' and e['name']=='SW1')
  pin_nets = {e['pin_number']: labels.get(root(e['source_port_id'])) for e in j
              if e['type']=='source_port' and e['source_component_id']==switch['source_component_id']}
  assert pin_nets == {1:'GND', 3:'GND', 2:'CONTACT', 4:'CONTACT'}, pin_nets
 shapes=[];bridges=[];pads=[]
 def shape(p):
  if p['shape']=='polygon':return Polygon([(q['x'],q['y']) for q in p['points']])
  x,y=p['x'],p['y'];w=p.get('width',p.get('outer_width',p.get('outer_diameter',p.get('radius',0)*2)));h=p.get('height',p.get('outer_height',p.get('outer_diameter',p.get('radius',0)*2)))
  if p['shape']=='circle':return Point(x,y).buffer(p.get('radius',w/2))
  if p['shape'] in ['pill','rotated_pill']:
   g=LineString([(-max(0,w-h)/2,-max(0,h-w)/2),(max(0,w-h)/2,max(0,h-w)/2)]).buffer(min(w,h)/2)
   from shapely.affinity import translate
   return translate(rotate(g,p.get('ccw_rotation',0),origin=(0,0)),x,y)
  return rotate(box(x-w/2,y-h/2,x+w/2,y+h/2),p.get('ccw_rotation',0),origin=(x,y))
 for e in j:
  if e['type'] in ['pcb_smtpad','pcb_plated_hole']:
   port=pp.get(e.get('pcb_port_id'))
   if not port:continue
   net=root(port['source_port_id']);g=shape(e)
   layers=e.get('layers',['top','bottom']) if e['type']=='pcb_plated_hole' else [e['layer']]
   for l in layers:shapes.append((net,l,g));pads.append((net,l,g,port['source_port_id']))
   if len(layers)>1:bridges.append((net,g.centroid.x,g.centroid.y))
  elif e['type']=='pcb_trace':
   st=sts.get(e['source_trace_id']);net=root(st['connected_source_port_ids'][0] if st else e['source_trace_id'])
   for a,b in zip(e['route'],e['route'][1:]):
    if a['route_type']==b['route_type']=='wire' and a['layer']==b['layer'] and math.hypot(a['x']-b['x'],a['y']-b['y'])>1e-8:
     shapes.append((net,a['layer'],LineString([(a['x'],a['y']),(b['x'],b['y'])]).buffer(a['width']/2)))
  elif e['type']=='pcb_via':
   ids=e.get('pcb_port_ids',[])
   if ids:net=root(pp[ids[0]]['source_port_id'])
   else:
    t=next((t for t in j if t['type']=='pcb_trace' and any(p['route_type']=='via' and math.hypot(p['x']-e['x'],p['y']-e['y'])<1e-5 for p in t['route'])),None)
    if not t:raise AssertionError('Via has no physical net')
    st=sts.get(t['source_trace_id']);net=root(st['connected_source_port_ids'][0] if st else t['source_trace_id'])
   for l in e['layers']:shapes.append((net,l,Point(e['x'],e['y']).buffer(e['outer_diameter']/2)))
   bridges.append((net,e['x'],e['y']))
  elif e['type']=='pcb_copper_pour':
   assert e['shape']=='brep';s=e['brep_shape'];ring=lambda r:[(p['x'],p['y']) for p in r['vertices']]
   g=Polygon(ring(s['outer_ring']),[ring(r) for r in s.get('inner_rings',[])])
   assert g.is_valid
   shapes.append((root(e['source_net_id']),e['layer'],g))
 if check_shorts:
  from shapely.strtree import STRtree
  shorts=[]
  for layer in {layer for _,layer,_ in shapes}:
   layer_shapes=[(net,geom) for net,layer_name,geom in shapes if layer==layer_name and not geom.is_empty]
   geometries=[geom for _,geom in layer_shapes]
   tree=STRtree(geometries)
   for a,b in zip(*tree.query(geometries,predicate="intersects")):
    net_a,geom_a=layer_shapes[a];net_b,geom_b=layer_shapes[b]
    if a<b and net_a!=net_b and geom_a.intersection(geom_b).area>0.000001:
     shorts.append((layer,labels.get(net_a,net_a),labels.get(net_b,net_b)))
  assert not shorts,shorts
 disconnected={}
 for net in {n for n,l,g,p in pads}:
  chunks=[]
  for layer in {l for n,l,g in shapes if n==net}:
   u=unary_union([g.buffer(.00002) for n,l,g in shapes if n==net and l==layer])
   chunks += [(layer,g) for g in (list(u.geoms) if hasattr(u,'geoms') else [u]) if not g.is_empty]
  par=list(range(len(chunks)))
  def rt(i):
   while i!=par[i]:i=par[i]
   return i
  def merge(ids):
   for i in ids[1:]:par[rt(i)]=rt(ids[0])
  for n,x,y in bridges:
   if n==net:merge([i for i,(l,g) in enumerate(chunks) if g.distance(Point(x,y))<.001])
  for e in j:
   if e['type']=='source_component_internal_connection':
    own=[(l,g) for n,l,g,p in pads if n==net and p in e['source_port_ids']]
    merge([i for i,(l,g) in enumerate(chunks) if any(l==pl and g.intersects(pg) for pl,pg in own)])
  groups={rt(i) for i,(l,g) in enumerate(chunks) if any(n==net and pl==l and pg.intersects(g) for n,pl,pg,p in pads)}
  if len(groups)>1:
   disconnected[labels.get(net,net)]=len(groups)
   for group in groups:
    connected=[p for n,pl,pg,p in pads if n==net and any(rt(i)==group and pl==l and pg.intersects(g) for i,(l,g) in enumerate(chunks))]
    print('island',labels.get(net,net),[(next((e.get('name') for e in j if e['type']=='source_port' and e['source_port_id']==p),'?'), next(((e['x'],e['y']) for e in pp.values() if e['source_port_id']==p),None)) for p in set(connected)],flush=True)
 report=dict(checkedNets=len({n for n,l,g,p in pads}),disconnectedNets=disconnected,includesFinalGroundPour=True)
 if check_shorts:report['copperShorts']=shorts
 json.dump(report,open(directory / f'{name}.physical-connectivity.json','w'),indent=2)
 print(name,report,flush=True)
 assert not disconnected,disconnected
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--directory', type=Path, default=Path('output'))
parser.add_argument('--check-shorts', action='store_true', help='Test copper from different nets for overlap on each layer')
parser.add_argument('boards', nargs='+')
args = parser.parse_args()
for name in args.boards:
 audit(name, args.directory, args.check_shorts)
