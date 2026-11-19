# Product Requirement Document (PRD) & Master Project Brief
## JW Marriott Copacabana — Digital Guest Concierge & Experience Suite

---

### Executive Summary & Metadata
- **Project Name:** JW Marriott Copacabana Digital Guest Concierge & Management Ecosystem
- **Brand / Hospitality Property:** JW Marriott Rio de Janeiro (Copacabana Beach, Av. Atlântica)
- **Version:** 1.3.0 (Master Release & Production Baseline)
- **Document Type:** Comprehensive Product Requirements Document (PRD) & Master Design Brief
- **Target Audience:** Hotel Guests (In-suite & mobile), Executive Concierge & Front Desk Staff, Hotel Operations & F&B Management
- **Design System:** Copacabana Expressive Luxury (`Copacabana Expressive Luxury`)
- **Status:** Approved / Production Specification

---

## 1. Problem Statement & Strategic Vision

### 1.1 Context & Problem
High-net-worth guests staying at ultra-luxury beachfront properties like JW Marriott Copacabana demand seamless, frictionless access to hotel amenities, fine dining, acoustic local culture, safety protocols, and personalized services. Traditional physical compendiums or generic hotel portals fail to convey the sensory prestige of Rio de Janeiro's Zona Sul, create friction in authentication, and lack real-time synchronization with operational staff.

### 1.2 Product Vision
Deliver a benchmark-setting digital hospitality experience that merges **Material 3 Expressive** design with authentic Carioca luxury. The application provides an integrated web app ecosystem spanning guest suites, mobile devices, and operations management—delivering instant amenity dispatch, verified regional security guidance, high-fidelity acoustic soundscapes, and daytime vector cartography.

---

## 2. Target Personas & User Journeys

### 2.1 Primary Persona: The Luxury International Guest ("The Discerning Explorer")
- **Profile:** International business and leisure traveler staying in oceanfront suites (e.g., Suite 802).
- **Core Needs:** Instant room keycard access via QR/digital pass, curated Michelin-star dining bookings (*Ristorante Hotel Cipriani*), vetted chauffeur itineraries in Mercedes-Benz vehicles, and verified safety contacts.
- **Pain Points:** Language barriers, fear of security issues in unfamiliar metropolitan areas, clunky login portals requiring passwords.

### 2.2 Secondary Persona: The Cultural Connoisseur
- **Profile:** Guest seeking genuine immersion in Rio's musical and artistic heritage.
- **Core Needs:** Authentic Bossa Nova, Samba, and MPB acoustic curations linked to personal streaming accounts (Spotify, Apple Music, YouTube Music) and historical insights into Copacabana's Burle Marx wave motif.

### 2.3 Tertiary Persona: Hotel Operations & Guest Experience Lead ("The Concierge Supervisor")
- **Profile:** Front desk manager or VIP hospitality lead.
- **Core Needs:** Unified real-time dashboard monitoring suite occupancy, pending in-room dining orders, amenity requests (spa, valet, housekeeping), and broadcasting priority guest notifications.

---

## 3. Core Functional Requirements & Architecture

The application is structured into seven tightly integrated core functional modules:

### 3.1 Module 1: Guest Experience & Personalized Welcome (`JW Marriott Guest Experience`)
- **Dynamic Personalized Greeting:** Displays guest identity and suite designation (e.g., *"Welcome John Doe · Suite 802"* / *"Bem-vindo ao Rio"*).
- **Editorial Oceanfront Hero:** High-resolution Atlantic dawn perspective from suite balcony with warm morning sunlight.
- **Burle Marx Heritage Showcase:** Cultural spotlight on Roberto Burle Marx’s iconic black-and-white wave calcadao pavement.
- **Signature Culinary & Nightlife Modules:**
  - *Ristorante Hotel Cipriani* (Michelin-starred Italian culinary experience).
  - *Baretto-Londra Jazz Lounge* (Ambient cocktail and jazz sanctuary).
- **Interactive Amenity Quick-Bar:** Immediate one-tap requests for Turn-down, Fresh Towels, Sommelier, and Valet.
- **Bilingual Switcher:** Native instant toggle between English (US) and Portuguese (BR).

### 3.2 Module 2: Acoustic Wellness & Soundscape (`Carioca Rhythm`)
- **Soundscape Collections:** Four curated listening experiences: *Bossa Nova Morning Light*, *Sunset at Arpoador*, *Lapa Roots Samba*, and *Evening in Ipanema*.
- **Thematic Glassmorphic Streaming Integration:** Deep-linked buttons to third-party streaming providers with custom glow states:
  - *Spotify* (Emerald `#1DB954` glow with glassmorphic backing).
  - *YouTube Music* (Crimson `#FF0000` glow).
  - *Apple Music* (Magenta/Rose `#FC3C44` glow).
- **Floating Sticky Player:** Anchored audio bar with playback timeline, track metadata, suite audio cast capability, and volume control.

### 3.3 Module 3: Vector Cartography & Regional Guide (`Explore Copacabana & Beyond`)
- **Mandatory Cartographic Standard:** Strictly standardized daytime **Google Maps Light Mode vector cartography** with soft sand terrain, pastel arterial avenues, and crisp branded pin beacons. (Note: Dark/gold maps are retired).
- **Interactive Curated Landmarks:**
  - *Forte de Copacabana & Confeitaria Colombo*
  - *Pedra do Arpoador & Sunset Viewpoint*
  - *Corcovado & Cristo Redentor*
  - *Pão de Açúcar (Sugarloaf Cable Car)*
  - *Santa Teresa & Bohemian Heritage*
- **Executive Chauffeur Planner:** Seamless booking for private armored Mercedes-Benz V-Class / S-Class ground transportation.

### 3.4 Module 4: Verified Safety & 24/7 Concierge (`Guest Services & Safety`)
- **Verified Emergency Hotline Grid:**
  - Tourist Police (BPTur): `+55 (21) 2332-2924`
  - Policia Militar: `190`
  - SAMU Ambulance: `192`
  - In-House Hotel Security: `Ext. 99`
- **Zona Sul Safety Protocols:** Bento-style safety advice covering beach etiquette (Posto 5 protocol), currency exchange, and secure cultural routes (e.g., Santiago Calatrava's *Museu do Amanhã*).
- **Direct Department Speed Dial:** Front Desk, Housekeeping, Butler Service, and Valet.

### 3.5 Module 5: Suite Authentication & Digital Keycard (`Guest QR & Suite Authentication`)
- **Optical QR Code Scanner & Pass Generation:** Frictionless NFC/QR digital pass generation synced with Marriott Bonvoy®.
- **Passwordless Suite Verification:** Verification via reservation confirmation number and room assignment.
- **Mobile Wallet Integration:** Ready-to-save digital pass badge for Apple Wallet / Google Wallet.

### 3.6 Module 6: Operations & Hospitality Console (`Management Dashboard`)
- **Live Room Status & Occupancy:** Suite availability, VIP arrivals, and occupancy metrics.
- **Real-Time Request Dispatch:** Kanban and list views for room service, housekeeping, luggage handling, and spa reservations.
- **Broadcast System:** Emergency and promotional push broadcast console for guests.

### 3.7 Module 7: Modals Suite & Resilient Loading States (`Modals Suite & Skeletons`)
- **Interactive Modals:**
  - *In-Room Amenities & Linen Request Modal*
  - *Fine Dining Table Reservation Modal* with sommelier preferences.
  - *Executive Valet & Chauffeur Scheduling Modal*.
- **Skeleton Screen Framework:** Multi-breakpoint skeleton loaders mimicking typography and card geometry to prevent layout shifts during asynchronous data fetches.

---

## 4. Visual Design System, Brand Guidelines & UX Standards

### 4.1 Design Philosophy: Copacabana Expressive Luxury
A curated convergence of **Material 3 Expressive** and ultra-luxury hospitality:
- **Warm Ivory / Sand Canvas:** `#FAF8F5`, `#FEF9EF`
- **Surface Elevation Containers:** Pure White `#FFFFFF`, Surface Dim `#DED9D1`, Surface Container Low `#F8F3EA`
- **Deep Contrast Charcoal / Night Slate:** `#1C1C1C`, `#141414`
- **Noble Metals (Copacabana Gold / Satin Brass):** Accent `#9E7E47`, Metallic Brass `#C5A880`

### 4.2 Elevation, Depth & Radii
- **Papersheet Tactile Shadows:** Cards employ delicate, multi-layered shadows (`box-shadow: 0 4px 20px -2px rgba(28,28,28,0.06)`) transitioning with a smooth lift on hover (`hover:-translate-y-0.5 hover:shadow-xl`).
- **Corner Radii:** Uniform rounded geometry using `rounded-2xl` (16px) for cards and `rounded-3xl` (24px) for prominent hero containers, modals, and pills.
- **Glassmorphism:** Navigation headers and floating controls utilize `backdrop-blur-md` combined with 95% opacity ivory backgrounds (`bg-[#FAF8F5]/95`) and satin brass borders (`border-b border-[#9E7E47]/20`).

### 4.3 Official Brand Identity
- **Heraldic Griffin Logo:** The authentic JW Marriott Griffin emblem is featured in the main header and brand touchpoints.
- **Institutional Wordmark:** Serif typography set with expansive letter tracking (`JW MARRIOTT` with `letter-spacing: 0.25em`).
- **High-Contrast Dark Footer Asset:** Inverted pure white vector silhouette emblem reserved exclusively for the 4-column master footer (`#141414`).

---

## 5. Non-Functional & Technical Specifications

| Dimension | Specification | Standard / Requirement |
| :--- | :--- | :--- |
| **Responsiveness** | Fluid Multi-Breakpoint | Desktop (1440px+), Laptop (1024px-1280px), Tablet (768px-1023px), Mobile (375px-430px) |
| **Performance** | Web Vitals & Asset Loading | LCP < 1.8s, FID/INP < 100ms, CLS = 0 (mitigated by Skeleton framework) |
| **Accessibility** | WCAG 2.1 AA Compliance | Contrast ratios ≥ 4.5:1 for body copy against sand canvas, full keyboard tab order on modals |
| **Localization** | Dual Language (EN / PT) | Context-aware UI copy in American English (EN-US) and Brazilian Portuguese (PT-BR) |
| **Security & Privacy** | Guest Isolation & Passports | Transient QR session keys expiring upon checkout; zero caching of sensitive PII |

---

## 6. Implementation Roadmap & Release History

- **v1.0.0 (Core Baseline):** Master guest portal, acoustic lounge, and safety directory created.
- **v1.1.0 (Cartographic Standardization):** Complete retirement of dark/gold maps; standardization across all views on daytime Google Maps Light Mode cartography.
- **v1.2.0 (Component Uniformity & Prototyping):** End-to-end interactive prototypes, papersheet hover elevations, unified 4-column footer, and verified SVG asset integration.
- **v1.3.0 (Master PRD & Brief):** Consolidated specifications, technical constraints, user stories, and acceptance criteria formalization.

---

## 7. Acceptance Criteria & Quality Checklist

- [x] All 7 core modules verified and navigable via unified navigation headers and breadcrumbs.
- [x] Authentic JW Marriott Griffin emblem displayed in TopNav and white vector version in footer.
- [x] All maps adhere to Google Maps Light Mode vector cartography.
- [x] Streaming links feature brand-specific glassmorphic lighting (Spotify green, YouTube red, Apple magenta).
- [x] Full mobile, tablet, and desktop responsiveness verified with zero horizontal overflow.
- [x] Modals, skeletons, and floating audio player fully styled with papersheet shadows and satin brass accents.