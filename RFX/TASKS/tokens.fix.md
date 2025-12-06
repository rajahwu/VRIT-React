# Token Pipeline Fix Tasks

## Purpose
Ensure ritual-brand generates:
- dist/ritual.css
- dist/variables.css

## Tasks
- [ ] Add dedicated toVariablesCSS() method
- [ ] Add emission to dist/variables.css
- [ ] Ensure the ritual-brand build script emits both
- [ ] Make ui package import ONLY from dist/

## Acceptance Criteria
- ritual-brand/dist/ritual.css contains @theme
- ritual-brand/dist/variables.css contains :root variables
- ritual-ui sees brand tokens on build
