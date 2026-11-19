import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Waves,
  Wine,
  Car,
  Compass,
  Utensils,
  Music,
  ArrowUpRight,
  Award,
  KeyRound,
  Play,
  Sun,
  Crown,
  RotateCw,
  Calendar,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { useConcierge, SOUNDSCAPE_COLLECTIONS } from '../context/ConciergeContext';

// Authentic handwritten cursive vector signature of J. Willard Marriott
const JWSignature: React.FC<{ className?: string }> = ({ className = 'h-10 w-auto' }) => (
  <svg
    viewBox="0 0 280 75"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="J. Willard Marriott signature"
  >
    {/* Elegant handwritten ink calligraphy of J.W. Marriott */}
    <path
      d="M28 22 C32 14, 46 10, 52 18 C56 24, 44 44, 36 56 C30 65, 16 63, 18 52 C20 42, 32 39, 44 40"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="49" cy="46" r="1.6" fill="currentColor" />
    <path
      d="M58 26 C62 38, 66 50, 71 50 C76 50, 80 32, 85 26 C89 32, 94 50, 99 50 C104 50, 110 35, 115 26"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="120" cy="46" r="1.6" fill="currentColor" />
    <path
      d="M130 50 C132 34, 137 20, 146 18 C153 16, 156 28, 158 38 C162 26, 172 22, 178 24 C183 26, 184 34, 186 48"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M189 40 C193 34, 198 32, 203 32 C209 32, 210 39, 211 46 C213 39, 218 34, 224 34 C230 34, 232 40, 234 46"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M236 40 C240 34, 245 32, 250 32 C255 32, 257 38, 258 46 L260 28 M254 36 L265 36"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Signature underline flourish in warm satin brass */}
    <path
      d="M136 56 Q195 62 265 52 Q274 51 254 60 Q180 66 95 60"
      stroke="#9E7E47"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export const GuestExperienceModule: React.FC = () => {
  const {
    t,
    language,
    setActiveModule,
    setActiveModal,
    addRequest,
    selectTrack,
  } = useConcierge();

  const [activeSuiteTab, setActiveSuiteTab] = useState<'penthouse' | 'spa' | 'dining'>('penthouse');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isNudging, setIsNudging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Periodic tactile 3D flip invite gesture with low frequency (every 18s) when idle (not flipped or hovered)
  useEffect(() => {
    if (isFlipped || isHovered) {
      setIsNudging(false);
      return;
    }

    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerNudge = () => {
      setIsNudging(true);
      resetTimer = setTimeout(() => {
        setIsNudging(false);
      }, 1500);
    };

    // First invitation after 6.5s of calm, recurring with low frequency every 18s
    const initialTimer = setTimeout(triggerNudge, 6500);
    const interval = setInterval(triggerNudge, 18000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [isFlipped, isHovered]);

  const handleQuickAmenity = (type: 'turndown' | 'towels' | 'sommelier' | 'valet') => {
    if (type === 'turndown') {
      setActiveModal('amenities');
      return;
    }
    if (type === 'sommelier') {
      setActiveModal('dining');
      return;
    }
    if (type === 'valet') {
      setActiveModal('valet');
      return;
    }
    if (type === 'towels') {
      addRequest({
        category: 'Amenity',
        title:
          language === 'en'
            ? 'Suite 802 Heated Plush Bath & Copacabana Beach Towels'
            : 'Suíte 802 — Kit de Toalhas Aquecidas de Banho e Praia',
        details: 'Immediate delivery to Oceanfront Suite 802',
        priority: 'Standard',
      });
    }
  };

  return (
    <div className="bg-copacabana-canvas bg-burle-marx-waves">
      {/* SECTION 1: Full-Bleed Atmospheric Oceanfront Hero + Overlapping Quick-Bar */}
      <section className="relative pt-6 sm:pt-10 pb-20 px-4 sm:px-8 max-w-[1380px] mx-auto">
        {/* Striking Luxury Creamy Bone Leather Suite Keycard with Dark Saddle Stitches (Inspired by JW Marriott Keycard s-l1600.webp) */}
        {/* Features: 3D Card Flip on Click, Subtle Luxury Hover Lift, Bottom Paper Sheet Shadow, Luminous Ethereal Side Halos, Concentric Inner Stitch Trace */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mb-12 mx-auto w-full max-w-[300px] sm:max-w-[316px] md:max-w-[680px] lg:max-w-[720px] group keycard-perspective"
        >
          {/* Unified Ethereal Ambient Glow: Single Continuous Luxury Gradient (Satin Brass Gold -> Rio Sunset Terracotta) */}
          <div
            aria-hidden="true"
            className="keycard-unified-glow transition-all duration-700 group-hover:scale-[1.03]"
          />

          {/* Paper Sheet Shadow on the Card Bottom with Floating Breathing Effect */}
          <div
            aria-hidden="true"
            className="absolute -bottom-5 inset-x-6 sm:inset-x-12 md:inset-x-24 h-8 sm:h-10 bg-[#1C1C1C]/16 blur-xl rounded-[50%] pointer-events-none transition-transform duration-600 group-hover:scale-[1.02] group-hover:opacity-85 keycard-shadow-breathing"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-2 inset-x-10 sm:inset-x-20 md:inset-x-40 h-4 bg-[#1C1C1C]/10 blur-md rounded-[50%] pointer-events-none transition-transform duration-600 group-hover:scale-[1.02] keycard-shadow-breathing"
          />

          {/* Floating Stage Wrapper (Ambient Levitation in the Air) */}
          <div className="keycard-floating-stage">
            {/* 3D Flipping Keycard Element with Tactile Idle Nudge & Subtle Hover Lift */}
            <div
              onClick={() => setIsFlipped((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsFlipped((prev) => !prev);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={
                isFlipped
                  ? language === 'pt'
                    ? 'Virar para ver chave da suíte'
                    : 'Flip to view suite keycard'
                  : language === 'pt'
                  ? 'Virar para ver detalhes da estadia'
                  : 'Flip to view stay folio'
              }
              className={`keycard-flipper ${
                isFlipped ? 'is-flipped' : ''
              } ${
                isNudging && !isFlipped ? 'is-nudging' : ''
              } keycard-container-base cursor-pointer transition-transform duration-700 ease-out hover:-translate-y-1 sm:hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#9E7E47]/40 aspect-[54/85.6] md:aspect-[85.6/54]`}
            >
              {/* ============================================================== */}
              {/* FRONT FACE: Creamy Leather Keycard (Guest & Room Centerpiece)  */}
              {/* ============================================================== */}
              <div
                className={`keycard-face relative z-10 leather-creamy-white stitched-dark paper-sheet-bottom-shadow keycard-container-base overflow-hidden shadow-[0_24px_55px_-12px_rgba(24,20,16,0.18)] aspect-[54/85.6] md:aspect-[85.6/54] flex flex-col justify-between ${
                  isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
                }`}
              >
                {/* Ambient Radial Top Glow & Sheen */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />

                {/* Subtle Champagne Gold Sheen that sweeps across when the card does the flip invite gesture */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-[#C5A880]/20 to-transparent pointer-events-none transition-all duration-1000 ${
                    isNudging ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                  }`}
                />

                {/* Flip Affordance Pill (Desktop Only - Inside Front Face, Never Mirrored, Zero Mobile Overlap) */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                  className={`hidden md:inline-flex absolute top-4 right-5 sm:top-5 sm:right-6 md:top-5 md:right-7 z-30 items-center gap-1.5 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] bg-[#1C1C1C]/10 hover:bg-[#1C1C1C]/18 text-[#2E2820] border border-[#9E7E47]/30 transition-all shadow-2xs group-hover:border-[#9E7E47] group-hover:scale-105 cursor-pointer ${
                    isNudging
                      ? 'ring-2 ring-[#C5A880]/60 border-[#9E7E47] scale-105 bg-[#1C1C1C]/18 shadow-xs'
                      : ''
                  }`}
                  title={language === 'pt' ? 'Ver detalhes da estadia' : 'Flip to stay folio'}
                >
                  <RotateCw
                    className={`w-3 h-3 text-[#9E7E47] transition-transform duration-700 ${
                      isNudging ? 'rotate-180' : 'group-hover:rotate-180'
                    }`}
                  />
                  <span>{language === 'pt' ? 'Ver Estadia' : 'Stay Folio'}</span>
                </div>

              {/* MOBILE VIEW (< md): Authentic Vertical Standing Keycard */}
              <div className="md:hidden flex flex-col items-center justify-between text-center h-full p-5 gap-3 relative z-10 w-full flex-1">
                {/* Top: JW Marriott Griffin & Brand Header */}
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="/assets/jw-marriott-logo.png"
                    alt="JW Marriott Official Griffin Emblem"
                    className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#221F1C]">
                      JW MARRIOTT
                    </p>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9E7E47]">
                      COPACABANA · RIO DE JANEIRO
                    </p>
                  </div>
                  <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#9E7E47]/50 to-transparent mx-auto" />
                </div>

                {/* Center: Guest Name & Suite Keycard Details */}
                <div className="flex flex-col items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.20em] bg-[#1C1C1C] text-[#C5A880] shadow-xs">
                    <Crown className="w-3 h-3 text-[#9E7E47]" />
                    <span>MARRIOTT BONVOY® TITANIUM ELITE</span>
                  </div>

                  <h1 className="font-serif-luxury text-2xl font-semibold text-[#1C1C1C] tracking-tight leading-tight">
                    {t.welcome.greeting}
                  </h1>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] leading-relaxed text-[#9E7E47]">
                    {t.welcome.subGreeting}
                  </p>
                </div>

                {/* Bottom: Action Controls (Contained within safe margins) */}
                <div className="w-full flex flex-col gap-2 pb-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModule('auth', true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[#1C1C1C] text-[#C5A880] hover:bg-[#9E7E47] hover:text-white transition-all cursor-pointer shadow-md"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-[#9E7E47]" />
                    <span>{t.nav.digitalKey}</span>
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium bg-white/80 border border-[#9E7E47]/20 text-[#1C1C1C] shadow-2xs">
                      <Sun className="w-3 h-3 text-[#9E7E47]" />
                      <span>26°C · Posto 5</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium bg-white/80 border border-[#9E7E47]/20 text-[#4E463A] shadow-2xs">
                      <Sparkles className="w-3 h-3 text-[#9E7E47]" />
                      <span>Butler 24/7</span>
                    </span>
                  </div>

                  {/* Gentle Tap Affordance Hint (Mobile Only - Positioned Comfortably Inside Stitches) */}
                  <div
                    className={`flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] select-none transition-all duration-500 ${
                      isNudging ? 'text-[#9E7E47] scale-105' : 'text-[#9E7E47]/90'
                    }`}
                  >
                    <RotateCw
                      className={`w-3 h-3 text-[#9E7E47] transition-transform duration-700 ${
                        isNudging ? 'rotate-180' : ''
                      }`}
                    />
                    <span>{language === 'pt' ? 'Toque no cartão para ver estadia' : 'Tap card to view stay folio'}</span>
                  </div>
                </div>

                {/* Authentic Keycard Manufacturing Imprint (Inside Stitch Bounds) */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3.5 right-4 sm:bottom-4 sm:right-5 text-[9px] font-mono tracking-[0.24em] font-bold text-[#7F7668]/55 uppercase select-none pointer-events-none"
                >
                  PLI
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-3.5 left-4 sm:bottom-4 sm:left-5 text-[8px] font-mono tracking-[0.16em] text-[#7F7668]/50 uppercase select-none pointer-events-none"
                >
                  JW-802 · RFID
                </span>
              </div>

              {/* DESKTOP VIEW (md+): Expansive Wide Keycard Plaque */}
              <div className="hidden md:grid md:grid-cols-12 md:gap-6 md:items-center h-full p-6 relative z-10 w-full flex-1">
                {/* Left Column (3 cols): Authentic JW Marriott Griffin Emblem & Brand Heritage */}
                <div className="col-span-3 flex flex-col items-center text-center gap-3 pr-6 border-r border-[#9E7E47]/25">
                  <img
                    src="/assets/jw-marriott-logo.png"
                    alt="JW Marriott Official Griffin Emblem"
                    className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#221F1C]">
                      JW MARRIOTT
                    </p>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9E7E47]">
                      COPACABANA · RIO DE JANEIRO
                    </p>
                  </div>
                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#9E7E47]/45 to-transparent mx-auto" />
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold text-[#4E463A] bg-[#FAF8F5]/90 border border-[#9E7E47]/25 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>RFID · NFC</span>
                  </div>
                </div>

                {/* Center Column (6 cols): Guest of Honor Centerpiece */}
                <div className="col-span-6 flex flex-col items-center text-center gap-3">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.20em] bg-[#1C1C1C] text-[#C5A880] shadow-xs">
                    <Crown className="w-3.5 h-3.5 text-[#9E7E47]" />
                    <span>MARRIOTT BONVOY® TITANIUM ELITE</span>
                  </div>

                  <h1 className="font-serif-luxury text-[28px] lg:text-[32px] font-semibold text-[#1C1C1C] tracking-tight leading-[1.15]">
                    {t.welcome.greeting}
                  </h1>

                  <p className="text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.18em] leading-relaxed text-[#9E7E47]">
                    {t.welcome.subGreeting}
                  </p>
                </div>

                {/* Right Column (3 cols): Quick Actions & Privileges */}
                <div className="col-span-3 flex flex-col items-center text-center gap-2 pl-6 border-l border-[#9E7E47]/25">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModule('auth', true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] bg-[#1C1C1C] text-[#C5A880] hover:bg-[#9E7E47] hover:text-white transition-all cursor-pointer shadow-md"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-[#9E7E47]" />
                    <span>{t.nav.digitalKey}</span>
                  </button>

                  <span className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium bg-white/80 border border-[#9E7E47]/25 text-[#1C1C1C] shadow-xs">
                    <Sun className="w-3.5 h-3.5 text-[#9E7E47]" />
                    <span>26°C · Posto 5</span>
                  </span>

                  <span className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium bg-white/80 border border-[#9E7E47]/25 text-[#4E463A] shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#9E7E47]" />
                    <span>Butler 24/7</span>
                  </span>
                </div>

                {/* Authentic Keycard Manufacturing Imprint (Inside Stitch Bounds) */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-3.5 right-5 sm:bottom-4 sm:right-7 text-[10px] font-mono tracking-[0.24em] font-bold text-[#7F7668]/55 uppercase select-none pointer-events-none"
                >
                  PLI
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-3.5 left-5 sm:bottom-4 sm:left-7 text-[9px] font-mono tracking-[0.16em] text-[#7F7668]/50 uppercase select-none pointer-events-none"
                >
                  SUITE 802 · RFID
                </span>
              </div>
            </div>

            {/* ============================================================== */}
            {/* BACK FACE: Stay Information Folio + Griffin & JW Signature    */}
            {/* ============================================================== */}
            <div
              className={`keycard-face keycard-face-back relative z-10 leather-creamy-white stitched-dark paper-sheet-bottom-shadow keycard-container-base overflow-hidden shadow-[0_24px_55px_-12px_rgba(24,20,16,0.18)] aspect-[54/85.6] md:aspect-[85.6/54] flex flex-col justify-between ${
                isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {/* Ambient Radial Top Glow */}
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />

              {/* MOBILE VIEW (< md): Vertical Standing Stay Folio */}
              <div className="md:hidden flex flex-col items-center justify-between text-center h-full p-5 gap-3 relative z-10 w-full flex-1">
                {/* Top Header & Confirmation */}
                <div className="flex flex-col items-center gap-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.20em] bg-[#1C1C1C] text-[#C5A880]">
                    <Crown className="w-3 h-3 text-[#9E7E47]" />
                    <span>TITANIUM ELITE FOLIO</span>
                  </div>
                  <p className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#9E7E47] uppercase">
                    #JWM-802-RIO-2026
                  </p>
                </div>

                {/* Stay Details Summary Cards (Within Safe Margins) */}
                <div className="w-full flex flex-col gap-2 text-left">
                  <div className="p-2.5 bg-white/75 rounded-2xl border border-[#9E7E47]/25 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9E7E47]">
                      <Calendar className="w-3 h-3" />
                      <span>{language === 'pt' ? 'Período da Estadia' : 'Stay Schedule'}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#1C1C1C] pt-0.5">
                      16 – 21 Nov 2026 · 5 {language === 'pt' ? 'Noites' : 'Nights'}
                    </p>
                    <p className="text-[10px] text-[#4E463A]">
                      {language === 'pt'
                        ? 'Check-Out às 16:00 (Late Checkout Garantido)'
                        : 'Check-Out at 16:00 (Guaranteed Late Checkout)'}
                    </p>
                  </div>

                  <div className="p-2.5 bg-white/75 rounded-2xl border border-[#9E7E47]/25 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9E7E47]">
                      <MapPin className="w-3 h-3" />
                      <span>{language === 'pt' ? 'Acomodação Presidencial' : 'Presidential Suite'}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#1C1C1C] pt-0.5">
                      {language === 'pt'
                        ? 'Suíte 802 — Frente Mar com Varanda'
                        : 'Suite 802 — Oceanfront Balcony'}
                    </p>
                    <p className="text-[10px] text-[#4E463A]">
                      Av. Atlântica 2600 · Posto 5 Copacabana
                    </p>
                  </div>

                  <div className="p-2.5 bg-white/75 rounded-2xl border border-[#9E7E47]/25 text-[10px] text-[#4E463A] space-y-1 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-medium text-[#1C1C1C]">
                      <CheckCircle2 className="w-3 h-3 text-[#9E7E47] shrink-0" />
                      <span>
                        {language === 'pt'
                          ? 'Café no The Carioca por Chef Amaral'
                          : 'Artisan Breakfast at The Carioca'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-[#1C1C1C]">
                      <CheckCircle2 className="w-3 h-3 text-[#9E7E47] shrink-0" />
                      <span>
                        {language === 'pt'
                          ? 'Lounge Executivo 16º andar & Terraço'
                          : '16th Fl. Executive Lounge & Sunset Terrace'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium text-[#1C1C1C]">
                      <CheckCircle2 className="w-3 h-3 text-[#9E7E47] shrink-0" />
                      <span>
                        {language === 'pt'
                          ? 'Mordomo Exclusivo 24/7 (Ramal 99)'
                          : '24/7 Dedicated Butler (Ext. 99)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Griffin Logo with JW Signature Below */}
                <div className="flex flex-col items-center text-center gap-0.5">
                  <img
                    src="/assets/jw-marriott-logo.png"
                    alt="JW Marriott Official Griffin Emblem"
                    className="h-7 w-auto object-contain"
                  />
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#221F1C]">
                    JW MARRIOTT
                  </p>
                  <JWSignature className="h-6 w-auto text-[#1C1C1C]" />
                  <p className="text-[10px] font-serif-luxury italic text-[#4E463A]">
                    J. Willard Marriott
                  </p>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.20em] text-[#9E7E47]">
                    {language === 'pt'
                      ? 'Compromisso com o Luxo Sereno'
                      : "Founder's Promise of Quiet Luxury"}
                  </p>
                </div>

                {/* Flip Back Button (Within Safe Margins, Elevated Above Corner Watermark) */}
                <div className="w-full pb-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[#1C1C1C] text-[#C5A880] hover:bg-[#9E7E47] hover:text-white transition-all shadow-md cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#9E7E47]" />
                    <span>
                      {language === 'pt' ? 'Voltar para Chave da Suíte' : 'Return to Suite Keycard'}
                    </span>
                  </button>
                </div>

                {/* Homage Imprint (Inside Stitch Bounds) */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-2.5 right-4 sm:bottom-3 sm:right-5 text-[9px] font-mono tracking-[0.24em] font-bold text-[#7F7668]/55 uppercase select-none pointer-events-none"
                >
                  PLI
                </span>
              </div>

              {/* DESKTOP VIEW (md+): Expansive Wide Stay Folio Plaque */}
              <div className="hidden md:grid md:grid-cols-12 md:gap-6 md:items-center h-full p-6 relative z-10 w-full flex-1">
                {/* Left Column (4 cols): Griffin Emblem, Official Signature & Repositioned Action Button */}
                <div className="col-span-4 flex flex-col items-center text-center gap-2 pr-6 border-r border-[#9E7E47]/25">
                  <img
                    src="/assets/jw-marriott-logo.png"
                    alt="JW Marriott Official Griffin Emblem"
                    className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold uppercase tracking-[0.32em] text-[#221F1C]">
                      JW MARRIOTT
                    </p>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#9E7E47]">
                      COPACABANA · RIO DE JANEIRO
                    </p>
                  </div>

                  <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#9E7E47]/45 to-transparent mx-auto my-0.5" />

                  {/* The JW Signature Below the Griffin Logo */}
                  <div className="space-y-0.5">
                    <JWSignature className="h-8 w-auto text-[#1C1C1C] mx-auto" />
                    <p className="text-xs font-serif-luxury italic text-[#221F1C]">
                      J. Willard Marriott
                    </p>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9E7E47]">
                      {language === 'pt'
                        ? 'Fundador · JW Marriott Hotels'
                        : 'Founder · JW Marriott Hotels'}
                    </p>
                  </div>

                  <p className="text-[10px] text-[#4E463A] italic leading-tight max-w-[220px]">
                    {language === 'pt'
                      ? '“O luxo sereno e o cuidado genuíno em cada detalhe de sua estadia em Copacabana.”'
                      : '“Quiet luxury, intuitive personal service, and genuine care at Copacabana’s Posto 5.”'}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-[0.20em] bg-[#1C1C1C] text-[#C5A880] shadow-xs">
                    <Crown className="w-3 h-3 text-[#9E7E47]" />
                    <span>TITANIUM ELITE FOLIO</span>
                  </div>

                  {/* Repositioned Dark Action Button (Centered in Left Heritage Column, Never Cut Off) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(false);
                    }}
                    className="w-full max-w-[220px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[#1C1C1C] text-[#C5A880] hover:bg-[#9E7E47] hover:text-white transition-all shadow-md cursor-pointer mt-1"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#9E7E47]" />
                    <span>
                      {language === 'pt'
                        ? 'Voltar para Chave da Suíte'
                        : 'Return to Suite Keycard'}
                    </span>
                  </button>
                </div>

                {/* Right Column (8 cols): Stay Details Grid */}
                <div className="col-span-8 flex flex-col gap-3">
                  {/* Top Row: Title & Confirmation */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#9E7E47]/20 pb-2">
                    <div>
                      <h2 className="text-base font-serif-luxury font-bold text-[#1C1C1C]">
                        {language === 'pt'
                          ? 'Registro Oficial de Hospedagem'
                          : 'Official Stay Folio & Reservation Record'}
                      </h2>
                      <p className="text-[11px] font-mono tracking-wider text-[#9E7E47] font-semibold">
                        CONFIRMATION #JWM-802-RIO-2026 · GUEST: JOHN DOE
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{language === 'pt' ? 'Estadia Ativa' : 'Active In-Suite Stay'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 4-Item Grid of Stay Information */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* 1. Dates */}
                    <div className="p-3 bg-white/75 rounded-2xl border border-[#9E7E47]/25 shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E7E47]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{language === 'pt' ? 'Datas da Estadia' : 'Stay Dates'}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1C1C1C]">
                        16 Nov – 21 Nov 2026 (5 {language === 'pt' ? 'Noites' : 'Nights'})
                      </p>
                      <p className="text-[11px] text-[#4E463A]">
                        {language === 'pt'
                          ? 'Check-Out às 16:00 (Benefício Titanium)'
                          : 'Guaranteed 16:00 Late Checkout (Titanium)'}
                      </p>
                    </div>

                    {/* 2. Suite */}
                    <div className="p-3 bg-white/75 rounded-2xl border border-[#9E7E47]/25 shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E7E47]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{language === 'pt' ? 'Acomodação' : 'Suite Assignment'}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1C1C1C]">
                        {language === 'pt'
                          ? 'Suíte 802 — Ala Presidencial'
                          : 'Suite 802 — Oceanfront Presidential Wing'}
                      </p>
                      <p className="text-[11px] text-[#4E463A]">
                        {language === 'pt'
                          ? '8º Andar · Cama King · Varanda Posto 5'
                          : '8th Floor · King Master · Posto 5 Balcony'}
                      </p>
                    </div>

                    {/* 3. Inclusions */}
                    <div className="p-3 bg-white/75 rounded-2xl border border-[#9E7E47]/25 shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E7E47]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{language === 'pt' ? 'Privilégios Inclusos' : 'Elite Inclusions'}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1C1C1C]">
                        {language === 'pt'
                          ? 'Café da Manhã no The Carioca'
                          : 'Artisan Breakfast at The Carioca'}
                      </p>
                      <p className="text-[11px] text-[#4E463A]">
                        {language === 'pt'
                          ? 'Lounge 16º Andar · Wi-Fi Fibra'
                          : '16th Fl. Executive Lounge · Fiber Wi-Fi'}
                      </p>
                    </div>

                    {/* 4. Service */}
                    <div className="p-3 bg-white/75 rounded-2xl border border-[#9E7E47]/25 shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E7E47]">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{language === 'pt' ? 'Concierge & Mordomia' : 'Butler & Concierge'}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#1C1C1C]">
                        {language === 'pt'
                          ? 'Ramal 99 (Mordomo Dedicado 24/7)'
                          : 'Ext. 99 (Dedicated Butler 24/7)'}
                      </p>
                      <p className="text-[11px] text-[#4E463A]">
                        Recepção: +55 (21) 2545-6500
                      </p>
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#9E7E47]/15">
                    <span className="text-[11px] text-[#4E463A]">
                      Avenida Atlântica, 2600 — Copacabana, Rio de Janeiro
                    </span>
                    <span className="text-[10px] text-[#9E7E47] font-medium tracking-wide pr-14">
                      {language === 'pt' ? 'Serviço de Mordomia 24/7' : '24/7 Butler Service'}
                    </span>
                  </div>

                  {/* Authentic Keycard Manufacturing Imprint (Inside Stitch Bounds) */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3.5 right-5 sm:bottom-4 sm:right-7 text-[10px] font-mono tracking-[0.24em] font-bold text-[#7F7668]/55 uppercase select-none pointer-events-none"
                  >
                    PLI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Asymmetrical Modernist Hero Canvas */}
        <div className="relative rounded-[36px] overflow-hidden border border-[#9E7E47]/35 shadow-[0_24px_60px_-12px_rgba(28,28,28,0.18)] min-h-[520px] sm:min-h-[600px] flex items-end">
          <img
            src="/assets/hero-penthouse-sunrise.png"
            alt="Warm morning sunrise light filtering through luxury Rio de Janeiro oceanfront penthouse suite"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/88 via-[#141414]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent" />

          {/* Content Grid inside Hero */}
          <div className="relative z-10 w-full p-6 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 text-[#FAF8F5] space-y-5">
              <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.22em] bg-[#9E7E47]/90 backdrop-blur-md text-white">
                {t.welcome.heroBadge}
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-6xl font-semibold leading-[1.08] text-white tracking-tight">
                {t.welcome.heroTitle}
              </h2>
              <p className="text-sm sm:text-base text-[#FAF8F5]/90 leading-relaxed max-w-xl">
                {t.welcome.heroDesc}
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => setActiveModal('dining')}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#9E7E47] text-white hover:bg-white hover:text-[#1C1C1C] transition-all shadow-lg cursor-pointer"
                >
                  <Utensils className="w-4 h-4" />
                  <span>{t.welcome.diningCta}</span>
                </button>
                <button
                  onClick={() => setActiveModule('explore', true)}
                  className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-white/15 backdrop-blur-md border border-white/35 text-white hover:bg-white hover:text-[#1C1C1C] transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#C5A880]" />
                  <span>{t.welcome.exploreCta}</span>
                </button>
                <button
                  onClick={() => selectTrack(SOUNDSCAPE_COLLECTIONS[0])}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#141414]/75 backdrop-blur-md border border-[#9E7E47]/50 text-[#C5A880] hover:bg-[#9E7E47] hover:text-white transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{language === 'en' ? 'Play Morning Bossa' : 'Ouvir Bossa Matinal'}</span>
                </button>
              </div>
            </div>

            {/* Floating Offset Pill-Crop Secondary Vignette (Brazilian Modernism Curve) */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="w-72 rounded-[32px] p-4 glass-dark border border-[#9E7E47]/40 text-[#FAF8F5] space-y-3 shadow-2xl">
                <div className="h-36 rounded-2xl overflow-hidden border border-[#9E7E47]/30">
                  <img
                    src="/assets/copacabana-beach-aerial.png"
                    alt="Copacabana view from Suite 802 balcony"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C5A880]">
                  <span>SUITE 802 BALCONY VIEW</span>
                  <span>POSTO 5</span>
                </div>
                <p className="font-serif-luxury text-sm italic text-white/90">
                  “Sunlight filtering through sheer seaside drapes over Avenida Atlântica.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Amenity Quick-Bar (Liquid Glass + Saddle Stitching) */}
        <div className="relative z-20 mt-8 sm:mt-12 mx-2 sm:mx-8 p-6 sm:p-8 rounded-[32px] liquid-glass stitched-ivory shadow-[0_18px_48px_-10px_rgba(28,28,28,0.10)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9E7E47]">
                {t.welcome.quickBarSubtitle}
              </p>
              <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1C1C]">
                {t.welcome.quickBarTitle}
              </h2>
            </div>
            <button
              onClick={() => setActiveModal('amenities')}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9E7E47] hover:text-[#1C1C1C] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'en' ? 'Open Bespoke Pillow & Linen Modal' : 'Abrir Modal de Enxoval'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                key: 'turndown' as const,
                icon: Sparkles,
                badge: 'Pillow & Linen Modal',
                data: t.welcome.quickActions.turndown,
              },
              {
                key: 'towels' as const,
                icon: Waves,
                badge: '1-Tap Suite Dispatch',
                data: t.welcome.quickActions.towels,
              },
              {
                key: 'sommelier' as const,
                icon: Wine,
                badge: 'Sommelier Modal',
                data: t.welcome.quickActions.sommelier,
              },
              {
                key: 'valet' as const,
                icon: Car,
                badge: 'Chauffeur Modal',
                data: t.welcome.quickActions.valet,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleQuickAmenity(item.key)}
                  className="papersheet-card rounded-[24px] p-5 text-left group cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#F8F3EA] border border-[#9E7E47]/25 flex items-center justify-center text-[#9E7E47] group-hover:bg-[#1C1C1C] group-hover:text-[#C5A880] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9E7E47]">
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-semibold text-[#1C1C1C] group-hover:text-[#9E7E47] transition-colors">
                      {item.data.title}
                    </h3>
                    <p className="text-xs text-[#4E463A] mt-1">{item.data.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: Asymmetrical Roberto Burle Marx Heritage Collage */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Asymmetrical Overlapping Modernist Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="organic-arch-left overflow-hidden h-[380px] sm:h-[440px] border border-[#9E7E47]/30 shadow-xl">
              <img
                src="/assets/burle-marx-promenade.png"
                alt="Roberto Burle Marx iconic black and white wave promenade in Copacabana"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Offset Floating Pill Image */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-64 rounded-full overflow-hidden border-4 border-[#FAF8F5] shadow-2xl">
              <img
                src="/assets/spanish-guitar-terrace.png"
                alt="Acoustic classical guitar overlooking Copacabana"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#EAE5DC] text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9E7E47]">
              {t.welcome.burleMarxTag}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium text-[#1C1C1C] leading-[1.15]">
              {t.welcome.burleMarxTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed">
              {t.welcome.burleMarxBody}
            </p>
            <blockquote className="p-6 rounded-3xl bg-[#F8F3EA] border-l-4 border-[#9E7E47] font-serif-luxury italic text-lg text-[#1C1C1C]">
              {t.welcome.burleMarxQuote}
            </blockquote>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveModule('explore', true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-all cursor-pointer"
              >
                <span>
                  {language === 'en' ? 'Explore Coastal Landmarks' : 'Explorar Marcos Costeiros'}
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveModule('rhythm', true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] border border-[#9E7E47] text-[#1C1C1C] hover:bg-[#EAE5DC] transition-all cursor-pointer"
              >
                <Music className="w-4 h-4 text-[#9E7E47]" />
                <span>{language === 'en' ? 'Enter Carioca Rhythm Lounge' : 'Entrar no Carioca Rhythm'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Dramatic Full-Bleed Dark Section — Signature Gastronomy & Nightlife */}
      <section className="relative py-20 sm:py-28 bg-night-sanctuary text-[#FAF8F5] overflow-hidden border-y border-[#9E7E47]/30">
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <img
            src="/assets/baretto-londra-lounge.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover blur-2xl"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C5A880]">
                {t.welcome.culinaryTag}
              </p>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium text-white mt-2">
                {t.welcome.culinaryTitle}
              </h2>
            </div>
            <button
              onClick={() => setActiveModal('dining')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#9E7E47] text-white hover:bg-[#C5A880] hover:text-[#141414] transition-all self-start md:self-auto cursor-pointer"
            >
              <Wine className="w-4 h-4" />
              <span>
                {language === 'en' ? 'Consult Master Sommelier' : 'Consultar Master Sommelier'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* The Carioca by Chef Amaral (7 Cols) — Stitched Dark Leather & Liquid Glass */}
            <article className="lg:col-span-7 rounded-[32px] leather-dark stitched-brass border border-[#9E7E47]/45 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="relative h-72 sm:h-80 organic-arch-right overflow-hidden border border-[#9E7E47]/30">
                  <img
                    src="/assets/ristorante-cipriani.png"
                    alt="The Carioca Restaurant by Chef Amaral — Contemporary Coastal Fine Dining"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] bg-[#141414]/90 text-[#C5A880] border border-[#9E7E47]/40 backdrop-blur-md">
                    {t.welcome.ciprianiBadge}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl font-medium text-white">
                    {t.welcome.ciprianiTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-[#FAF8F5]/80 leading-relaxed">
                    {t.welcome.ciprianiDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#C5A880] font-medium">
                  {language === 'en'
                    ? "Chef Amaral's Tasting Menu · Fresh Atlantic Catch · 19:00–23:30"
                    : 'Menu Degustação do Chef Amaral · Pescados Nobres do Dia · 19:00–23:30'}
                </span>
                <button
                  onClick={() => setActiveModal('dining')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#9E7E47] text-white hover:bg-white hover:text-[#141414] transition-all cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{t.welcome.ciprianiAction}</span>
                </button>
              </div>
            </article>

            {/* Baretto-Londra Feature (5 Cols) — Stitched Cognac Leather */}
            <article className="lg:col-span-5 rounded-[32px] leather-cognac stitched-brass border border-[#9E7E47]/45 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="relative h-72 sm:h-80 organic-arch-left overflow-hidden border border-[#9E7E47]/30">
                  <img
                    src="/assets/baretto-londra-lounge.png"
                    alt="Baretto-Londra Jazz Lounge and Cocktail Sanctuary"
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.18em] bg-[#141414]/90 text-[#C5A880] border border-[#9E7E47]/40 backdrop-blur-md">
                    {t.welcome.barettoBadge}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white">
                    {t.welcome.barettoTitle}
                  </h3>
                  <p className="text-sm text-[#FAF8F5]/80 leading-relaxed">
                    {t.welcome.barettoDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => selectTrack(SOUNDSCAPE_COLLECTIONS[3])}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A880] hover:text-white transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{language === 'en' ? 'Play Lounge Vinyl' : 'Ouvir Vinil do Lounge'}</span>
                </button>
                <button
                  onClick={() => setActiveModal('dining')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-white/10 text-white border border-[#9E7E47]/50 hover:bg-[#9E7E47] transition-all cursor-pointer"
                >
                  <Wine className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{t.welcome.barettoAction}</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 4: Prototype Penthouse Suites, Spa by JW & Bespoke In-Suite Experiences */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 max-w-[1280px] mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9E7E47]">
              BESPOKE SANCTUARY SERVICE · SUITE 802
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium text-[#1C1C1C] mt-1">
              {language === 'en'
                ? 'Penthouse Privileges, Spa by JW & Private Balconies'
                : 'Privilégios da Cobertura, Spa by JW & Varandas Privadas'}
            </h2>
          </div>

          {/* Filter Pills per DESIGN.md */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'penthouse', labelEn: 'Presidential Wing', labelPt: 'Ala Presidencial' },
              { id: 'spa', labelEn: 'Spa by JW Rituals', labelPt: 'Rituais Spa by JW' },
              { id: 'dining', labelEn: 'In-Suite Cellar', labelPt: 'Adega na Suíte' },
            ].map((tab) => {
              const active = activeSuiteTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSuiteTab(tab.id as 'penthouse' | 'spa' | 'dining')}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-sm'
                      : 'bg-[#EAE5DC] text-[#1C1C1C] hover:bg-[#D1C5B5]'
                  }`}
                >
                  {language === 'en' ? tab.labelEn : tab.labelPt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="papersheet-card rounded-[32px] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 h-64 sm:h-80 rounded-[24px] overflow-hidden border border-[#9E7E47]/25">
            <img
              src={
                activeSuiteTab === 'penthouse'
                  ? '/assets/copacabana-beach-aerial.png'
                  : activeSuiteTab === 'spa'
                  ? '/assets/spanish-guitar-terrace.png'
                  : '/assets/ristorante-cipriani.png'
              }
              alt="JW Marriott Copacabana Suite Experience"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8F3EA] border border-[#9E7E47]/30 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E7E47]">
              <Crown className="w-3.5 h-3.5" />
              <span>MARRIOTT BONVOY® TITANIUM ELITE PRIVILEGE</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl font-medium text-[#1C1C1C]">
              {activeSuiteTab === 'penthouse' &&
                (language === 'en'
                  ? 'Oceanfront Presidential Terrace & Butler Sanctuary'
                  : 'Terraço Presidencial Frente Mar & Mordomia Dedicada')}
              {activeSuiteTab === 'spa' &&
                (language === 'en'
                  ? 'Spa by JW — Amazonian Botanical & Warm Atlantic Stone Therapy'
                  : 'Spa by JW — Terapia Botânica Amazônica & Pedras Quentes')}
              {activeSuiteTab === 'dining' &&
                (language === 'en'
                  ? 'Private Sunset Candlelight Dinner on Suite 802 Balcony'
                  : 'Jantar Privativo à Luz de Velas na Varanda da Suíte 802')}
            </h3>
            <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed">
              {activeSuiteTab === 'penthouse' &&
                (language === 'en'
                  ? 'Enjoy panoramic views from Posto 1 to Forte de Copacabana, private rooftop infinity pool cabanas, and complimentary garment pressing.'
                  : 'Desfrute de vistas panorâmicas do Posto 1 ao Forte de Copacabana, cabanas privativas na piscina de borda infinita na cobertura e passadoria cortesia.')}
              {activeSuiteTab === 'spa' &&
                (language === 'en'
                  ? 'In-suite or thermal sanctuary treatments crafted with organic Brazilian cupuaçu butter, açaí antioxidants, and acoustic sound healing.'
                  : 'Tratamentos na suíte ou no santuário termal elaborados com manteiga de cupuaçu orgânica, antioxidantes de açaí e harmonização acústica.')}
              {activeSuiteTab === 'dining' &&
                (language === 'en'
                  ? 'Course-by-course Northern Italian tasting menu served privately on your oceanfront terrace with live nylon-string Bossa Nova accompaniment.'
                  : 'Menu degustação italiano servido privativamente em seu terraço de frente para o mar com acompanhamento de violão Bossa Nova ao vivo.')}
            </p>
            <div className="pt-2 flex flex-wrap gap-3.5">
              <button
                onClick={() =>
                  setActiveModal(activeSuiteTab === 'dining' ? 'dining' : 'amenities')
                }
                className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#9E7E47] text-white hover:bg-[#1C1C1C] transition-all cursor-pointer shadow-sm"
              >
                {language === 'en'
                  ? 'Upgrade to Oceanfront Presidential / Book Ritual'
                  : 'Solicitar Upgrade Presidencial / Agendar Ritual'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
