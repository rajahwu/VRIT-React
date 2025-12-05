Project Context: GTTM Hub / Ritual Monorepo

🛡️ Project Identity

Name: GTTM Hub (Ritual React)
Codename: Victor V / Sprezzatura
Philosophy: "Design as Data." The system separates the Mythic Layer (Source of Truth) from the Implementation (Code).
Vibe: Industrial, Zinc-950, High-Performance, Minimalist, "Dead Effortless."

🎯 Core Objective

Refactor the existing standalone ritual-cycle-tracker.tsx component into a scalable pnpm workspace monorepo. The goal is to create a "Ritual Container" that powers multiple applications (Hub, Simulator, Docs) using a shared "Book of Power" asset pipeline.

🏗️ Architecture & Directory Structure

The project follows a strict separation of concerns based on the "Clearline7" precedent:

/Ritual_React_Mono
├── /apps                  # Consumer Applications
│   ├── /hub               # Next.js (The Main Dashboard/Interface)
│   ├── /blackjack         # Next.js/Vite (The Simulator/Trainer)
│   └── /docs              # Documentation Site
│
├── /design-source         # 📍 THE MYTHIC LAYER (Source of Truth)
│   │   # NO REACT CODE HERE. Only JSON, Markdown, and Assets.
│   ├── /ASSETS
│   │   ├── /VictorV_Audio # Suno/Sonu generated MP3s (The Soundtrack)
│   │   ├── /Tarot_Images  # Generated Art (Fool, David, etc.)
│   │   └── /Manifestos    # Text-based doctrine
│   │
│   ├── /PROMPTS           # The "Code" behind the Assets
│   │   ├── audio_prompts.md
│   │   └── system_prompts.md
│   │
│   ├── /TOKENS_SOURCE     # The DNA (JSON Data)
│   │   ├── colors.json    # Zinc theme + Phase colors
│   │   └── phases.json    # The 5 Ritual Phases (Plan, Sprint, Rest, Reflect, Recover)
│   │
│   └── /BRAND_KIT         # Logos and static brand files
│
├── /packages              # Shared Libraries (The Pipeline)
│   ├── /ritual-brand      # Compiles design-source into usable TS/Tailwind config
│   └── /ritual-ui         # Shared React Components (Home of the CycleTracker)
│
└── pnpm-workspace.yaml    # Workspace definition


📜 The Doctrine (Technical Constraints)

Single Source of Truth:

The 5 Phases (Plan, Sprint, Rest, Reflect, Recover) and their attributes (colors, prompts, durations) MUST live in design-source/TOKENS_SOURCE/phases.json.

The React components must consume this data, never hardcode it.

Asset Pipeline:

Audio (Victor V tracks) and Visuals are treated as first-class citizens.

The system is designed to eventually play specific tracks during specific phases (e.g., "High Velocity" track during "Sprint").

UI Aesthetics:

Base: Zinc-950 (Background) to Zinc-100 (Text).

Accents:

Plan: Amber-500

Sprint: Emerald-500

Rest: Sky-500

Reflect: Violet-500

Recover: Rose-500

Typography: Clean, tabular numbers for timers, "Sprezzatura" feel.

🚀 Phase 1 Tasks (Immediate)

Scaffold: Initialize the pnpm workspace and folder structure.

Extract Data: Create design-source/TOKENS_SOURCE/phases.json populated with the logic from the existing ritual-cycle-tracker.tsx.

Setup Packages: Initialize packages/ritual-brand to export these tokens.

🔮 Future Vision

The Black Trainer: A blackjack simulator that runs inside the ritual container.

The Audible Snap: Full integration of the Victor V soundtrack.
