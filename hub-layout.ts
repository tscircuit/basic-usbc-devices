export const hubSize = {width:44,height:42}
export const hubMounts = [-19,19].flatMap(x=>[-5,5].map(y=>({x,y})))
type Placement={x:number,y:number,rotation?:number}
import placements from './hub-placements.json'
export function pcb(name:string){const p=(placements as Record<string,Placement>)[name];if(!p)throw new Error(`Missing hub placement ${name}`);return {pcbX:p.x,pcbY:p.y,pcbRotation:p.rotation??0}}
export function position(name:string){return (placements as Record<string,Placement>)[name]}
const schematic:Record<string,[number,number]>={
 J1:[-12,7],D1:[-8.2,7],R1:[-13.5,4.3],R2:[-10.3,4.3],C1:[-7.8,4.3],
 U1:[-2,7.2],Y1:[2.2,7.2],C2:[-4.3,4.3],C3:[-2,4.3],C4:[-.2,4.3],C5:[1.5,4.3],C6:[3.5,4.3],R3:[5.4,7.6],R4:[5.4,5.4],
 U2:[9.1,8],C7:[12.6,8],U3:[9.1,4.9],C8:[12.6,4.9],
}
for(let k=0;k<4;k++){
 const i=k+1,b=10+k*10,u=4+k*3,x=[-11.4,-3.8,3.8,11.4][k]
 Object.assign(schematic,{
  [`J${i+1}`]:[x-1.6,0],[`D${i+1}`]:[x+1.5,0],[`U${u}`]:[x-1.5,-3.2],
  [`R${b}`]:[x+1.7,-2.6],[`R${b+1}`]:[x+1.7,-4.3],[`C${b}`]:[x-1.5,-5.2],
  [`U${u+1}`]:[x-1.5,-7.3],[`MOSFET${i}`]:[x+1.7,-7],[`R${b+3}`]:[x+1.7,-5.9],
  [`R${b+2}`]:[x-2.3,-9.1],[`C${b+1}`]:[x-.6,-9.1],[`C${b+2}`]:[x+1.1,-9.1],[`C${b+3}`]:[x+2.8,-9.1],
 })
}
export function sch(name:string){const p=schematic[name];if(!p)throw new Error(`Missing hub schematic placement ${name}`);return {schX:p[0],schY:p[1]}}
