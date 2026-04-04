# Theme Guide — TG Travels

This guide explains how to create new themes for the TG Travels website **without modifying any component code**.

## How the Theme System Works

The theme system has three layers:

1. **`themeConfig.ts`** — A central config file where all themes are defined. Each theme specifies its colors, layout variant, hero images, and styling classes.
2. **`ThemeContext.tsx`** — The React context that reads from `themeConfig.ts` and applies CSS custom properties dynamically.
3. **CSS Custom Properties** — Components use `var(--theme-primary)`, `var(--theme-secondary)`, etc., which are set at runtime by the ThemeContext.

Components use `layoutVariant` (not color name) to decide which visual layout to render:
- `'centered'` — Centered hero, symmetric footer (Navy-style)
- `'left-aligned'` — Bold left-aligned hero, asymmetric footer (Red-style)
- `'split'` — Split hero with side form, modern footer (Cyan-style)

## Creating a New Theme

### Step 1: Open `src/app/config/themeConfig.ts`

### Step 2: Add a New Entry to the `THEMES` Object

```ts
const THEMES: Record<string, ThemeConfig> = {
  // ... existing themes ...
  
  emerald: {
    id: 'emerald',
    name: 'Emerald',
    layoutVariant: 'centered',  // Reuse any existing layout
    colors: {
      primary: '#059669',       // Main brand color
      primaryDark: '#047857',   // Darker shade for hover states
      secondary: '#10b981',     // Secondary/gradient end color
      accent: '#34d399',        // Accent for highlights
      gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    },
    swatchGradient: 'from-emerald-600 to-emerald-400',  // Tailwind classes for theme picker
    heroImages: [
      'https://images.unsplash.com/photo-1...',  // 3 hero background images
      'https://images.unsplash.com/photo-2...',
      'https://images.unsplash.com/photo-3...',
    ],
    heroOverlayClass: 'bg-gradient-to-b from-emerald-900/85 via-emerald-900/70 to-emerald-900/90',
    footerBgClass: 'bg-gradient-to-b from-gray-900 to-emerald-950',
    footerAccentClass: 'hover:text-emerald-400',
    trustBgClass: 'bg-gradient-to-b from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900',
  },
};
```

### Step 3: Done!

That's it. The new theme will automatically:
- Appear in the theme picker dropdown
- Apply CSS custom properties for all `var(--theme-*)` usages
- Use the chosen `layoutVariant` for hero, footer, and section layouts
- Use the specified hero images and overlay classes

## Theme Config Properties Reference

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier (matches the key) |
| `name` | `string` | Display name in the theme picker |
| `layoutVariant` | `'centered' \| 'left-aligned' \| 'split'` | Which layout style to use |
| `colors.primary` | `string` | Main brand color (hex) |
| `colors.primaryDark` | `string` | Darker shade for hover/active states |
| `colors.secondary` | `string` | Secondary color, used in gradients |
| `colors.accent` | `string` | Accent color for highlights and icons |
| `colors.gradient` | `string` | Full CSS gradient string |
| `swatchGradient` | `string` | Tailwind gradient classes for the picker swatch |
| `heroImages` | `string[]` | Array of 3 hero background image URLs |
| `heroOverlayClass` | `string` | Tailwind class for the hero overlay gradient |
| `footerBgClass` | `string` | Tailwind class for footer background |
| `footerAccentClass` | `string` | Tailwind hover class for footer links |
| `trustBgClass` | `string` | Tailwind class for WhyTrustUs section background |

## Tips

- **Reuse layout variants**: You don't need a new layout for each theme. Three layout variants cover most use cases.
- **Color harmony**: Use tools like [coolors.co](https://coolors.co) or [colorhunt.co](https://colorhunt.co) to pick harmonious palettes.
- **Hero images**: Use high-quality landscape images from Unsplash that match your theme's mood.
- **Dark mode**: The system handles dark mode automatically. Overlay classes should work in both modes.

## Files Affected by Themes

These components read from `themeConfig` and use `layoutVariant`:
- `HeroSection.tsx` — Hero layout + images
- `Footer.tsx` — Footer layout + colors
- `WhyTrustUs.tsx` — Section layout
- `Navbar.tsx` — Theme picker + accent colors
- `PlanTourForm.tsx` — Uses CSS vars only (layout-agnostic)
- `Testimonials.tsx` — Uses CSS vars only (layout-agnostic)
