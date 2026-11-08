import {readFileSync,writeFileSync} from 'node:fs'
import {runAllChecks} from '@tscircuit/checks'
import {convertCircuitJsonToPcbSvg,convertCircuitJsonToSchematicSvg} from 'circuit-to-svg'
const j=JSON.parse(readFileSync('resetter-layout.json','utf8'))
const checks=await runAllChecks(j)
writeFileSync('output/resetter.circuit.json',JSON.stringify(j,null,2))
writeFileSync('output/resetter.checks.json',JSON.stringify({render:[],checks},null,2))
writeFileSync('output/resetter.pcb.svg',convertCircuitJsonToPcbSvg(j))
writeFileSync('output/resetter.schematic.svg',convertCircuitJsonToSchematicSvg(j))
console.log(checks.length,checks.slice(0,5).map((e:any)=>e.message))
if(checks.length)process.exitCode=1
