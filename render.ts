import { Resvg } from '@resvg/resvg-js'
import { readFileSync,writeFileSync } from 'node:fs'
for(const name of process.argv.slice(2)){
 const r=new Resvg(readFileSync(`output/${name}.pcb.svg`,'utf8'),{fitTo:{mode:'width',value:1400}})
 writeFileSync(`output/${name}.pcb.png`,r.render().asPng())
}
