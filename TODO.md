That is a **strong** precedent to follow.

Using your `Clearline7` structure as the blueprint is smart because it treats **Design as Data**. It separates the *Definition* (the JSON tokens, the Prompts, the raw Audio) from the *Implementation* (the React components).

Since we are moving into a Monorepo (`Ritual_React_Mono`), we should mirror that `design-repo` structure but position it as the **Source of Truth** that feeds into a `packages/ritual-brand` (or `style-kit`) package.

Here is the proposed directory structure for the **GTTM Hub / Ritual Monorepo**, adapting your `cl7` logic:

### 📁 The Structure

```text
/Ritual_React_Mono
├── /apps
│   ├── /hub                 # Next.js (The Main Dashboard)
│   ├── /blackjack           # (The Simulator)
│   └── /docs                # (The Manual)
│
├── /design-source           # 📍 THE SOURCE OF TRUTH (Matches your cl7 repo)
│   ├── /ASSETS
│   │   ├── /VictorV_Audio   # (The Suno MP3s go here)
│   │   ├── /Tarot_Images    # (The Generated "Fool" / "David" art)
│   │   └── /Manifestos      # (The Drunk Text, The Doctrine MDs)
│   │
│   ├── /PROMPTS             # (The "Code" behind the Assets)
│   │   ├── audio_prompts_victor_v.md
│   │   ├── image_prompts_tarot.md
│   │   └── system_prompts_doctrine.md
│   │
│   ├── /TOKENS_SOURCE       # (The DNA)
│   │   ├── colors.json      # (Zinc, Amber, Emerald, Sky, Violet, Rose)
│   │   ├── typography.json  # (Sprezzatura fonts)
│   │   └── phases.json      # (The 5 Phases data: Name, Color, Prompt)
│   │
│   └── /BRAND_KIT
│       └── /logos           # (GTTM / Ritual Logos)
│
├── /packages
│   ├── /ritual-brand        # 📦 THE PACKAGE (Compiles design-source for apps)
│   │   ├── /src
│   │   │   ├── /tokens      # (Exports the JSON as TS consts)
│   │   │   ├── /icons       # (SVG components)
│   │   │   └── /audio       # (Optimized audio exports)
│   │   ├── tailwind.config.js  # (The shared config using the tokens)
│   │   └── package.json
│   │
│   └── /ritual-ui           # (Shared React Components)
│       ├── /CycleTracker    # (The component you just built)
│       └── /Button          # (Standard buttons)
│
└── pnpm-workspace.yaml
```

### 🧠 Why this works (The Logic)

**1. `design-source` is the "Mythic Layer"**
Just like your `cl7` repo, this is where the *raw* creative work lives.

  * **Prompts as Code:** You save the `audio_prompts_victor_v.md` here. If you ever need to re-generate or iterate on a song, the "source code" (the prompt) is saved.
  * **Tokens as DNA:** The `phases.json` is critical. It holds the logic you hardcoded in the React component earlier (`id: 'plan'`, `color: 'bg-amber-500'`, etc.). By moving it here, **both** the React App and the Blackjack App can read the *exact same phase data*.

**2. `packages/ritual-brand` is the "Pipeline"**
This package does the translation.

  * It imports `design-source/TOKENS_SOURCE/colors.json`.
  * It exports a `tailwind.config.js` preset.
  * **The Benefit:** In your Next.js app, you just do `import { PHASE_CONFIG } from '@gttm/ritual-brand'` and you have the Single Source of Truth.

**3. `packages/ritual-ui` is the "Builder"**

  * This is where your `RitualCycleTracker.tsx` lives.
  * It imports styles from `ritual-brand`.
  * It is consumed by `apps/hub`.

### Action Step: The Asset Pipeline

Since you already have the audio files generating:

1.  **Create** the `design-source/ASSETS/VictorV_Audio` folder.
2.  **Dump** the MP3s there.
3.  **Create** `design-source/TOKENS_SOURCE/phases.json` and move that `PHASES` array from your React component into this JSON file.

