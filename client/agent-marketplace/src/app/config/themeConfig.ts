// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// THEME CONFIGURATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// To add a new theme:
//   1. Add a new entry to the THEMES object below
//   2. Choose a layoutVariant: 'centered' | 'left-aligned' | 'split'
//   3. Define your colors, images, and overlay classes
//   4. That's it — every component reads from this config automatically.
// See THEME_GUIDE.md for a full walkthrough.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type LayoutVariant = 'centered' | 'left-aligned' | 'split';

export interface ThemeConfig {
  /** Unique ID used internally (matches the key in THEMES) */
  id: string;
  /** Display name shown in the theme picker */
  name: string;
  /** Which hero/footer/section layout style to use */
  layoutVariant: LayoutVariant;
  /** CSS color values applied as custom properties */
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    gradient: string;
  };
  /** Gradient swatch for the theme picker button */
  swatchGradient: string;
  /** Hero section background images */
  heroImages: string[];
  /** CSS class for the hero overlay (gradient on top of images) */
  heroOverlayClass: string;
  /** CSS class for the footer background */
  footerBgClass: string;
  /** Accent color class for footer links on hover */
  footerAccentClass: string;
  /** WhyTrustUs section background class */
  trustBgClass: string;
}

// ── Theme Definitions ───────────────────────────────────

const THEMES: Record<string, ThemeConfig> = {
  navy: {
    id: 'navy',
    name: 'Navy',
    layoutVariant: 'centered',
    colors: {
      primary: '#1e3a8a',
      primaryDark: '#1e40af',
      secondary: '#3b82f6',
      accent: '#0ea5e9',
      gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    },
    swatchGradient: 'from-blue-900 to-blue-600',
    heroImages: [
      'https://images.unsplash.com/photo-1765978372751-aa89dc6d30e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwdmFjYXRpb258ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhcmFkaXNlJTIwaXNsYW5kfGVufDF8fHx8MTc3NDQzNDAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBzY2VuaWN8ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    heroOverlayClass: 'bg-gradient-to-b from-blue-900/85 via-blue-900/70 to-blue-900/90',
    footerBgClass: 'bg-gradient-to-b from-gray-900 to-blue-950',
    footerAccentClass: 'hover:text-blue-400',
    trustBgClass: 'bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900',
  },

  red: {
    id: 'red',
    name: 'Red',
    layoutVariant: 'left-aligned',
    colors: {
      primary: '#dc2626',
      primaryDark: '#b91c1c',
      secondary: '#f97316',
      accent: '#fb923c',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    },
    swatchGradient: 'from-red-600 to-orange-500',
    heroImages: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMHRyYXZlbHxlbnwxfHx8fDE3NzQ0MzQwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMHBlYWt8ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBzY2VuaWN8ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    heroOverlayClass: 'bg-gradient-to-tr from-red-900/95 via-orange-900/80 to-transparent',
    footerBgClass: 'bg-gradient-to-br from-gray-900 via-red-950 to-black',
    footerAccentClass: 'hover:text-orange-400',
    trustBgClass: 'bg-gradient-to-br from-red-50 via-orange-50 to-white dark:from-gray-900 dark:via-red-900/10 dark:to-gray-900',
  },

  cyan: {
    id: 'cyan',
    name: 'Cyan',
    layoutVariant: 'split',
    colors: {
      primary: '#06b6d4',
      primaryDark: '#0891b2',
      secondary: '#0ea5e9',
      accent: '#22d3ee',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
    },
    swatchGradient: 'from-cyan-500 to-blue-500',
    heroImages: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhcmFkaXNlJTIwaXNsYW5kfGVufDF8fHx8MTc3NDQzNDAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMG9jZWFuJTIwd2F2ZXN8ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbmQlMjB0cm9waWNhbCUyMGJlYWNofGVufDF8fHx8MTc3NDQzNDAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    heroOverlayClass: 'bg-gradient-to-l from-transparent via-cyan-500/10 to-cyan-50 dark:to-gray-900',
    footerBgClass: 'bg-gradient-to-b from-gray-900 to-gray-950',
    footerAccentClass: 'hover:text-cyan-400',
    trustBgClass: 'bg-gradient-to-b from-white to-cyan-50 dark:from-gray-900 dark:to-gray-800',
  },
};

// ── Helpers ──────────────────────────────────────────────

/** Get the full config for a theme by its ID */
export function getThemeConfig(id: string): ThemeConfig {
  return THEMES[id] || THEMES.navy;
}

/** Get all registered theme configs (for rendering the picker) */
export function getAllThemes(): ThemeConfig[] {
  return Object.values(THEMES);
}

/** Get all available theme IDs */
export function getThemeIds(): string[] {
  return Object.keys(THEMES);
}

export default THEMES;
