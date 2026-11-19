---
name: Copacabana Expressive Luxury
colors:
  surface: '#fef9ef'
  surface-dim: '#ded9d1'
  surface-bright: '#fef9ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ea'
  surface-container: '#f2ede4'
  surface-container-high: '#ede8df'
  surface-container-highest: '#e7e2d9'
  on-surface: '#1d1c16'
  on-surface-variant: '#4e463a'
  inverse-surface: '#32302a'
  inverse-on-surface: '#f5f0e7'
  outline: '#7f7668'
  outline-variant: '#d1c5b5'
  surface-tint: '#765a26'
  primary: '#735724'
  on-primary: '#ffffff'
  primary-container: '#8e703a'
  on-primary-container: '#fffbff'
  inverse-primary: '#e7c183'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#5c5c5a'
  on-tertiary: '#ffffff'
  tertiary-container: '#757572'
  on-tertiary-container: '#fefcf9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdeaa'
  primary-fixed-dim: '#e7c183'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5c4211'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2df'
  tertiary-fixed-dim: '#c8c6c4'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#474745'
  background: '#fef9ef'
  on-background: '#1d1c16'
  surface-variant: '#e7e2d9'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '500'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.18em
  label-md:
    fontFamily: Montserrat
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.15em
  label-sm:
    fontFamily: Montserrat
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.2em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 2.5rem
  space-3xl: 3.5rem
  margin-mobile: 1.25rem
  margin-tablet: 2rem
  gutter-mobile: 0.75rem
  gutter-tablet: 1.25rem
---

## Brand & Style

This design system expresses the serene opulence, oceanfront sophistication, and architectural warmth of Rio de Janeiro’s iconic coastline. It marries the timeless prestige of legacy grand hotels with contemporary mobile fluid motion. 

The aesthetic is anchored in **Expressive Tactile Luxury**:
- **Atmosphere**: Breezy, sun-kissed architectural restraint balanced by intimate, tactile warmth.
- **Audience**: Discerning global travelers, luxury tier patrons, and culinary/wellness connoisseurs demanding effortless digital concierge interactions.
- **Visual Rhythm**: Expansive negative space reminiscent of linen stationery, editorial typography pairings, generous touch targets, and layered frosted glass elements that evoke sunlight filtering through sheer seaside drapes.

## Colors

The palette draws directly from natural maritime elements—sun-warmed granite, fine sand, and brushed satin brass fixtures.

- **Primary (`#9E7E47` - Satin Brass)**: Reserved for premier touchpoints, active states, key CTAs, and refined accents. Radiates quiet prestige without garishness.
- **Secondary (`#1C1C1C` - Deep Charcoal)**: Replaces stark black to deliver authoritative contrast, razor-sharp typography, and solid grounding containers.
- **Tertiary (`#FAF8F5` - Warm Ivory)**: The primary canvas. Mimics ultra-luxurious uncoated cotton paper, eradicating eye fatigue caused by clinical blaring whites.
- **Neutral (`#EAE5DC` - Soft Sand)**: Forms subtle dividers, tactile surface elevations, and inactive pill containers.
- **Glass Shading**: Semi-transparent iterations of Warm Ivory (`rgba(250, 248, 245, 0.78)`) combined with subtle brass-tinted borders for floating UI elements.

## Typography

The typography couples the editorial heritage of Playfair Display with the clean geometric precision of Montserrat.

- **Headlines & Editorial Titles**: Rendered in `Playfair Display`. Evokes vintage hospitality menus, architectural crests, and curated oceanfront vignettes. It sets an unhurried, graceful cadence.
- **Body Content**: Set in `Montserrat` with generous line-heights to ensure effortless legibility under varying coastal light conditions.
- **Labels & Overlines**: Strict uppercase styling with wide tracking (`0.15em` to `0.2em`) using `Montserrat SemiBold`. This provides an understated architectural signage feel for amenities, status tags, and metadata.

## Layout & Spacing

The layout model emphasizes airy, non-claustrophobic spaces, allowing imagery and typography room to breathe.

- **Grid Architecture**: 
  - **Mobile (<600px)**: 4-column fluid layout with `1.25rem` (20px) outer edge margins and `0.75rem` gutters.
  - **Tablet (600px–1024px)**: 8-column layout with `2rem` (32px) margins and `1.25rem` gutters, prioritizing balanced dual-pane guest room and itinerary views.
- **Vertical Spacing Cadence**: Governed by an 8pt base grid. Generous vertical breathing room (`2.5rem` to `3.5rem`) divides distinct conceptual sections (such as Penthouse Suites, Spa Reservations, and In-Room Dining).

## Elevation & Depth

This system avoids synthetic digital drops in favor of **Papersheet Layering** and **Luminous Glassmorphism**.

1. **Papersheet Shadows**: Surfaces float with diffused, ambient feathering mimicking thick, textured linen cardstock under soft natural downlight:
   - `Elevation 1 (Cards, Modules)`: `0 4px 20px -2px rgba(28, 28, 28, 0.04), 0 2px 6px -1px rgba(28, 28, 28, 0.02)`
   - `Elevation 2 (Floating sheets, Modals)`: `0 12px 36px -4px rgba(28, 28, 28, 0.08), 0 4px 12px -2px rgba(28, 28, 28, 0.03)`
2. **Frosted Translucency**:
   - Floating Navigation & App Bars: `background: rgba(250, 248, 245, 0.82); backdrop-filter: blur(20px) saturate(180%);`
   - Perimeter Border: 1px continuous hairline stroke in `rgba(158, 126, 71, 0.2)` delivering a fine satin brass rim.

## Shapes

The design leverages expressive, organic contours that echo modernist Brazilian architecture:

- **Cards & Sheet Containers**: Crafted with generous `28px` to `32px` corner radii, instilling an approachable, sculpted tactility.
- **Interactive Controls (Buttons, Inputs, Chips)**: Scaled with full pill morphology or `16px` curvature for contained nested forms.
- **Media Containers**: Hero imagery features asymmetrical arched or continuous organic corner radii (`32px`), softening the viewports onto Copacabana’s coastline.

## Components

### Primary & Secondary Buttons
- **Primary**: Deep charcoal (`#1C1C1C`) fill, satin brass accent text or warm ivory text (`#FAF8F5`), fully rounded pill shape (`9999px`), `56px` height for effortless thumb interaction. Subtle tactile inset highlight on press.
- **Secondary / Brass**: Satin Brass (`#9E7E47`) background with Warm Ivory text for pinnacle VIP actions (e.g., "Upgrade to Oceanfront Presidential").
- **Outline**: 1.5px border in `#9E7E47`, transparent background, with tracking-widest uppercase Montserrat labels.

### Chips & Filter Pills
- **State Inactive**: Soft Sand (`#EAE5DC`) background, Deep Charcoal text, 36px height, rounded-full.
- **State Active**: Deep Charcoal (`#1C1C1C`) background with Satin Brass (`#9E7E47`) typography, elevated with a subtle 2px soft shadow.

### Cards (Suites & Dining)
- Thick ivory paper surfaces (`#FFFFFF` over `#FAF8F5`) surrounded by a subtle 1px border (`#EAE5DC`).
- Curvature set uniformly to `28px` with inset media displaying a matching internal `20px` radius.
- Metadata structured with `label-sm` uppercase indicators above `headline-sm` Playfair Display room titles.

### Input Fields
- Understated architectural text fields. Soft sand background fill (`#FAF8F5`) with a crisp bottom highlight in satin brass (`#9E7E47`) on focus.
- 16px corner rounding, floating uppercase tracking labels, and comfortable 56px minimum hit targets.

### Floating Bottom Bar
- Detached glass capsule hovering 16px above the viewport base.
- Frosted glass construction with backdrop blur, anchored by a micro satin-brass top border.
- Integrated quick-action key for Digital Room Key access utilizing an elevated satin brass circular trigger.

### Checkboxes & Radios
- Radios feature concentric brass rings: outer hairline ring in `#9E7E47`, inner solid dot in `#9E7E47` separated by a 2px ivory halo.
- Checkboxes utilize soft squircle geometry (6px radius) transitioning from Sand border to a solid Deep Charcoal state with an Ivory checkmark.