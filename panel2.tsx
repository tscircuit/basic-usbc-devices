import { DigitalBoard } from './digital.circuit'
import { DistanceBoard } from './distance.circuit'
import { PositionBoard } from './position.circuit'
import { DialBoard } from './dial.circuit'

export const panelSize = { width: 96, height: 79 }
export const modules = [
  { x: -27, y: 16.5 }, { x: 0, y: 16.5 }, { x: 27, y: 16.5 },
  { x: -27, y: -16.5 }, { x: 0, y: -16.5 }, { x: 27, y: -16.5 },
].map(position => ({ ...position, rotation: position.y > 0 ? 180 : 0, w: 24, h: 30 }))

// Two rows, three columns. Export preserves the checked individual board routes.
export default function Panel2() {
  return <panel name="usb_homing_panel2" {...panelSize} layoutMode="none" panelizationMethod="none">
    <DigitalBoard kind="limit" pcbX={-27} pcbY={16.5} pcbRotation={180}/>
    <DigitalBoard kind="button" pcbX={0} pcbY={16.5} pcbRotation={180}/>
    <DigitalBoard kind="toggle" pcbX={27} pcbY={16.5} pcbRotation={180}/>
    <DialBoard pcbX={-27} pcbY={-16.5}/>
    <PositionBoard pcbX={0} pcbY={-16.5}/>
    <DistanceBoard pcbX={27} pcbY={-16.5}/>
  </panel>
}

export function PanelFrame() {
  return <board {...panelSize} layers={2}>
    <schematicsheet name="mechanical_frame"/>
    {modules.flatMap((b, i) => [
      ...[-1, 1].map(s => <cutout name={`horizontal_${i}_${s}`} shape="rect" pcbX={b.x} pcbY={b.y + s * 16.5} width={30} height={3}/>),
      ...[-1, 1].flatMap(s => [[-15, -9], [-5, 5], [9, 15]].map(([a, z]) =>
        <cutout name={`slot_${i}_${s}_${a}`} shape="rect" pcbX={b.x + s * 13.5} pcbY={b.y + (a + z) / 2} width={3} height={z - a}/>)),
      ...[-1, 1].flatMap(s => [-7, 7].flatMap(y => [-1.5, -0.75, 0, 0.75, 1.5].map(d =>
        <hole name={`bite_${i}_${s}_${y}_${d}`} diameter={0.5} pcbX={b.x + s * 12.15} pcbY={b.y + y + d}/>))),
    ])}
    <hole name="TOOL1" diameter={3} pcbX={-44} pcbY={36.5}/>
    <hole name="TOOL2" diameter={3} pcbX={44} pcbY={36.5}/>
    <hole name="TOOL3" diameter={3} pcbX={-44} pcbY={-36.5}/>
    <fiducial padDiameter={1} name="FID1" pcbX={-37} pcbY={36.5}/>
    <fiducial padDiameter={1} name="FID2" pcbX={37} pcbY={36.5}/>
    <fiducial padDiameter={1} name="FID3" pcbX={37} pcbY={-36.5}/>
  </board>
}
