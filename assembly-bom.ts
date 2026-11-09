import sourcing from './sourcing.json'

export const csv = (rows: unknown[][]) => rows.map(row => row.map(v =>
  '"' + String(v).replaceAll('"', '""') + '"').join(',')).join('\n') + '\n'

/** Group the assembly BOM while retaining one CPL row per physical placement. */
export function assemblyFiles(cj: any[]) {
  const groups = new Map<string, {mpn: string, footprint: string, refs: string[]}>()
  const cpl: unknown[][] = [['Designator', 'Mid X', 'Mid Y', 'Layer', 'Rotation']]
  for (const part of cj.filter(e => e.type === 'source_component')) {
    // These are bare copper pads, not purchased test-point components.
    if (part.ftype === 'simple_test_point' && part.footprint_variant === 'pad') continue
    const id = part.supplier_part_numbers?.jlcpcb?.[0]
    if (!id || !/^C\d+$/.test(id)) throw new Error(`${part.name}: missing JLCPCB part number`)
    const source = sourcing.parts.find(p => p.lcsc === id)
    if (!source?.package || source.mpn !== part.manufacturer_part_number)
      throw new Error(`${part.name}: supplier MPN/package does not match ${id}`)
    const pcb = cj.find(e => e.type === 'pcb_component' && e.source_component_id === part.source_component_id)
    if (!pcb) throw new Error(`${part.name}: missing placement`)
    const group = groups.get(id) ?? {mpn: source.mpn, footprint: source.package, refs: []}
    group.refs.push(part.name)
    groups.set(id, group)
    // Custom hub capacitor footprint has positive on +X; supplier footprint has it on -X.
    const offset = id === 'C7469982' ? 180 : 0
    cpl.push([part.name, `${pcb.center.x.toFixed(4)}mm`, `${pcb.center.y.toFixed(4)}mm`,
      pcb.layer === 'bottom' ? 'Bottom' : 'Top', ((pcb.rotation ?? 0) + offset + 360) % 360])
  }
  const bom: unknown[][] = [['Comment', 'Designator', 'Footprint', 'JLCPCB Part #', 'Quantity']]
  for (const [id, group] of groups) bom.push([
    group.mpn, group.refs.join(','), group.footprint, id, group.refs.length,
  ])
  return {bom: csv(bom), cpl: csv(cpl)}
}
