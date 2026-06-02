#!/usr/bin/env python3
"""Append one base64 chunk from stdin JSON to a temp file; decode when complete."""
import argparse
import base64
import json
import sys
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--name", required=True)
    parser.add_argument("--index", type=int, required=True)
    parser.add_argument("--total", type=int, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--tmp-dir", type=Path, default=Path("/tmp/figma-export-chunks"))
    args = parser.parse_args()

    payload = json.load(sys.stdin)
    chunk = payload.get("chunk", "")
    args.tmp_dir.mkdir(parents=True, exist_ok=True)
    part = args.tmp_dir / f"{args.name}.{args.index:04d}.b64"
    part.write_text(chunk, encoding="utf-8")

    received = sorted(args.tmp_dir.glob(f"{args.name}.*.b64"))
    if len(received) < args.total:
        print(f"chunk {args.index + 1}/{args.total} saved")
        return

    b64 = "".join(p.read_text(encoding="utf-8") for p in received)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_bytes(base64.b64decode(b64))
    for p in received:
        p.unlink()
    print(f"wrote {args.out} ({args.out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
