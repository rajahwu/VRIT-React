// @gttm/ritual-brand
// The Pipeline: Translates Mythic Layer (JSON) into Code.

// Import DNA directly from the Source of Truth
// Note: Requires "resolveJsonModule": true in tsconfig
import phasesData from '../../../design-source/TOKENS_SOURCE/phases.json';
import colorsData from '../../../design-source/TOKENS_SOURCE/colors.json';
import spacingData from '../../../design-source/TOKENS_SOURCE/spacing.json';
import typographyData from '../../../design-source/TOKENS_SOURCE/typography.json';

// --- TYPE DEFINITIONS ---

export type PhaseId = 'plan' | 'sprint' | 'rest' | 'reflect' | 'recover';

export interface PhaseToken {
  id: PhaseId;
  name: string;
  gesture: string;
  prompt: string;
  duration: number; // in seconds
  color: string; // Tailwind class e.g., "bg-amber-500"
  textColor: string;
  borderColor: string;
}

export interface RitualTheme {
  base: {
    background: string;
    text: string;
    border: string;
    muted: string;
  };
  phases: Record<PhaseId, {
    color: string;
    textColor: string;
    borderColor: string;
  }>;
}

// --- EXPORTS ---

/**
 * The 5 Immutable Phases of the Ritual.
 * Sourced from: design-source/TOKENS_SOURCE/phases.json
 */
export const PHASES: PhaseToken[] = phasesData as PhaseToken[];

/**
 * The Zinc-950 and Phase Color Palette.
 * Sourced from: design-source/TOKENS_SOURCE/colors.json
 */
export const THEME: RitualTheme = colorsData as RitualTheme;

/**
 * Spacing and Grid Tokens.
 * Sourced from: design-source/TOKENS_SOURCE/spacing.json
 */
export const SPACING = spacingData;

/**
 * Typography Scale and Families.
 * Sourced from: design-source/TOKENS_SOURCE/typography.json
 */
export const TYPOGRAPHY = typographyData;

// Helper to get a phase by ID safely
export const getPhase = (id: PhaseId): PhaseToken | undefined => {
  return PHASES.find(p => p.id === id);
};
