// Nominal envelope illustration for Dailywell 1MS1T1B1M1QES-5.
// Not a production enclosure-clearance model. Lever shown in one position.
$fn=48;
union(){
 translate([-3.43,-6.35,0])cube([6.86,12.7,9]);
 translate([0,0,9])cylinder(d=6.35,h=8);
 translate([0,0,16])rotate([15,0,0])cylinder(d=2.8,h=10.5);
 for(y=[-4.7,0,4.7])translate([-0.6,y-0.3,-3.5])cube([1.2,0.6,3.5]);
}
