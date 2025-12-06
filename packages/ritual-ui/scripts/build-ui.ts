import fs from "fs";
import path from "path";

const INPUT_PATH = path.join(__dirname, "../src/styles.css");
const DIST_OUTPUT_PATH = path.join(__dirname, "../dist/styles.css");

console.log("🧿 Ritual UI: Building component stylesheet…");

try {
  // Ensure dist directory exists
  const distDir = path.dirname(DIST_OUTPUT_PATH);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const css = fs.readFileSync(INPUT_PATH, "utf8");

  // Write to dist for consumers
  fs.writeFileSync(DIST_OUTPUT_PATH, css);

  console.log(`✅ Success: UI CSS written to dist/styles.css`);
  console.log("   Ritual layer stable and ready.");
} catch (error) {
  console.error("❌ Error building ritual-ui CSS:", error);
  process.exit(1);
}
