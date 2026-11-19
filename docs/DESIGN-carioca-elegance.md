---
name: Carioca Elegance
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#010101'
  on-primary: '#ffffff'
  primary-container: '#1c1c1c'
  on-primary-container: '#858484'
  inverse-primary: '#c8c6c5'
  secondary: '#a43d04'
  on-secondary: '#ffffff'
  secondary-container: '#fd7f47'
  on-secondary-container: '#682300'
  tertiary: '#030008'
  on-tertiary: '#ffffff'
  tertiary-container: '#231829'
  on-tertiary-container: '#8f7f94'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#7e2c00'
  tertiary-fixed: '#efdcf4'
  tertiary-fixed-dim: '#d3c1d8'
  on-tertiary-fixed: '#221728'
  on-tertiary-fixed-variant: '#4f4255'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
  deep-charcoal: '#1C1C1C'
  brazilian-clay: '#B84C16'
  dusk-shadow: '#4F4255'
  warm-ivory: '#F9F7F2'
  metallic-brass: '#A68966'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  body-lg:
    fontFamily: Libre Franklin
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Libre Franklin
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Libre Franklin
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  button:
    fontFamily: Libre Franklin
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  margin-mobile: 24px
  margin-desktop: 80px
  gutter: 24px
  section-gap: 120px
---

## Brand & Style

The design system embodies "Carioca Elegance"—a sophisticated intersection of JW Marriott’s global luxury standards and the rhythmic soul of Rio de Janeiro. The brand personality is poised, welcoming, and timelessly sober. It targets a discerning global traveler who seeks sanctuary amidst the energy of Copacabana.

The aesthetic follows a **Minimalist-Modern** approach with **High-Contrast** editorial influences. It prioritizes expansive whitespace to evoke a sense of calm and exclusivity. While the core is rooted in classic luxury, subtle nods to Brazilian Modernism—smooth curves and organic transitions—prevent the interface from feeling static or cold. The emotional response should be one of immediate decompression and refined confidence.

## Colors

The palette is anchored by **Deep Charcoal**, used for primary text and structural grounding. **Warm Ivory** replaces sterile white to provide a softer, more luxurious canvas that feels natural under the Rio sun.

**Brazilian Clay** and **Metallic Brass** serve as the primary accents, used sparingly to highlight calls to action or bespoke decorative elements. **Dusk Shadow** (a muted plum-grey) provides depth for secondary UI elements and sophisticated backgrounds, adding a layer of sober richness. The color application should favor high contrast between charcoal and ivory, with brass used for fine-line details.

## Typography

The typography system pairs the high-contrast elegance of **Playfair Display** with the utilitarian precision of **Libre Franklin**. 

- **Headlines:** Use Playfair Display to convey an editorial, prestigious feel. Larger headlines should utilize tighter letter spacing to emphasize the stroke contrast.
- **Body:** Libre Franklin provides a clean, breathable counterpoint. High line-heights are essential to maintain the "luxurious" whitespace even within dense information.
- **Labels:** Small labels and utility text should be set in Libre Franklin with increased tracking (letter spacing) and uppercase styling to create a sense of architectural order.

## Layout & Spacing

This design system utilizes a **Fixed Grid** on desktop (12 columns, 1280px max-width) to ensure the composition remains balanced and intentional, much like a gallery. 

- **Generosity:** Spacing is the most important luxury asset. Use significant vertical gaps (`section-gap`) between content blocks to allow each feature to "breathe."
- **Asymmetry:** Occasionally break the grid with offset images or text blocks to reflect the organic coastline of Rio.
- **Mobile:** Transition to a 4-column fluid grid with 24px margins. Content should reflow vertically, maintaining the high ratio of whitespace.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Subtle Shadows** rather than aggressive elevation.

- **The Surface:** The base is `warm-ivory`. Secondary surfaces use `deep-charcoal` for a dramatic "night mode" section feel.
- **Shadows:** Use extremely soft, ambient shadows (Blur: 40px, Opacity: 4%, Color: `deep-charcoal`). Shadows should feel like the soft glow of dusk, not a digital effect.
- **Refined Borders:** Use 1px solid lines in `metallic-brass` or 10% opacity `deep-charcoal` to define containers without adding visual weight. These lines should feel like fine jewelry.

## Shapes

The shape language is primarily **Soft** and structured. Square corners are softened just enough to remove "sharpness" but retain a sense of architectural formality. 

Images should occasionally utilize a "pill-shaped" crop or a single large-radius corner (e.g., top-left) to mimic the modernist curves found in Burle Marx’s Rio landscapes. Interactive elements like buttons remain strictly rectangular with a minimal 4px radius to maintain a professional, sober silhouette.

## Components

- **Buttons:** Primary buttons are `deep-charcoal` with `warm-ivory` text. Ghost buttons use a `metallic-brass` 1px border. Hover states should feature a subtle background tint shift rather than a color change.
- **Inputs:** Fields are defined by a bottom-border only (1px `deep-charcoal`) to mimic high-end stationery. Labels float above in `label-caps` style.
- **Cards:** Cards use no background color and no border; they are defined by generous padding and the softest possible ambient shadow.
- **Chips/Tags:** Use `warm-ivory` backgrounds with `deep-charcoal` text and a fine 1px border. 
- **Transitions:** All hover and page transitions must be "Slowing Out" (Cubic-Bezier 0.4, 0, 0.2, 1) to feel heavy, intentional, and expensive.
- **Imagery:** Photography should be desaturated with warm highlights, focusing on architectural details and the textures of Rio (stone, water, linen).