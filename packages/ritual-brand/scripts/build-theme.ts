import fs from "fs";
import path from "path";
import { RitualBrand } from "../src/RitualBrand";

console.log("🔮 Ritual Brand: Building design tokens…");

try {
  // ---- 1. Generate CSS from RitualBrand ----
  const css = RitualBrand.toTailwindCSS();

  // Write CSS to dist folder
  const cssOut = path.resolve(__dirname, "../dist/ritual.css");
  fs.writeFileSync(cssOut, css);
  console.log(`✔ CSS emitted to ${cssOut}`);

  // ---- 2. Copy compiled JS + types into dist ----
  const srcDir = path.resolve(__dirname, "../src");
  const distDir = path.resolve(__dirname, "../dist");

  // Only copy .js and .d.ts because tsc already generated them
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    if (file.endsWith(".js") || file.endsWith(".d.ts")) {
      fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
    }
  }

  console.log(`✔ JS + types copied into dist/`);
  console.log("✨ Ritual Brand build complete.");

} catch (err) {
  console.error("❌ Ritual Brand build failed:", err);
  process.exit(1);
}
