# BACKLOG: GTTM Hub (Ritual React)

> Status: Version 0 (Execution Mode)
> 
> Scope: Hub, Brand, UI, Assets only.

## 🛑 PRIORITY 1: The Wiring (Critical Path)

**Goal:** Prove the "Design as Data" pipeline. The app must stop guessing and start knowing.

- [ ] **Refactor `ritual-brand`:** Ensure `index.ts` correctly imports and exports `phases.json` and color tokens.
    
- [ ] **Refactor `ritual-ui`:** Open `RitualCycleTracker.tsx`. Delete the hardcoded `PHASES` constant. Import it from `@gttm/ritual-brand`.
    
- [ ] **Verify:** Run `apps/hub`. If the colors and text still load, the pipeline is alive.
    

**Definition of Done:**

- `RitualCycleTracker.tsx` has zero hardcoded phase data.
    
- Changing a color in `design-source/TOKENS_SOURCE/phases.json` updates the running app immediately (or after rebuild).
    

## ⚡ PRIORITY 2: The Parallel Stream (Capture)

**Goal:** Build the "Net" so the Engine doesn't stop.

- [ ] **Component:** Build `<CaptureInput />`. A simple, always-visible text bar (or hotkey-triggered modal).
    
- [ ] **State:** Create a local store (context or simple state) for `unsortedCaptures`.
    
- [ ] **View:** Build `<CaptureInbox />`. A minimal list view to see what was caught.
    
- [ ] **Integration:** Place `<CaptureInput />` inside the Sprint view. Ensure typing does _not_ pause the timer.
    

**Definition of Done:**

- User can type a "scrap" idea while the Sprint timer is running.
    
- The scrap appears in the "Inbox" list instantly.
    
- The timer never stops.
    

## 🔊 PRIORITY 3: The Audible Snap (Audio Engine)

**Goal:** The system must speak.

- [ ] **Asset Pipe:** Move Suno MP3s to `packages/ritual-brand/assets`.
    
- [ ] **Export:** Ensure `ritual-brand` exports accessible URLs or imports for these files.
    
- [ ] **Hook:** Build `useRitualSound(currentPhaseId)` in `ritual-ui`.
    
    - Logic: When `phase` changes, play corresponding track.
        
- [ ] **Controls:** Add a subtle Mute/Volume toggle in the UI.
    

**Definition of Done:**

- Transitioning from "Plan" to "Sprint" automatically plays _Track 3: High Velocity_.
    
- Transitioning to "Rest" automatically fades into _Track 4: Moonlight Protocol_.
    

## ♠️ PRIORITY 4: The Simulator (Blackjack Scaffold)

**Goal:** Prepare the training ground.

- [ ] **Scaffold:** Initialize `apps/blackjack` (Next.js).
    
- [ ] **Connect:** Configure it to consume `@gttm/ritual-brand`.
    
- [ ] **Test:** Render a simple page that uses the "Zinc-950" background and "Amber-500" accent from the shared tokens.
    

**Definition of Done:**

- `apps/blackjack` runs on a different port (e.g., 3001).
    
- It looks visually identical (brand-wise) to the Hub.
    

## 📜 PRIORITY 5: The Doctrine (Documentation)

**Goal:** Leave a map for the "Future You."

- [ ] **Root README:** Explain the Monorepo structure.
    
- [ ] **Manifesto:** Ensure `The_Drunk_Text.md` and `DOCTRINE.md` are committed in `design-source`.
    
- [ ] **Asset Log:** Update `audio_prompts_victor_v.md` with any new generation specs.
    

**Definition of Done:**

- A stranger (or you in 6 months) can clone the repo and understand _why_ `design-source` exists.