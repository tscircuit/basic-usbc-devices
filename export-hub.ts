import {assemblyFiles} from './assembly-bom'
import { convertCircuitJsonToGerberFiles } from 'circuit-json-to-gerber'
import {readFile,writeFile,mkdir} from 'node:fs/promises'
const name='hub'
const cj=JSON.parse(await readFile('output/hub.circuit.json','utf8'))
 const files=convertCircuitJsonToGerberFiles(cj)
 await mkdir(`output/${name}-gerbers`,{recursive:true})
 for(const [file,content] of Object.entries(files)) await writeFile(`output/${name}-gerbers/${file}`,content)
 console.log(name,Object.keys(files))
 const {bom,cpl}=assemblyFiles(cj)
 await writeFile(`output/${name}-bom.csv`,bom)
 await writeFile(`output/${name}-cpl.csv`,cpl)
