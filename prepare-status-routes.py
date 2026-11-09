"""Seed incremental routing from a rendered board after route-<board>.ts export."""
import json,sys,math
from shapely.geometry import Point,LineString,Polygon,box
from shapely.ops import unary_union
from shapely.affinity import rotate
name=sys.argv[1];j=json.load(open(f'output/{name}.circuit.json'));netmap=json.load(open(f'output/{name}.net-map.json'));parent={}
def root(x):
 while x in parent:x=parent[x]
 return x
def join(xs):
 for x in xs[1:]:
  a,b=root(xs[0]),root(x)
  if a!=b:parent[b]=a
for e in j:
 if e['type']=='source_trace':join(e['connected_source_port_ids']+e['connected_source_net_ids'])
names={root(e['source_net_id']):e['name'] for e in j if e['type']=='source_net'}
traces={e['source_trace_id']:e for e in j if e['type']=='source_trace'};ports={e['pcb_port_id']:e for e in j if e['type']=='pcb_port'}
parts={e['source_component_id']:e['name'] for e in j if e['type']=='source_component'}
newpcs={e['pcb_component_id']for e in j if e['type']=='pcb_component' and 'STATUS'in parts.get(e['source_component_id'],'')}
obstacles=[]
for e in j:
 if e['type']!='pcb_smtpad' or e['pcb_component_id'] not in newpcs:continue
 n=names.get(root(ports[e['pcb_port_id']]['source_port_id']));x,y=e['x'],e['y'];w,h=e['width'],e['height'];g=rotate(box(x-w/2,y-h/2,x+w/2,y+h/2),e.get('ccw_rotation',0),origin=(x,y));obstacles.append((n,g))
cache=[];ripped=0
for t in j:
 if t['type']!='pcb_trace' or t.get('source_trace_id') not in traces and t.get('source_trace_id') not in parent and t.get('source_trace_id') not in names:continue
 sid=t['source_trace_id'];n=names.get(root(sid))
 if n is None:n=names[root(traces[sid]['connected_source_port_ids'][0])]
 if n in ['XI','XO']:continue
 ts=[]
 for a,b in zip(t['route'],t['route'][1:]):
  if a['route_type']==b['route_type']=='wire' and a['layer']==b['layer']=='top':ts.append(LineString([(a['x'],a['y']),(b['x'],b['y'])]).buffer(a['width']/2))
 for p in t['route']:
  if p['route_type']=='via':ts.append(Point(p['x'],p['y']).buffer(.3))
 g=unary_union(ts)
 if any(nn!=n and g.distance(gg)<.2 for nn,gg in obstacles):ripped+=1;continue
 t={**t,'source_trace_id':netmap[n],'connection_name':netmap[n]};cache.append(t)
json.dump(cache,open(f'{name}-routes.json','w'),indent=2);print(name,'seed',len(cache),'ripped',ripped)
