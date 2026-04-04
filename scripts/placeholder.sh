#!/usr/bin/env bash
# Usage: ./scripts/placeholder.sh <width> <height>
# Downloads a placeholder PNG from placehold.co and saves it to public/
# Example: ./scripts/placeholder.sh 568 767

set -euo pipefail

WIDTH="${1:-}"
HEIGHT="${2:-}"

if [[ -z "$WIDTH" || -z "$HEIGHT" ]]; then
  echo "Usage: $0 <width> <height>"
  echo "Example: $0 568 767"
  exit 1
fi

FILENAME="placeholder-${WIDTH}x${HEIGHT}.png"
OUTPUT="public/${FILENAME}"
URL="https://placehold.co/${WIDTH}x${HEIGHT}/png"

echo "Downloading ${URL} → ${OUTPUT}"
curl -fsSL "$URL" -o "$OUTPUT"
echo "Saved: ${OUTPUT}"
