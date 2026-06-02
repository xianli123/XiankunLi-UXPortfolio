#!/usr/bin/env python3
"""Wrap a PNG as a single-file SVG with an embedded raster image."""
import argparse
import base64
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("png", type=Path)
    parser.add_argument("svg", type=Path)
    parser.add_argument("--width", type=int, required=True)
    parser.add_argument("--height", type=int, required=True)
    args = parser.parse_args()

    data = base64.b64encode(args.png.read_bytes()).decode("ascii")
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{args.width}" height="{args.height}" viewBox="0 0 {args.width} {args.height}">
  <image width="{args.width}" height="{args.height}" xlink:href="data:image/png;base64,{data}"/>
</svg>
'''
    args.svg.parent.mkdir(parents=True, exist_ok=True)
    args.svg.write_text(svg, encoding="utf-8")
    print(f"wrote {args.svg} ({args.svg.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
