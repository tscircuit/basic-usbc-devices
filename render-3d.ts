import {readFileSync,writeFileSync} from 'node:fs'
import {convertCircuitJsonTo3dGlb,getDefaultCameraForCircuitJson} from 'circuit-json-to-3d-png'
import {renderGLTFToPNGFromGLB} from 'poppygl'
for(const name of process.argv.slice(2)){
 const j=JSON.parse(readFileSync(`output/${name}.circuit.json`,'utf8'))
 const [glb,base]=await Promise.all([convertCircuitJsonTo3dGlb(j),getDefaultCameraForCircuitJson(j)])
 // Default thumbnails frame the PCB only and crop tall shafts. GLTF uses Y up.
 const lookAt:[number,number,number]=[base.lookAt[0],base.lookAt[1]+9,base.lookAt[2]]
 const camPos=base.camPos.map((v,i)=>lookAt[i]+1.2*(v-base.lookAt[i])) as [number,number,number]
 const png=await renderGLTFToPNGFromGLB(glb,{camPos,lookAt,fov:base.fov,width:720,height:600,supersampling:2,realistic:true})
 writeFileSync(`output/${name}.3d.png`,Buffer.from(png));console.log(name,'3D preview rendered')
}
