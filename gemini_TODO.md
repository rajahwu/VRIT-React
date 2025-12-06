# ✅ **Ritual React – Coding Agent TODO List**

### **1. Correct UI Layout & Width Issues**

* [ ] Investigate why `RitualCycleTracker` collapses to ~100px width.
* [ ] Confirm CSS variables from `@gttm/ritual-brand/variables.css` are loaded BEFORE component CSS.
* [ ] Remove deprecated `tailwind-base` classes inside components.
* [ ] Apply correct container constraints:

  * [ ] `max-w-container` (hooked to `--breakpoint-lg`)
  * [ ] `mx-auto`
  * [ ] `w-full`
* [ ] Add fallback styles: fixed min-width (`min-w-[360px]`) for mobile-first load.
* [ ] Ensure `flex-1` containers inside the Hub layout do not collapse.

### **2. Fix Namespace + Imports**

* [ ] Update *all* Ritual UI packages to import:

  ```ts
  import '@gttm/ritual-brand/variables.css';
  import '@gttm/ritual-brand/ritual.css';
  ```
* [ ] Remove old imports from `globals.css` that point to:

  * `@gttm/ritual-ui/styles.css`
  * `@gttm/ritual-brand/ritual.css`
    Replace with *variables-first, theme-second*.

### **3. Standardize Ritual-UI Build Output**

* [ ] Ensure Ritual UI outputs **two CSS files**:

  * `variables.css` (raw tokens)
  * `ritual-ui.css` (component-level styles)
* [ ] Ensure both are copied to `dist/` during build.
* [ ] Ensure imports in the index.ts look like:

  ```ts
  import './variables.css';
  import './ritual-ui.css';
  export * from './RitualCycleTracker';
  ```

### **4. Implement the Net / Tracker Column Layout**

* [ ] Ensure Hub’s layout uses:

  ```html
  <Sidebar />
  <main class="flex-1 ml-64">
    <RitualCycleTracker />
  </main>
  ```
* [ ] Add a new `<div class="container">` wrapper inside the Cycle Tracker to prevent collapse.
* [ ] Fix the right-hand Net panel:

  * [ ] Desktop: static right-side column
  * [ ] Mobile: slide-over

### **5. Token System Enhancements**

* [ ] Add method to `RitualBrand`:

  ### `toCSSVariables()`

  * Extract only tokens → output `variables.css`.
  * No theme syntax (`@theme`).
* [ ] Update `build-theme.ts` to:

  * [ ] Write `variables.css`
  * [ ] Write `ritual.css`
  * [ ] Copy JS/TS types
  * [ ] Log results cleanly

### **6. Update the CLI Agent Tasks**

* [ ] Add tasks to validate tokens:

  ```sh
  gttm tokens:lint
  ```
* [ ] Add tasks to rebuild all packages in correct order:

  ```sh
  gttm build:brand
  gttm build:ui
  gttm build:hub
  ```

### **7. Regression Tests**

* [ ] Add visual snapshots:

  * [ ] CycleTracker desktop
  * [ ] CycleTracker mobile
  * [ ] Net open / closed
* [ ] Add CI step: “Ensure Stage Width ≥ 720px”.

---

# 📦 **Repo Report (Technical Summary)**

*(for automation + committing to docs folder)*

## **Project: Ritual React Monorepo**

**Status:** Partial alignment with new Token System.
**Primary Issue:** UI layout collapse caused by missing token imports + conflicting CSS cascade.

### **1. Brand Package (GOOD with minor tasks)**

**Found:**

* `RitualBrand.ts` correctly compiles `@theme` CSS.
* Added logic for container + grid tokens.
* Output exists in:
  `packages/ritual-brand/dist/ritual.css`

**Issues:**

* Missing `variables.css` file for low-level tokens.
* UI packages referencing outdated paths.

### **2. Ritual-UI Package (NEEDS FIX)**

**Found:**

* Components compiled correctly.
* Internal CSS exists:

  * `styles.css`
  * `ritual-ui.css`

**Issues:**

* Does not import `variables.css`
* Missing container + width styling
* CycleTracker collapses due to flex parent chain + missing constraints
* Hub layout needs a `.container` wrapper

### **3. Hub App (NEEDS FIX)**

**Found:**

* Layout defined with static Sidebar + main content.
* CycleTracker injected as a child.

**Issues:**

* Global imports in `globals.css` are not aligned with new brand token pipeline.
* Net (right panel) is absolutely positioned but not constrained.

### **4. Token Sources (GOOD)**

* `design-source/TOKENS_SOURCE/*` valid and complete.
* All necessary fields exist.

### **5. Build System (PARTIAL)**

* Ritual Brand build script works.
* Ritual UI build script missing variable export.
* No global build orchestration (workspace-level script recommended).

