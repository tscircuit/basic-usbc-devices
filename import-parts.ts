import { fetchEasyEDAComponent, convertRawEasyToTsx } from 'easyeda/browser'
import { writeFile, mkdir } from 'node:fs/promises'
await mkdir('imports', {recursive:true})
for (const id of process.argv.slice(2)) {
 try {
 const raw=await fetchEasyEDAComponent(id, {includeModelMetadata:false})
 await writeFile(`imports/${id}.json`,JSON.stringify(raw,null,2))
 const tsx=await convertRawEasyToTsx({rawEasy:raw})
 await writeFile(`imports/${id}.tsx`,tsx)
 console.log(id, raw.dataStr.head.c_para)
 } catch(e) {console.error(id, String(e)); process.exitCode=1}
}
