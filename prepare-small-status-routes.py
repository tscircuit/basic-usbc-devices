import json,sys
name=sys.argv[1];j=json.load(open(f'output/{name}.circuit.json'));parent={}
def root(x):
 while x in parent:x=parent[x]
 return x
for t in j:
 if t['type']=='source_trace':
  xs=t['connected_source_port_ids']+t['connected_source_net_ids']
  for x in xs[1:]:
   a,b=root(xs[0]),root(x)
   if a!=b:parent[b]=a
names={root(e['source_net_id']):e['name'] for e in j if e['type']=='source_net'}
sts={e['source_trace_id']:e for e in j if e['type']=='source_trace'}
netmap={names[root(t['connected_source_port_ids'][0])]:t['source_trace_id'] for t in sts.values() if t['connected_source_port_ids']}
checks=json.load(open(f'output/{name}.checks.json'));bad={e['pcb_trace_id']for e in checks['checks'] if e['type']=='pcb_trace_style_warning'}
cache=[]
for e in j:
 if e['type']!='pcb_trace' or e['pcb_trace_id']in bad:continue
 n=names[root(sts[e['source_trace_id']]['connected_source_port_ids'][0])];e['source_trace_id']=netmap[n];e['connection_name']=netmap[n];cache.append(e)
base=[e for e in j if not e['type'].endswith(('_error','_warning')) and e['type'] not in ['pcb_trace','pcb_via','pcb_copper_pour']]
json.dump(base,open(f'output/{name}.unrouted.json','w'),indent=2);json.dump(netmap,open(f'output/{name}.net-map.json','w'),indent=2);json.dump(cache,open(f'{name}-routes.json','w'),indent=2)
print(name,'removed',len(bad),'non-45-degree traces; retained',len(cache))
