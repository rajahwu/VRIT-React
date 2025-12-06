# CLI Agent TODO — Build Pipeline Orchestrator

## Objective
Create a unified orchestrator for the Ritual_React workspace that performs:

1. Clean all dist folders (brand, ui, hub)
2. Rebuild brand tokens
3. Rebuild ui styles
4. Rebuild hub app
5. Validate exports
6. Validate CSS availability
7. Emit repo report

## Steps
- Implement new root-level script: build:orchestrate
- Add sub-steps inside /scripts/orchestrator.ts
- Add logging, steps, fail-fast logic

## Acceptance Criteria
- `pnpm build:orchestrate` completes without error
- All CSS files exist before hub build
- Exports match the filesystem
- Repo report generated at RFX/REPORT/latest.md
