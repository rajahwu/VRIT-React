// packages/ritual-brand/src/RitualBrand.ts
import colors from '../../../design-source/TOKENS_SOURCE/colors.json';
import phases from '../../../design-source/TOKENS_SOURCE/phases.json';
import spacing from '../../../design-source/TOKENS_SOURCE/spacing.json';
import typography from '../../../design-source/TOKENS_SOURCE/typography.json';

export class RitualBrand {
  static getTokens() {
    return { colors, phases, spacing, typography };
  }

  static toTailwindCSS() {
    const lines = ['@theme {'];

    // 1. Palette Colors
    // e.g. --color-zinc-950: #09090b;
    Object.entries(colors.palette).forEach(([hue, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        lines.push(`  --color-${hue}-${shade}: ${value};`);
      });
    });

    // 2. Semantic Colors (mapping to palette)
    // e.g. --color-base-background: var(--color-zinc-950);
    Object.entries(colors.base).forEach(([key, value]) => {
       lines.push(`  --color-base-${key}: var(--color-${value});`);
    });

    // 3. Spacing
    // e.g. --spacing-md: 16px;
    Object.entries(spacing.spacing).forEach(([key, value]) => {
      lines.push(`  --spacing-${key}: ${value};`);
    });

    // 4. Typography (Fonts)
    // e.g. --font-mono: "JetBrains Mono", monospace;
    Object.entries(typography.fonts).forEach(([key, config]) => {
      lines.push(`  --font-${key}: ${config.family};`);
    });

    lines.push('}');
    return lines.join('\n');
  }
}
