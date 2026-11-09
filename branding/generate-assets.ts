import {readFileSync,writeFileSync} from 'node:fs'
import {svgPathToPoints} from '@tscircuit/image-utils'
import polygonClipping from 'polygon-clipping'
import {lineAlphabet,glyphAdvanceRatio,glyphWidthRatio,spaceWidthRatio,strokeWidthRatio,letterSpacingRatio} from '@tscircuit/alphabet'
const original=readFileSync('branding/tsdot.svg','utf8')
const blue=[...original.matchAll(/<path[^>]+fill="#3B82F6"[^>]*\/>/g)].map(m=>m[0])
if(blue.length!==2)throw new Error('Unexpected official logo structure')
// Sample curves at 1 point per SVG unit (under 0.033 mm at the largest logo).
const parts=blue.map(path=>svgPathToPoints(path.match(/d="([^"]+)"/)![1],1).map(r=>r.map(p=>[(p.x-76.5)/153,(76.5-p.y)/153])))
const dot=Array.from({length:96},(_,i)=>{const a=i*Math.PI/48;return [(25.5-76.5+7.5*Math.cos(a))/153,(76.5-27.5+7.5*Math.sin(a))/153]})
const polys=polygonClipping.difference(polygonClipping.union(parts[0] as any,...parts.slice(1) as any),[dot] as any)
writeFileSync('branding/logo-polygons.json',JSON.stringify(polys)+'\n')
writeFileSync('branding/font-metrics.json',JSON.stringify({lineAlphabet,glyphAdvanceRatio,glyphWidthRatio,spaceWidthRatio,strokeWidthRatio,letterSpacingRatio})+'\n')
const d=polys.map(p=>p.map(r=>'M'+r.map(([x,y])=>`${x*153+76.5},${76.5-y*153}`).join('L')+'Z').join(' ')).join(' ')
writeFileSync('branding/tsdot-monochrome.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153 153"><path fill="black" fill-rule="evenodd" d="${d}"/></svg>\n`)
console.log('Official TS logo:',polys.length,'filled regions; holes:',polys.reduce((a,p)=>a+p.length-1,0))
