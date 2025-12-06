# Ritual UI Fix Tasks

## Main Issue
Next.js build failure:
"Package path ./variables.css is not exported from @gttm/ritual-ui"

## Required Fixes
1. Ensure variables.css is written BOTH to src/ and dist/
2. Ensure exports block in ritual-ui/package.json matches filesystem
3. Ensure index.js does NOT reference files that don't exist
4. Ensure imports only occur *after* files are guaranteed to exist

## Checklist
- [ ] Write variables.css during build
- [ ] Copy variables.css during build
- [ ] Verify dist/variables.css exists
- [ ] Update exports accordingly
- [ ] Update import paths
