#!/usr/bin/env python3
"""Reassemble chunked base64 SVG exports from stdin JSON and write to design/."""
import base64
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DESIGN = ROOT / "assets/cases/openshift-ai/model-details/design"


def main() -> None:
    data = json.load(sys.stdin)
    for name, payload in data.items():
        if isinstance(payload, dict) and "chunks" in payload:
            b64 = "".join(payload["chunks"])
        else:
            b64 = payload
        out = DESIGN / f"{name}.svg"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(base64.b64decode(b64))
        print(f"wrote {out} ({len(b64)} b64 chars)")


if __name__ == "__main__":
    main()
