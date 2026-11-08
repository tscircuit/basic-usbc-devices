"""Ensure routed slots and NPTH drills leave one attached manufacturing panel."""
import json
from shapely.geometry import Point,Polygon,box
from shapely.ops import unary_union
j=json.load(open('output/panel4.circuit.json'))
b=next(e for e in j if e['type']=='pcb_board')
material=box(-b['width']/2,-b['height']/2,b['width']/2,b['height']/2)
cutouts=[Polygon([(p['x'],p['y']) for p in e['points']]) for e in j if e['type']=='pcb_cutout']
cutouts += [Point(e['x'],e['y']).buffer(e['hole_diameter']/2) for e in j if e['type']=='pcb_hole']
material=material.difference(unary_union(cutouts))
assert material.is_valid and material.geom_type=='Polygon', 'Unattached board or rail island'
for e in json.load(open('panel4-layout.json'))['modules']:
 assert material.contains(Point(e['x'],e['y'])), e['name']
print('Panel4: all ten board centers attached to one continuous manufacturing panel')
