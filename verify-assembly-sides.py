"""Check production placement side and segregate board designs by copper stackup."""
import json
from pathlib import Path

# Members of each fabrication family. Four-layer designs use a separate panel.
families = {
    2: {
        "output": ["button", "buzzer", "dial", "display", "distance", "hub", "limit", "position", "resetter", "toggle"],
        "dist/new-devices": ["ereader", "small-ips", "speaker", "temperature"],
    },
    4: {
        "dist/motherboard": ["motherboard"],
        "dist/p4-display": ["large-rgb", "video-player"],
    },
}
for layers, folders in families.items():
    for folder, boards in folders.items():
        for name in boards:
            path = Path(folder) / f"{name}.circuit.json"
            data = json.loads(path.read_text())
            board, = (item for item in data if item["type"] == "pcb_board")
            if board["num_layers"] != layers:
                raise ValueError(f"{name} belongs on the {board['num_layers']}-layer panel")
            sources = {item["source_component_id"]: item for item in data if item["type"] == "source_component"}
            for item in data:
                if item["type"] != "pcb_component" or item["layer"] == "top":
                    continue
                source = sources[item["source_component_id"]]
                if source["ftype"] == "simple_test_point" and source.get("footprint_variant") == "pad":
                    continue
                raise ValueError(f"{name}: {source['name']} requires underside assembly")
            print(f"{name}: top assembly, {layers} copper layers")
