#!/bin/bash
# Copy audio assets to Next.js public folder
# Run from project root: bash scripts/copy-audio.sh

SOURCE="design-source/ASSETS/audio"
DEST="apps/hub/public/assets/audio"

mkdir -p "$DEST"

if [[ -d "$SOURCE" ]]; then
    cp "$SOURCE"/*.wav "$DEST/" 2>/dev/null
    echo "✓ Audio assets copied to $DEST"
    echo "  $(ls -1 "$DEST" | wc -l) files"
else
    echo "✗ Source directory not found: $SOURCE"
    echo "  Run rename-audio.sh first"
    exit 1
fi
