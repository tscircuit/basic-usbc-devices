"""Validate panel4 supplier mappings and cost five panels from dated public quotes.

No purchasing API is used. Refresh references/stock-2026-11-09.json before a later order.
"""
import csv
import json
from collections import Counter
from decimal import Decimal
from pathlib import Path

root = Path(__file__).resolve().parent
out = root / 'output'
snapshot = json.loads((root / 'references/stock-2026-11-09.json').read_text())
uploaded = json.loads((root / 'references/uploaded-order-audit.json').read_text())
previous = {r['jlcpcb']: r for r in uploaded['matched_groups']}
bom = list(csv.DictReader((out / 'panel4-bom.csv').open()))
cpl = list(csv.DictReader((out / 'panel4-cpl.csv').open()))
design = json.loads((out / 'panel4.circuit.json').read_text())
parts = {p['name']: p for p in design if p['type'] == 'source_component'
         and not (p.get('ftype') == 'simple_test_point' and p.get('footprint_variant') == 'pad')}
refs = [ref for row in bom for ref in row['Designator'].split(',')]
assert len(refs) == len(set(refs)) == len(parts) == len(cpl) == 252
assert set(refs) == set(parts) == {p['Designator'] for p in cpl}
assert len({r['JLCPCB Part #'] for r in bom}) == len(bom)
report = []
for row in bom:
    code = row['JLCPCB Part #']
    quote = snapshot[code]
    assert row['Comment'] == quote['componentModelEn'], code
    assert row['Footprint'] == quote['componentSpecificationEn'], code
    names = row['Designator'].split(',')
    assert int(row['Quantity']) == len(names), code
    for name in names:
        assert parts[name]['supplier_part_numbers']['jlcpcb'][0] == code, name
    needed = len(names) * 5
    # Include the uploaded assembler's allowance where supplied. For previously
    # unconfirmed/new items use catalog loss/minimum-patch quantities as an estimate.
    estimated_qty = max(needed + (quote.get('lossNumber') or 0),
                        quote.get('leastPatchNumber') or 0,
                        previous.get(code, {}).get('quantity', 0))
    assert quote['canPresaleNumber'] >= estimated_qty, f'{code}: insufficient stock'
    tiers = [p for p in quote['prices'] if p['startNumber'] <= estimated_qty
             and (p['endNumber'] == -1 or estimated_qty <= p['endNumber'])]
    assert len(tiers) == 1, f'{code}: missing/ambiguous price tier'
    price = Decimal(str(tiers[0]['productPrice']))
    assert 0 < price <= 3, f'{code}: price needs additional review'
    standard_only = 'Standard Only' in str(quote['availabilityText'])
    report.append({
        'JLCPCB Part #': code, 'Manufacturer Part Number': row['Comment'],
        'Manufacturer': quote['componentBrandEn'], 'Footprint': row['Footprint'],
        'Designator': row['Designator'], 'Quantity per panel': len(names),
        'Installed quantity for 5 panels': needed,
        'Estimated procurement quantity': estimated_qty,
        'Available order quantity': quote['canPresaleNumber'],
        'Unit price USD': str(price), 'Estimated line cost USD': str(price * estimated_qty),
        'Library': quote['componentLibraryType'],
        'Assembly': 'Standard only; X-ray required' if standard_only else 'Economic and Standard',
        'Checked UTC': quote['checkedAt'], 'Source': quote['sourceUrl'],
    })
with (out / 'panel4-stock-cost-audit.csv').open('w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=list(report[0])); writer.writeheader(); writer.writerows(report)
total = sum(Decimal(r['Estimated line cost USD']) for r in report)
validation = {'checkedOn': '2026-11-09', 'panels': 5, 'assemblyPositionsPerPanel': len(refs),
              'uniqueSupplierParts': len(report), 'allPartsHaveSupplierIds': True,
              'allPartsHaveSufficientAvailableQuantity': True, 'stockReserved': False,
              'estimatedComponentsUSD': str(total), 'estimatedComponentsPerPanelUSD': str(total / 5),
              'highestUnitPriceUSD': str(max(Decimal(r['Unit price USD']) for r in report)),
              'standardOnlyParts': [r['JLCPCB Part #'] for r in report if r['Assembly'].startswith('Standard only')],
              'excludedCosts': ['PCB fabrication', 'assembly/setup/extended-part fees', 'X-ray',
                                'through-hole soldering', 'programming', 'shipping', 'tax', 'external LCD'],
              'procurementAllowance': 'Uploaded order quantities where available; otherwise catalog loss/minimum-patch estimate. Final allowance is set by JLCPCB.'}
(out / 'panel4-sourcing.validation.json').write_text(json.dumps(validation, indent=2) + '\n')
print(json.dumps(validation, indent=2))
