"""Find silkscreen placements without changing any component or copper geometry."""
import json,math
from pathlib import Path
import numpy as np
from shapely.geometry import Point,Polygon,LineString,box
from shapely.ops import unary_union
from shapely.affinity import translate,scale,rotate
names=['limit','button','toggle','dial','position','distance','hub','display','resetter','buzzer']
font=json.load(open('branding/font-metrics.json'))
logo=unary_union([Polygon(p[0],p[1:])for p in json.load(open('branding/logo-polygons.json'))])
def text_shape(text,size):
 advance=lambda c:size*(font['spaceWidthRatio']if c==' 'else font['glyphAdvanceRatio'].get(c,font['glyphWidthRatio']))
 w=sum(map(advance,text))+(len(text)-1)*size*font['letterSpacingRatio'];x=-w/2;y=-size*.7/2
 lines=[]
 for c in text:
  for p in font['lineAlphabet'].get(c,[]):lines.append(LineString([(x+p['x1']*size*.7,y+p['y1']*size*.7),(x+p['x2']*size*.7,y+p['y2']*size*.7)]).buffer(size*font['strokeWidthRatio']/2))
  x+=advance(c)+size*font['letterSpacingRatio']
 return unary_union(lines)
def shape(e):
 x=e.get('x',e.get('center',{}).get('x',0));y=e.get('y',e.get('center',{}).get('y',0))
 if e.get('shape')=='polygon':return Polygon([(p['x'],p['y'])for p in e['points']])
 w=e.get('width',e.get('outer_width',e.get('outer_diameter',e.get('radius',0)*2)));h=e.get('height',e.get('outer_height',w))
 if e.get('shape')=='circle':g=Point(x,y).buffer(w/2)
 elif e.get('shape')in ['pill','rotated_pill']:
  g=LineString([(x-max(0,w-h)/2,y-max(0,h-w)/2),(x+max(0,w-h)/2,y+max(0,h-w)/2)]).buffer(min(w,h)/2)
 else:g=box(x-w/2,y-h/2,x+w/2,y+h/2)
 return rotate(g,e.get('ccw_rotation',0),origin=(x,y))
def obstacles(j,layer):
 items=[]
 for e in j:
  t=e['type']
  if t=='pcb_hole':items.append(Point(e['x'],e['y']).buffer(e['hole_diameter']/2+.3))
  elif t=='pcb_via':items.append(Point(e['x'],e['y']).buffer(e['hole_diameter']/2+.15))
  elif t=='pcb_plated_hole' or(t=='pcb_smtpad' and e['layer']==layer):items.append(shape(e).buffer(.2))
  elif t=='pcb_courtyard_outline'and e['layer']==layer:items.append(Polygon([(p['x'],p['y'])for p in e['outline']]).buffer(.15))
  elif t=='pcb_silkscreen_path'and e['layer']==layer and len(e['route'])>1:items.append(LineString([(p['x'],p['y'])for p in e['route']]).buffer(e.get('stroke_width',.1)/2+.15))
  elif t=='pcb_silkscreen_circle'and e['layer']==layer:items.append(Point(e['center']['x'],e['center']['y']).buffer(e['radius']+e.get('stroke_width',.1)/2+.15))
  elif t=='pcb_silkscreen_text'and e['layer']==layer:
   g=text_shape(e['text'],e['font_size']);a=e['anchor_position'];g=rotate(g,e.get('ccw_rotation',0),origin=(0,0));items.append(translate(g,a['x'],a['y']).buffer(.15))
  elif t in ['pcb_silkscreen_rect','pcb_silkscreen_pill','pcb_silkscreen_oval']and e['layer']==layer:items.append(shape(e).buffer(.15))
 return unary_union(items)
def search(art,obs,board):
 minx,miny,maxx,maxy=art.bounds;b0,b1,b2,b3=board.bounds
 options=[(x,y)for x in np.arange(b0-minx,b2-maxx+.001,.4)for y in np.arange(b1-miny,b3-maxy+.001,.4)]
 options.sort(key=lambda p:abs(p[0])*.5+abs(p[1]-3))
 for x,y in options:
  g=translate(art,x,y)
  if not g.intersects(obs) and board.covers(g):return [round(float(x),4),round(float(y),4)]
 return None
if __name__=='__main__':
 report={}
 for n in names:
  j=json.load(open('output/'+n+'.circuit.json'));j=[e for e in j if not any(k.endswith('_id')and isinstance(v,str)and v.startswith('branding_')for k,v in e.items())];b=next(e for e in j if e['type']=='pcb_board');board=box(-b['width']/2+.5,-b['height']/2+.5,b['width']/2-.5,b['height']/2-.5);back=obstacles(j,'bottom');front=obstacles(j,'top');result={}
  for size in [5,4.5,4]:
   variants=[{'logo':[-8.8,0],'text':[[2.8,1.1],[2.8,-1.1]]},{'logo':[0,3],'text':[[0,-1.3],[0,-3.5]]}]
   for v in variants:
    art=translate(scale(logo,size,size,origin=(0,0)),*v['logo']);art=unary_union([art]+[translate(text_shape(t,1.7),*pos)for t,pos in zip(['Made by AI','with tscircuit'],v['text'])]);art=scale(art,-1,1,origin=(0,0))
    xy=search(art,back,board)
    if xy:
     result['back']={'logo':{'x':xy[0]-v['logo'][0],'y':xy[1]+v['logo'][1],'size':size},'text':[{'text':t,'x':xy[0]-pos[0],'y':xy[1]+pos[1],'fontSize':1.7}for t,pos in zip(['Made by AI','with tscircuit'],v['text'])]};break
   if result:break
  if not result:raise RuntimeError('No rear branding position: '+n)
  for size in [4,3.5,3.2,3]:
   xy=search(box(-size/2,-size/2,size/2,size/2),front,board)
   if xy:result['front']={'x':xy[0],'y':xy[1],'size':size};break
  report[n]=result;print(n,result,flush=True)
 Path('branding/placements.json').write_text(json.dumps(report,indent=2)+'\n')
