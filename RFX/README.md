# RFX — Ritual React Refactor Staging Area

This directory is the isolated zone for stabilizing and refactoring the 
Ritual_React monorepo without interfering with production packages.

## Purpose
- Stage refactors safely
- Queue tasks for the coding CLI agent
- Document token issues
- Track UI regressions
- Generate repo reports
- Coordinate the workspace build pipeline

## Folders
- **PLAN.md** — high level refactor plan
- **TASKS/** — individual TODO sheets for the CLI agent
- **REPORT/** — templates + generated repo reports

Everything in RFX/ is safe to edit and does NOT ship with npm packages.
