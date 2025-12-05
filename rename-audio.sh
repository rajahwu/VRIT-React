#!/bin/bash
# Audio Asset Renaming Script for Ritual_React
# Run from: ~/Ritual_React
# Usage: bash rename-audio.sh

SOURCE_DIR="design-source/ASSETS/VictorV_Audio"
TARGET_DIR="design-source/ASSETS/audio"

# Create clean target directory
mkdir -p "$TARGET_DIR"

echo "=== Ritual Audio Asset Renamer ==="
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"
echo ""

# Function to safely copy and rename
rename_track() {
    local src="$1"
    local dest="$2"
    
    if [[ -f "$SOURCE_DIR/$src" ]]; then
        cp "$SOURCE_DIR/$src" "$TARGET_DIR/$dest"
        echo "✓ $dest"
    else
        echo "✗ NOT FOUND: $src"
    fi
}

echo "--- PLAN PHASE ---"
rename_track "Five Smooth Stones.wav" "plan_five-smooth-stones_v1.wav"
rename_track "Five Smooth Stones (1).wav" "plan_five-smooth-stones_v2.wav"
rename_track "Plan - Foundation Stones .wav" "plan_foundation-stones_v1.wav"
rename_track "Plan - Foundation Stones  (1).wav" "plan_foundation-stones_v2.wav"

echo ""
echo "--- SPRINT PHASE ---"
rename_track "High Velocity (Sprezzatura).wav" "sprint_sprezzatura_v1.wav"
rename_track "High Velocity (Sprezzatura) (1).wav" "sprint_sprezzatura_v2.wav"

echo ""
echo "--- REST PHASE ---"
rename_track "The Moonlight Protocol (Rest).wav" "rest_moonlight-protocol_v1.wav"
rename_track "The Moonlight Protocol (Rest) (1).wav" "rest_moonlight-protocol_v2.wav"
rename_track "Rest - Moonlight Pause _.wav" "rest_moonlight-pause_v1.wav"
rename_track "Rest - Moonlit Pause .wav" "rest_moonlit-pause_v1.wav"

echo ""
echo "--- REFLECT PHASE ---"
rename_track "Reflect - Mirror Solo .wav" "reflect_mirror-solo_v1.wav"

echo ""
echo "--- RECOVER PHASE ---"
rename_track "Recover .wav" "recover_ensemble_v1.wav"
rename_track "Recover  (1).wav" "recover_ensemble_v2.wav"

echo ""
echo "--- ANTHEM (Manifesto/Completion) ---"
rename_track "The Drunk Text to Nobody.wav" "anthem_drunk-text_v1.wav"
rename_track "The Drunk Text to Nobody (1).wav" "anthem_drunk-text_v2.wav"
rename_track "Version 0 - The Fool's Chime .wav" "anthem_fools-chime_v1.wav"
rename_track "Version 0 - The Fool's Chime  (1).wav" "anthem_fools-chime_v2.wav"
rename_track "The Zero Point (Version 0).wav" "anthem_zero-point_v1.wav"
rename_track "The Zero Point (Version 0) (1).wav" "anthem_zero-point_v2.wav"
rename_track "The Zero Point (Version 0) (2).wav" "anthem_zero-point_v3.wav"
rename_track "The Zero Point (Version 0) (3).wav" "anthem_zero-point_v4.wav"

echo ""
echo "=== COMPLETE ==="
echo "Clean files are in: $TARGET_DIR"
echo ""
echo "Next: Run 'ls -la $TARGET_DIR' to verify"
