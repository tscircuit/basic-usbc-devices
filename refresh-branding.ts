import {readFileSync,writeFileSync} from 'node:fs'
import {addBoardBranding,brandedBoards} from './branding'
import {runAllChecks} from '@tscircuit/checks'
import {convertCircuitJsonToPcbSvg} from 'circuit-to-svg'
for(const name of brandedBoards){
 const before=JSON.parse(readFileSync(`output/${name}.circuit.json`,'utf8'))
 const j=addBoardBranding(before,name)
 const findings=await runAllChecks(j)
 if(findings.length)throw new Error(`${name}: ${JSON.stringify(findings)}`)
 writeFileSync(`output/${name}.circuit.json`,JSON.stringify(j,null,2))
 writeFileSync(`output/${name}.pcb.svg`,convertCircuitJsonToPcbSvg(j))
 writeFileSync(`output/${name}.checks.json`,JSON.stringify({render:[],checks:findings},null,2))
 console.log(name,'branded; zero findings')
}
