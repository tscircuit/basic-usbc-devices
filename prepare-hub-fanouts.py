exec(open('complete-hub-routing.py').read().split("order=['DP4'")[0])
cache=[];old=[];saved=[]
# Spread the hub controller's 0.5 mm-pitch data pins before changing layers.
# Staggered vias leave room for adjacent traces and avoid via-in-pad.
paths={12:[(-1.25,5.1),(-1.9,5.75)],11:[(-.75,5.1),(-.75,5.5),(-.9,5.65),(-.9,7.0)],10:[(-.25,5.1),(-.25,5.5),(-.3,5.55),(-.3,6.15)],9:[(.25,5.1),(.25,5.5),(.3,5.55),(.3,7.0)],8:[(.75,5.1),(.75,5.5),(.9,5.65),(.9,6.15)],7:[(1.25,5.1),(2.,5.85)],5:[(2.,3.75),(2.65,3.75),(2.65,4.85),(2.9,5.1)],6:[(2.05,4.25),(2.05,4.95)]}

# Status-control revision: reserve the new indicator/I2C pins and adjacent USB inputs.
paths.update({
 13:[(-2.3, 4.15), (-3.5, 4.15)],
 14:[(-2.3, 3.65), (-2.8, 3.65), (-2.95, 3.5)],
 15:[(-2.3, 3.15), (-2.5, 3.15), (-2.5, 3.1), (-2.55, 3.1), (-2.55, 3.05), (-2.6, 3.05), (-2.6, 3.0), (-2.65, 3.0), (-2.7, 2.95), (-2.75, 2.95), (-2.85, 2.85), (-3.5, 2.85)],
 20:[(-0.85, 0.7), (-0.85, 0.5), (-0.95, 0.4), (-1.25, 0.4), (-1.35, 0.3), (-1.65, 0.3), (-1.75, 0.2)],
 21:[(-0.15, 0.7), (-0.15, 0.0), (-0.05, -0.1), (-0.05, -0.85), (0.0, -0.9), (0.0, -1.35)],
 23:[(0.85, 0.7), (0.85, 0.5), (0.95, 0.4), (1.25, 0.4), (1.35, 0.3), (1.65, 0.3), (1.75, 0.2)],
})
for num,path in paths.items():
 sp=next(e for e in sourceports.values() if components[e['source_component_id']]['name']=='U1' and e['pin_number']==num)
 net=names[root(sp['source_port_id'])];x,y=path[-1]
 r=[dict(route_type='wire',x=x,y=y,width=.15,layer='top') for x,y in path]+[dict(route_type='via',x=x,y=y,from_layer='top',to_layer='bottom'),dict(route_type='wire',x=x,y=y,width=.15,layer='bottom')]
 t=dict(type='pcb_trace',pcb_trace_id=f'escape_U1_{num}',source_trace_id=netmap[net],connection_name=netmap[net],route=r);cache.append(t);saved.append(t)
# First preserve practical breakout paths at the pins most affected by rip-up.
for name,numbers in [(n,[1,2,4,5,9,12,3,10]) for n in ['U4','U7','U10','U13']]:
 for num in numbers:
  sp=next(e for e in sourceports.values() if components[e['source_component_id']]['name']==name and e['pin_number']==num)
  net=names[root(sp['source_port_id'])];shape=unary_union([g for n,l,g,k,p in pads if p==sp['source_port_id'] and l==0])
  gs,vs=geometry();gs=[g for g in gs if g[3] in ['pad','fixed_trace','fixed_via']]
  r,reason=connect(net,gs,[(0,shape)],[(1,box(-21.4,-20.4,21.4,20.4))])
  print(name,num,net,reason,flush=True)
  if r is None:continue
  t=dict(type='pcb_trace',pcb_trace_id=f'escape_{name}_{num}',source_trace_id=netmap[net],connection_name=netmap[net],route=r);cache.append(t);saved.append(t)
# A second pass uses completed same-net fanouts as targets and removes the
# temporary reservations now that the other pins have their real escape paths.
escapes=[]
for name,numbers in [(n,[1,2,4,5,9,12,3,10]) for n in ['U4','U7','U10','U13']]:
 for num in numbers:
  ident=f'escape_{name}_{num}'
  if any(t['pcb_trace_id']==ident for t in saved):continue
  sp=next(e for e in sourceports.values() if components[e['source_component_id']]['name']==name and e['pin_number']==num)
  net=names[root(sp['source_port_id'])];shape=unary_union([g for n,l,g,k,p in pads if p==sp['source_port_id'] and l==0])
  gs,vs=geometry();gs=[g for g in gs if g[3] in ['pad','fixed_trace','fixed_via']]
  targets=[(1,box(-21.4,-20.4,21.4,20.4))]+[(l,g) for n,l,g,k,p in gs if n==net and k in ['fixed_trace','fixed_via']]
  r,reason=connect(net,gs,[(0,shape)],targets);print('Final escape',name,num,reason,flush=True)
  if r is None:raise RuntimeError(f'Unable to escape {name}.{num}')
  t=dict(type='pcb_trace',pcb_trace_id=ident,source_trace_id=netmap[net],connection_name=netmap[net],route=r);cache.append(t);saved.append(t)
json.dump(saved,open('hub-fanouts.json','w'),indent=2)
print('Protected fanouts',len(saved),flush=True)
