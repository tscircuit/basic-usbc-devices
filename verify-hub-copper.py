"""Independent physical-net audit, including the final ground-pour geometry.

Run after the final hub build, with requirements-routing.txt installed.
Unlike the routing planner, this requires all ground pads to join through
actual copper; merely reaching an arbitrary bottom-layer location is not enough.
"""
exec(open('complete-hub-routing.py').read().split("order=['DP4'")[0])
rendered=json.load(open('output/hub.circuit.json'))
gs,vs=geometry()
for e in rendered:
 if e['type']!='pcb_copper_pour':continue
 assert e['shape']=='brep',e['shape']
 shape=e['brep_shape']
 points=lambda ring:[(p['x'],p['y']) for p in ring['vertices']]
 polygon=Polygon(points(shape['outer_ring']),[points(r) for r in shape.get('inner_rings',[])])
 assert polygon.is_valid,e['pcb_copper_pour_id']
 net=names[root(e['source_net_id'])]
 gs.append((net,0 if e['layer']=='top' else 1,polygon,'pour',None))
disconnected={net:len(islands(net,gs,vs)) for net in netmap if len(islands(net,gs,vs))>1}
assert not disconnected,disconnected
report=dict(checkedNets=len(netmap),disconnectedNets=disconnected,includesFinalGroundPour=True)
json.dump(report,open('output/hub.physical-connectivity.json','w'),indent=2)
print(report)
