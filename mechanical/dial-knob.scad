// ALPS EC11E15244B2: 6 mm shaft, 4.5 mm D-flat dimension, 10 mm flat length.
// Print a fit coupon first; adjust clearance for your printer/material.
$fn=96;
shaft_style="d"; // "round" for the 6 mm knurled absolute-position dial
round_diameter=6.0; // adjust to your printer; friction fit on knurling
clearance=0.25;
knob_diameter=18;
knob_height=12;
socket_depth=shaft_style=="round"?6:8;
module d_socket(){intersection(){
 cylinder(d=6+clearance,h=socket_depth+0.1);
 translate([-5,-5,0])cube([10,5+1.5+clearance/2,socket_depth+0.1]);
}}
difference(){
 union(){cylinder(d=knob_diameter,h=knob_height-1);translate([0,0,knob_height-1])cylinder(d1=knob_diameter,d2=knob_diameter-2,h=1);}
 if(shaft_style=="d")d_socket();else cylinder(d=round_diameter,h=socket_depth+0.1);
 // Pointer groove on top; print or paint to make it visible.
 translate([-0.5,4,knob_height-0.6])cube([1,5,1]);
 for(a=[0:30:330])rotate([0,0,a])translate([knob_diameter/2,0,1])cylinder(d=1.2,h=knob_height-2);
}
