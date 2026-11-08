import {Circuit} from 'tscircuit'
import {runAllChecks} from '@tscircuit/checks'
import assert from 'node:assert/strict'
import {HubBoard} from './hub.circuit'
// Integration regression: saved copper must follow the hub inside panel3,
// including regenerated source IDs and nonzero board coordinates.
const circuit=new Circuit()
circuit.add(<HubBoard pcbX={0} pcbY={-49.5}/>)
await circuit.renderUntilSettled()
const json=circuit.getCircuitJson()
assert.deepEqual(json.filter((e:any)=>e.type.endsWith('_error')||e.type.endsWith('_warning')),[])
assert.deepEqual(await runAllChecks(json),[])
const board=json.find((e:any)=>e.type==='pcb_board') as any
assert.equal(board.center.y,-49.5)
console.log('Translated hub: zero render, connectivity, or clearance findings')
