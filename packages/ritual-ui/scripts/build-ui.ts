import fs from "fs";
import path from "path";

const INPUT_PATH = path.join(__dirname, "../src/styles.css");
const SRC_OUTPUT_PATH = path.join(__dirname, "../src/ritual-ui.css");
const DIST_OUTPUT_PATH = path.join(__dirname, "../dist/ritual-ui.css");

console.log("🧿 Ritual UI: Building component stylesheet…");

try {
  const css = fs.readFileSync(INPUT_PATH, "utf8");

  // Write to src for dev
  fs.writeFileSync(SRC_OUTPUT_PATH, css);

  // Write to dist for consumers
  fs.writeFileSync(DIST_OUTPUT_PATH, css);

  console.log(`✅ Success: UI CSS written to src/ and dist/`);
  console.log("   Ritual layer stable and ready.");
} catch (error) {
  console.error("❌ Error building ritual-ui CSS:", error);
  process.exit(1);
}
