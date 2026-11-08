import {runAllChecks,checkConnectorAccessibleOrientation} from '@tscircuit/checks'
import assert from 'node:assert/strict'

// These are breakaway boards, not connectors on one permanently intact product.
// The upstream orientation rule uses only the first pcb_board envelope. Check
// this rule against each board's retained outline; all fabrication checks still
// run against the complete physical panel, including its routed slots.
export function checkPanelConnectorOrientation(json:any[],boards:any[]){
 assert.ok(boards.length>1)
 for(const c of json.filter(e=>e.type==='pcb_component')){
  assert.equal(boards.filter(b=>b.subcircuit_id===c.subcircuit_id).length,1,`Missing board ownership for ${c.pcb_component_id}`)
 }
 return boards.flatMap(b=>checkConnectorAccessibleOrientation([b,...json.filter(e=>e.type!=='pcb_board'&&e.subcircuit_id===b.subcircuit_id)]))
}
export async function runPanelChecks(json:any[],boards:any[]){
 const checks=await runAllChecks(json)
 return [...checks.filter(e=>e.type!=='pcb_connector_not_in_accessible_orientation_warning'),...checkPanelConnectorOrientation(json,boards)]
}
