import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Music,
  MapPin,
  ShieldCheck,
  LayoutDashboard,
  Bell,
  Globe,
  Search,
  X,
  ChevronDown,
  Utensils,
  Car,
  LayoutGrid,
} from 'lucide-react';
import { useConcierge } from '../../context/ConciergeContext';
import { ModuleId } from '../../i18n/translations';

const PRIMARY_NAV_MODULES: {
  id: ModuleId;
  icon: React.FC<{ className?: string }>;
  shortEn: string;
  shortPt: string;
}[] = [
  { id: 'experience', icon: Sparkles, shortEn: 'Suite', shortPt: 'Suíte' },
  { id: 'rhythm', icon: Music, shortEn: 'Rhythm', shortPt: 'Música' },
  { id: 'explore', icon: MapPin, shortEn: 'Explore', shortPt: 'Explorar' },
];

const SECONDARY_DROPDOWN_MODULES: {
  id: ModuleId;
  icon: React.FC<{ className?: string }>;
  descEn: string;
  descPt: string;
}[] = [
  {
    id: 'safety',
    icon: ShieldCheck,
    descEn: 'BPTur Hotlines, 190/192 & Posto 5 Protocol',
    descPt: 'Emergências BPTur, 190/192 & Posto 5',
  },
  {
    id: 'management',
    icon: LayoutDashboard,
    descEn: 'Unified Administration: Live Occupancy, Dispatch & Keycards',
    descPt: 'Administração Unificada: Ocupação, Despacho & Chaves',
  },
];

export const TopNavBar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    activeModule,
    setActiveModule,
    setActiveModal,
    broadcastMessage,
    dismissBroadcast,
    requests,
    adminActiveTab,
    setAdminActiveTab,
  } = useConcierge();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Sliding active indicator state for Primary Nav Track
  const navTrackRef = useRef<HTMLElement | null>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const isInitialNavMount = useRef(true);
  const [sliderStyle, setSliderStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
  }>({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  // Carioca Rhythm uses the dark nocturnal luxury theme
  const isDarkTheme = activeModule === 'rhythm';
  const pendingCount = requests.filter((r) => r.status !== 'completed').length;
  const isSecondaryActive = SECONDARY_DROPDOWN_MODULES.some((m) => m.id === activeModule);

  // Active key inside the primary segmented pill track
  const activeNavKey = isSecondaryActive || dropdownOpen ? 'more' : activeModule;

  // Update sliding indicator for Primary Nav Track
  useEffect(() => {
    const updateNavSlider = () => {
      const track = navTrackRef.current;
      const targetBtn = buttonRefs.current.get(activeNavKey);
      if (!track || !targetBtn) {
        setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const left = targetBtn.offsetLeft;
      const top = targetBtn.offsetTop;
      const width = targetBtn.offsetWidth;
      const height = targetBtn.offsetHeight;

      if (width > 0 && height > 0) {
        setSliderStyle({ left, top, width, height, opacity: 1 });
        if (isInitialNavMount.current) {
          requestAnimationFrame(() => {
            isInitialNavMount.current = false;
          });
        }
      }
    };

    updateNavSlider();
    const frameId = requestAnimationFrame(updateNavSlider);
    window.addEventListener('resize', updateNavSlider);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navTrackRef.current) {
      ro = new ResizeObserver(updateNavSlider);
      ro.observe(navTrackRef.current);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', updateNavSlider);
      if (ro) ro.disconnect();
    };
  }, [activeNavKey, language, activeModule, dropdownOpen]);


  // Sticky Scroll compaction effect for the floating Mica capsule bar (Smooth RAF + Hysteresis)
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrolled = false;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        // Hysteresis: enter floating mode at 28px, leave at 10px to eliminate boundary jitter
        const next = lastScrolled ? y > 10 : y > 28;
        if (next !== lastScrolled) {
          lastScrolled = next;
          setIsScrolled(next);
        }
        rafId = null;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close dropdown card on Escape or outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
    };
  }, [dropdownOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (!q) return;
    if (
      q.includes('carioca') ||
      q.includes('amaral') ||
      q.includes('the carioca') ||
      q.includes('dining') ||
      q.includes('chef') ||
      q.includes('wine') ||
      q.includes('baretto') ||
      q.includes('cipriani')
    ) {
      setActiveModal('dining');
    } else if (q.includes('valet') || q.includes('mercedes') || q.includes('car') || q.includes('chauffeur')) {
      setActiveModal('valet');
    } else if (q.includes('towel') || q.includes('pillow') || q.includes('linen') || q.includes('amenity')) {
      setActiveModal('amenities');
    } else if (q.includes('bossa') || q.includes('music') || q.includes('vinyl') || q.includes('rhythm')) {
      setActiveModule('rhythm', true);
    } else if (q.includes('map') || q.includes('cristo') || q.includes('arpoador') || q.includes('forte')) {
      setActiveModule('explore', true);
    } else if (q.includes('police') || q.includes('safety') || q.includes('190') || q.includes('bptur')) {
      setActiveModule('safety', true);
    } else if (q.includes('key') || q.includes('qr') || q.includes('wallet') || q.includes('802')) {
      setAdminActiveTab('keys');
      setActiveModule('management', true);
    } else if (q.includes('admin') || q.includes('ops') || q.includes('dispatch') || q.includes('occupancy')) {
      setAdminActiveTab('all');
      setActiveModule('management', true);
    } else {
      setActiveModal('amenities');
    }
    setSearchQuery('');
    setDropdownOpen(false);
  };

  return (
    <header
      ref={navContainerRef}
      className={`sticky top-0 z-50 w-full transition-[padding] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? 'pt-2 sm:pt-3 px-3 sm:px-6' : 'pt-0 px-0'
      }`}
    >
      <div
        className={`mx-auto transform-gpu transition-[max-width,border-radius,padding,background-color,border-color,box-shadow] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'max-w-[1280px] rounded-[28px] sm:rounded-[32px] py-2 px-4 sm:px-6 shadow-[0_16px_40px_-10px_rgba(28,28,28,0.18)]'
            : 'w-full rounded-none border-b border-[#9E7E47]/20 py-2.5 sm:py-3 px-4 sm:px-8 shadow-xs'
        } ${
          isDarkTheme
            ? isScrolled
              ? 'mica-frosted-dark text-[#FAF8F5]'
              : 'bg-[#141414]/95 backdrop-blur-md text-[#FAF8F5]'
            : isScrolled
            ? 'mica-frosted-light text-[#1C1C1C]'
            : 'bg-[#FAF8F5]/95 backdrop-blur-md text-[#1C1C1C]'
        }`}
      >
        <div className="max-w-[1280px] mx-auto relative">
          <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-1.5 sm:gap-3 xl:gap-4 w-full">
            {/* Left: Official JW Marriott Emblem + Compact Subtitle */}
            <button
              onClick={() => {
                setActiveModule('experience');
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 xl:gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
            >
              <img
                src="/assets/jw-marriott-logo.png"
                alt="JW Marriott Official Heraldic Griffin Emblem"
                className={`h-7 sm:h-8 xl:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  isDarkTheme ? 'brightness-0 invert opacity-95' : ''
                }`}
              />
              <div className="hidden xl:flex flex-col border-l border-[#9E7E47]/30 pl-3 whitespace-nowrap">
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9E7E47] leading-tight">
                  COPACABANA
                </span>
                <span
                  className={`text-[11px] font-serif-luxury italic leading-tight ${
                    isDarkTheme ? 'text-[#FAF8F5]/80' : 'text-[#4E463A]'
                  }`}
                >
                  Suite 802
                </span>
              </div>
            </button>

            {/* Center: Compact 3-Item MD3E Pill Track (Perfect Centering + Zero Overflow + Sliding Active Indicator) */}
            <nav
              ref={navTrackRef}
              aria-label="Primary Concierge Modules"
              className={`hidden lg:flex justify-self-center items-center gap-0.5 xl:gap-1 p-0.5 xl:p-1 rounded-full border relative ${
                isDarkTheme
                  ? 'bg-black/35 border-white/10 shadow-inner'
                  : 'bg-[#EAE5DC]/70 border-[#9E7E47]/20 shadow-inner'
              }`}
            >
              {/* Sliding Active Indicator (MD3E Expressive Spring Motion) */}
              <div
                aria-hidden="true"
                className={`absolute top-0 left-0 rounded-full pointer-events-none z-0 transition-all ${
                  isDarkTheme
                    ? 'bg-[#9E7E47] shadow-[0_4px_16px_rgba(158,126,71,0.48)]'
                    : 'bg-[#1C1C1C] shadow-[0_4px_14px_rgba(28,28,28,0.22)]'
                }`}
                style={{
                  transform: `translate3d(${sliderStyle.left}px, ${sliderStyle.top}px, 0)`,
                  width: `${sliderStyle.width}px`,
                  height: `${sliderStyle.height}px`,
                  opacity: sliderStyle.opacity,
                  transitionDuration: isInitialNavMount.current ? '0ms' : '360ms',
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />

              {PRIMARY_NAV_MODULES.map(({ id, icon: Icon }) => {
                const isActive = activeModule === id && !dropdownOpen;
                return (
                  <button
                    key={id}
                    ref={(el) => {
                      if (el) buttonRefs.current.set(id, el);
                      else buttonRefs.current.delete(id);
                    }}
                    onClick={() => {
                      setActiveModule(id);
                      setDropdownOpen(false);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative z-10 inline-flex items-center justify-center gap-1 xl:gap-1.5 px-2.5 xl:px-4 py-1.5 xl:py-2 text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.08em] xl:tracking-[0.12em] whitespace-nowrap leading-none cursor-pointer rounded-full transition-colors duration-200 bg-transparent select-none ${
                      isActive
                        ? isDarkTheme
                          ? 'text-white'
                          : 'text-[#FAF8F5]'
                        : isDarkTheme
                        ? 'text-[#FAF8F5]/75 hover:text-white hover:bg-white/10'
                        : 'text-[#4E463A] hover:text-[#1C1C1C] hover:bg-white/60'
                    }`}
                  >
                    <Icon
                      className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-colors duration-200 ${
                        isActive ? (isDarkTheme ? 'text-white' : 'text-[#C5A880]') : 'text-[#9E7E47]'
                      }`}
                    />
                    <span>{t.nav.modules[id]}</span>
                  </button>
                );
              })}

              {/* Lateral Button Inside Pill Track to Open Dropdown Card with Remaining Options */}
              <button
                ref={(el) => {
                  if (el) buttonRefs.current.set('more', el);
                  else buttonRefs.current.delete('more');
                }}
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-label="More Concierge Modules"
                className={`relative z-10 inline-flex items-center justify-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 xl:py-2 text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.08em] xl:tracking-[0.12em] whitespace-nowrap leading-none cursor-pointer rounded-full transition-colors duration-200 bg-transparent select-none ${
                  dropdownOpen || isSecondaryActive
                    ? isDarkTheme
                      ? 'text-white'
                      : 'text-[#FAF8F5]'
                    : isDarkTheme
                    ? 'text-[#C5A880] hover:text-white hover:bg-white/10'
                    : 'text-[#9E7E47] hover:text-[#1C1C1C] hover:bg-white/60'
                }`}
              >
                <LayoutGrid className="w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0" />
                <span className="hidden xl:inline">
                  {language === 'en' ? 'Suite & More' : 'Suíte & Mais'}
                </span>
                <span className="inline xl:hidden">
                  {language === 'en' ? 'More' : 'Mais'}
                </span>
                <ChevronDown
                  className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-300 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </nav>

            {/* Right: Language Pill, Concierge Action & Lateral Dropdown Card Trigger */}
            <div className="justify-self-end flex items-center gap-1.5 sm:gap-2">
              {/* Bilingual Switcher (EN-US / PT-BR) with Centered Sliding Active Pill */}
              <div className="flex items-center gap-1.5">
                <Globe
                  className="w-3.5 h-3.5 text-[#9E7E47] hidden xl:inline shrink-0"
                  aria-hidden="true"
                />
                <div
                  role="group"
                  aria-label="Language switcher"
                  className={`language-toggle-track border ${
                    isDarkTheme
                      ? 'bg-black/50 border-[#9E7E47]/35 shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
                      : 'bg-[#EAE5DC]/90 border-[#9E7E47]/25 shadow-xs'
                  }`}
                >
                  {/* Sliding active indicator with exact geometric symmetry */}
                  <div
                    aria-hidden="true"
                    className="language-toggle-pill shadow-xs"
                    style={{
                      transform: language === 'en' ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    aria-pressed={language === 'en'}
                    className={`language-toggle-btn ${
                      language === 'en'
                        ? 'text-white'
                        : isDarkTheme
                        ? 'text-[#FAF8F5]/70 hover:text-white'
                        : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                    }`}
                  >
                    <span className="inline-block tracking-[0.06em] pl-[0.06em]">EN</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('pt')}
                    aria-pressed={language === 'pt'}
                    className={`language-toggle-btn ${
                      language === 'pt'
                        ? 'text-white'
                        : isDarkTheme
                        ? 'text-[#FAF8F5]/70 hover:text-white'
                        : 'text-[#1C1C1C]/70 hover:text-[#1C1C1C]'
                    }`}
                  >
                    <span className="inline-block tracking-[0.06em] pl-[0.06em]">PT</span>
                  </button>
                </div>
              </div>

              {/* Primary MD3E Morphing CTA: "Concierge" */}
              <button
                onClick={() => setActiveModal('amenities')}
                className={`md3e-btn inline-flex items-center gap-1.5 px-3 xl:px-4 py-1.5 xl:py-2 text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.10em] xl:tracking-[0.14em] whitespace-nowrap shadow-xs cursor-pointer ${
                  isDarkTheme
                    ? 'bg-[#9E7E47] text-white hover:bg-[#C5A880] hover:text-[#141414]'
                    : 'bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47]'
                }`}
              >
                <span>{t.nav.conciergeCta}</span>
              </button>

              {/* Lateral Button Opening the Floating Dropdown Card (High-Affordance on Mobile & Desktop) */}
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-label={dropdownOpen ? 'Close Concierge Menu' : 'Open Concierge Navigation Menu'}
                className={`md3e-btn relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 border cursor-pointer whitespace-nowrap shadow-xs transition-all ${
                  dropdownOpen
                    ? 'bg-[#9E7E47] text-white border-[#C5A880] shadow-[0_0_12px_rgba(158,126,71,0.5)]'
                    : isDarkTheme
                    ? 'bg-white/10 border-[#9E7E47]/40 text-[#FAF8F5] hover:border-[#C5A880] hover:bg-white/15'
                    : 'bg-white/90 border-[#9E7E47]/35 text-[#1C1C1C] hover:border-[#9E7E47] hover:bg-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 text-[#9E7E47] lg:hidden shrink-0" />
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9E7E47] text-white text-[9px] sm:text-[10px] font-serif-luxury font-bold flex items-center justify-center shrink-0 shadow-2xs">
                  802
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                  {language === 'en' ? 'Menu' : 'Menu'}
                </span>
                {pendingCount > 0 && (
                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#B84C16] text-white text-[8px] sm:text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {pendingCount}
                  </span>
                )}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    dropdownOpen ? 'rotate-180 text-white' : 'text-[#9E7E47]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Quick-Nav Strip: Immediate intuitive access to all key screens without opening menu */}
          <div className="lg:hidden pt-1.5 mt-1.5 border-t border-[#9E7E47]/20 w-full overflow-hidden">
            <nav
              aria-label="Mobile Quick Navigation"
              className={`flex items-center justify-between gap-1 p-1 rounded-full border transition-all w-full min-w-0 ${
                isDarkTheme
                  ? 'bg-black/45 border-white/10 shadow-inner'
                  : 'bg-[#EAE5DC]/80 border-[#9E7E47]/25 shadow-inner'
              }`}
            >
              {PRIMARY_NAV_MODULES.map(({ id, icon: Icon, shortEn, shortPt }) => {
                const isActive = activeModule === id && !dropdownOpen;
                return (
                  <button
                    key={`mob-nav-${id}`}
                    onClick={() => {
                      setActiveModule(id);
                      setDropdownOpen(false);
                    }}
                    aria-label={t.nav.modules[id]}
                    title={t.nav.modules[id]}
                    className={`flex-1 min-w-0 inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.03em] transition-all cursor-pointer select-none overflow-hidden ${
                      isActive
                        ? isDarkTheme
                          ? 'bg-[#9E7E47] text-white shadow-[0_2px_10px_rgba(158,126,71,0.5)]'
                          : 'bg-[#1C1C1C] text-white shadow-[0_2px_8px_rgba(28,28,28,0.3)]'
                        : isDarkTheme
                        ? 'text-[#FAF8F5]/75 hover:text-white hover:bg-white/5'
                        : 'text-[#4E463A] hover:text-[#1C1C1C] hover:bg-white/50'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                        isActive
                          ? isDarkTheme
                            ? 'text-white'
                            : 'text-[#C5A880]'
                          : 'text-[#9E7E47]'
                      }`}
                    />
                    <span className="truncate min-w-0 leading-none">
                      {language === 'en' ? shortEn : shortPt}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

        {/* ====================================================================
            FLOATING MICA / LIQUID-GLASS DROPDOWN CARD (CARD DESPLEGABLE LATERAL)
           ==================================================================== */}
        <div
          role="region"
          aria-label="Concierge Dropdown Card"
          className={`absolute right-0 mt-2.5 w-full sm:w-[430px] rounded-[28px] p-5 sm:p-6 transition-all duration-300 origin-top-right ${
            isDarkTheme ? 'mica-frosted-dark text-[#FAF8F5]' : 'mica-frosted-light text-[#1C1C1C]'
          } ${
            dropdownOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
        >
          {/* Card Header + Instant Search */}
          <div className="space-y-4 pb-4 border-b border-[#9E7E47]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7E47]">
                  SUITE 802 · TITANIUM ELITE
                </p>
                <p className="font-serif-luxury text-base font-medium">
                  {language === 'en' ? 'More Concierge Services' : 'Mais Serviços Concierge'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDropdownOpen(false)}
                aria-label="Close dropdown card"
                className="md3e-btn p-1.5 rounded-full bg-[#9E7E47]/15 text-[#9E7E47] hover:bg-[#9E7E47] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="w-3.5 h-3.5 text-[#9E7E47] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Search The Carioca, Chef Amaral, Bossa, Valet, Posto 5...'
                    : 'Buscar The Carioca, Chef Amaral, Bossa, Valet, Posto 5...'
                }
                aria-label="Search Concierge Services"
                className={`w-full h-10 pl-9 pr-4 rounded-full text-xs border transition-all focus:outline-none ${
                  isDarkTheme
                    ? 'bg-black/45 border-[#9E7E47]/40 text-[#FAF8F5] placeholder:text-[#FAF8F5]/50 focus:border-[#C5A880]'
                    : 'bg-white/90 border-[#9E7E47]/35 text-[#1C1C1C] placeholder:text-[#7F7668] focus:border-[#9E7E47]'
                }`}
              />
            </form>
          </div>

          {/* Mobile/Tablet Primary Modules (Visible when screen < lg) */}
          <div className="lg:hidden space-y-2 pt-4 pb-3 border-b border-[#9E7E47]/20 w-full overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7E47]">
              {language === 'en' ? 'Suite Screens & Experiences' : 'Telas da Suíte & Experiências'}
            </p>
            <div className="grid grid-cols-3 gap-2 w-full">
              {PRIMARY_NAV_MODULES.map(({ id, icon: Icon, shortEn, shortPt }) => {
                const isActive = activeModule === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveModule(id);
                      setDropdownOpen(false);
                    }}
                    aria-label={t.nav.modules[id]}
                    title={t.nav.modules[id]}
                    className={`md3e-btn p-2.5 rounded-2xl text-center flex flex-col items-center justify-center gap-1 cursor-pointer border transition-all min-w-0 overflow-hidden w-full ${
                      isActive
                        ? isDarkTheme
                          ? 'bg-[#9E7E47] text-white border-[#C5A880] shadow-[0_0_15px_rgba(158,126,71,0.45)]'
                          : 'bg-[#1C1C1C] text-white border-[#1C1C1C] shadow-md'
                        : isDarkTheme
                        ? 'bg-white/10 hover:bg-white/15 border-white/15 text-[#FAF8F5]'
                        : 'bg-white/90 hover:bg-white border-[#9E7E47]/30 text-[#1C1C1C]'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? isDarkTheme
                            ? 'bg-black/35 text-white'
                            : 'bg-[#9E7E47] text-white'
                          : isDarkTheme
                          ? 'bg-white/10 text-[#C5A880]'
                          : 'bg-[#FAF8F5] text-[#9E7E47] border border-[#9E7E47]/20'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider truncate w-full px-1 min-w-0 leading-tight">
                      {language === 'en' ? shortEn : shortPt}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Modules in the Dropdown Card (Safety & 24/7, Administration / Ops Console) */}
          <div className="space-y-2 py-3 w-full overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9E7E47] lg:hidden">
              {language === 'en' ? 'Concierge & Operations' : 'Concierge & Operações'}
            </p>
            {SECONDARY_DROPDOWN_MODULES.map(({ id, icon: Icon, descEn, descPt }) => {
              const isActive = activeModule === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    if (id === 'management') {
                      setAdminActiveTab('all');
                      setActiveModule('management');
                    } else {
                      setActiveModule(id);
                    }
                    setDropdownOpen(false);
                  }}
                  className={`md3e-btn w-full p-3 sm:p-3.5 rounded-[22px] text-left flex items-center gap-3 cursor-pointer border transition-all min-w-0 overflow-hidden ${
                    isActive
                      ? isDarkTheme
                        ? 'bg-[#9E7E47] text-white border-[#C5A880] shadow-[0_0_15px_rgba(158,126,71,0.45)]'
                        : 'bg-[#1C1C1C] text-white border-[#1C1C1C] shadow-md'
                      : isDarkTheme
                      ? 'bg-white/10 border-white/15 hover:bg-white/15 text-[#FAF8F5]'
                      : 'bg-white/90 border-[#9E7E47]/30 hover:bg-white text-[#1C1C1C]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? isDarkTheme
                          ? 'bg-black/35 text-white'
                          : 'bg-[#9E7E47] text-white'
                        : isDarkTheme
                        ? 'bg-white/10 text-[#C5A880]'
                        : 'bg-[#FAF8F5] text-[#9E7E47] border border-[#9E7E47]/20'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] truncate min-w-0">
                        {t.nav.modules[id]}
                      </p>
                      {id === 'management' && pendingCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[8.5px] font-bold bg-[#B84C16] text-white animate-pulse shrink-0">
                          {pendingCount} Active
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] truncate mt-0.5 min-w-0 ${
                        isActive
                          ? 'text-white/90'
                          : isDarkTheme
                          ? 'text-[#FAF8F5]/65'
                          : 'text-[#4E463A]'
                      }`}
                    >
                      {language === 'en' ? descEn : descPt}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Direct Butler Actions & Broadcast Advisory */}
          <div className="pt-3 border-t border-[#9E7E47]/20 space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setActiveModal('dining');
                  setDropdownOpen(false);
                }}
                className="md3e-btn inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.11em] bg-[#9E7E47]/15 text-[#9E7E47] border border-[#9E7E47]/35 hover:bg-[#9E7E47] hover:text-white cursor-pointer whitespace-nowrap"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>The Carioca</span>
              </button>
              <button
                onClick={() => {
                  setActiveModal('valet');
                  setDropdownOpen(false);
                }}
                className="md3e-btn inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.11em] bg-[#9E7E47]/15 text-[#9E7E47] border border-[#9E7E47]/35 hover:bg-[#9E7E47] hover:text-white cursor-pointer whitespace-nowrap"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Chauffeur</span>
              </button>
            </div>

            {broadcastMessage && (
              <div className="p-3 rounded-2xl bg-[#9E7E47]/12 border border-[#9E7E47]/30 flex items-start justify-between gap-2 text-[11px]">
                <div className="flex items-start gap-2">
                  <Bell className="w-3.5 h-3.5 text-[#9E7E47] shrink-0 mt-0.5" />
                  <span className="leading-snug">{broadcastMessage}</span>
                </div>
                <button
                  onClick={dismissBroadcast}
                  aria-label="Dismiss broadcast"
                  className="opacity-60 hover:opacity-100 p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </header>
);
};
