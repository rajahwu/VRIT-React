import { RitualBrand } from '@gttm/ritual-brand';
import fs from 'fs';
import path from 'path';

// Generate the theme CSS
const css = RitualBrand.toTailwindCSS();
const outputPath = path.resolve(__dirname, '../src/app/theme.css');

fs.writeFileSync(outputPath, css);
console.log(`✅ Theme compiled to ${outputPath}`);
