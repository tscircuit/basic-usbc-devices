import {BuzzerBoard} from './buzzer.circuit'
import { DisplayBoard } from './display.circuit'
import { HubBoard } from './hub.circuit'
import { Circuit } from 'tscircuit'
import { convertCircuitJsonToPcbSvg, convertCircuitJsonToSchematicSvg } from 'circuit-to-svg'
import { runAllChecks } from '@tscircuit/checks'
import { writeFile, mkdir } from 'node:fs/promises'
import { PositionBoard } from './position.circuit'
import { DialBoard } from './dial.circuit'
import { DigitalBoard } from './digital.circuit'
import { DistanceBoard } from './distance.circuit'
await mkdir('output',{recursive:true})
for (const kind of process.argv.slice(2).length?process.argv.slice(2):['limit','button','toggle','dial','position','distance']){
 console.log('Building',kind)
 const c=new Circuit()
 if(kind==='hub'){c.on("autorouting:start",(e:any)=>console.log("Routing", e.phaseName??e.simpleRouteJson?.connections?.length, "connections")); c.on("autorouting:end",()=>console.log("Routing pass complete"))}
 c.add(kind==='buzzer'?<BuzzerBoard/>:kind==='display'?<DisplayBoard routingDisabled={process.env.DISPLAY_PLACEMENT_ONLY==='1'}/>:kind==='hub'?<HubBoard routingDisabled={process.env.HUB_PLACEMENT_ONLY==='1'}/>:kind==='position'?<PositionBoard/>:kind==='dial'?<DialBoard/>:kind==='distance'?<DistanceBoard/>:<DigitalBoard kind={kind as any}/>)
 await c.renderUntilSettled()
 const json=c.getCircuitJson()
 await writeFile(`output/${kind}.circuit.json`,JSON.stringify(json,null,2))
 await writeFile(`output/${kind}.pcb.svg`,convertCircuitJsonToPcbSvg(json))
 await writeFile(`output/${kind}.schematic.svg`,convertCircuitJsonToSchematicSvg(json))
 const errors=json.filter((e:any)=>e.type.endsWith('_error')||e.type.endsWith('_warning'))
 const checks=await runAllChecks(json)
 await writeFile(`output/${kind}.checks.json`,JSON.stringify({render:errors,checks},null,2))
 console.log(kind,'traces',json.filter(e=>e.type==='pcb_trace').length,'vias',json.filter(e=>e.type==='pcb_via').length,'render findings',errors.length,'check findings',checks.length)
 console.log(JSON.stringify([...errors,...checks].slice(0,8),null,2))
 if(errors.length||checks.length)process.exitCode=1
}
