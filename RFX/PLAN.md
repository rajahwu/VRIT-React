# Ritual_React Refactor Plan (Staging Version)

## Core Problems
1. CSS output from ritual-brand and ritual-ui is inconsistent.
2. Next.js build fails because `@gttm/ritual-ui` exports paths that do not exist.
3. variables.css is not consistently generated.
4. Hub layout collapses / width issues persist.
5. The workspace build is not orchestrated in a deterministic order.

## Goals
- Stabilize brand → ui → app CSS pipeline
- Normalize exports in ritual-ui
- Standardize CSS variable generation
- Rebuild layout with reliable constraints
- Introduce orchestrated build pipeline

## Deliverables
- Working build across all packages
- New CLI agent tasks
- Repo report documenting the final architecture
