import React from 'react';
import { MapPin, Phone, Shield, Award, Sparkles } from 'lucide-react';
import { useConcierge } from '../../context/ConciergeContext';
import { ModuleId } from '../../i18n/translations';
import { DevTag } from './DevTag';

export const Footer: React.FC = () => {
  const { t, setActiveModule, setActiveModal, language, isPlayerVisible } = useConcierge();

  const handleModuleNav = (mod: ModuleId) => {
    setActiveModule(mod, true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`w-full bg-[#141414] text-[#FAF8F5] border-t border-[#9E7E47]/30 transition-all ${
        isPlayerVisible ? 'pb-28' : 'pb-12'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 pt-16 pb-8">
        {/* Top Centered Official Inverted Pure White Emblem per Stitch JSON Spec */}
        <div className="flex flex-col items-center justify-center text-center mb-14 pb-12 border-b border-[#9E7E47]/20">
          <img
            src="/assets/jw-marriott-logo.png"
            alt="JW Marriott Official White Emblem"
            className="h-14 sm:h-16 w-auto object-contain brightness-0 invert opacity-90 mx-auto mb-6"
          />
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#9E7E47] font-semibold">
            {t.footer.tagline}
          </p>
          <div className="mt-7">
            <DevTag />
          </div>
        </div>

        {/* 4-Column Master Footer Architecture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 text-left">
          {/* Column 1: Brand & Sanctuary */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9E7E47]">
              Copacabana Expressive Luxury
            </h3>
            <p className="text-xs leading-relaxed text-[#FAF8F5]/70">
              {language === 'en'
                ? 'An oceanfront sanctuary where Roberto Burle Marx’s modernist heritage meets JW Marriott’s global hospitality artistry on Avenida Atlântica.'
                : 'Um santuário de frente para o mar onde o patrimônio modernista de Roberto Burle Marx encontra a arte da hospitalidade global do JW Marriott na Avenida Atlântica.'}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#C5A880] pt-1">
              <Award className="w-4 h-4 text-[#9E7E47]" />
              <span>Marriott Bonvoy® Luxury Group</span>
            </div>
          </div>

          {/* Column 2: Curated Experiences */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9E7E47]">
              {t.footer.colExperience}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleModuleNav('experience')}
                  className="text-[#FAF8F5]/70 hover:text-[#9E7E47] transition-colors cursor-pointer"
                >
                  {t.nav.modules.experience}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleModuleNav('rhythm')}
                  className="text-[#FAF8F5]/70 hover:text-[#9E7E47] transition-colors cursor-pointer"
                >
                  {t.nav.modules.rhythm} (Bossa & Vinyl)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleModuleNav('explore')}
                  className="text-[#FAF8F5]/70 hover:text-[#9E7E47] transition-colors cursor-pointer"
                >
                  {t.nav.modules.explore} (Light Vector Map)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('dining')}
                  className="text-[#FAF8F5]/70 hover:text-[#9E7E47] transition-colors cursor-pointer"
                >
                  The Carioca by Chef Amaral & Baretto-Londra
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Guest Services & Security */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9E7E47]">
              {t.footer.colServices}
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleModuleNav('safety')}
                  className="text-[#FAF8F5]/70 hover:text-[#9E7E47] transition-colors cursor-pointer"
                >
                  {t.nav.modules.safety} (BPTur & Posto 5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleModuleNav('auth')}
                  className="text-[#FAF8F5]/70 hover:text-[#9E7E47] transition-colors cursor-pointer"
                >
                  {t.nav.modules.auth} (Suite 802 Pass)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('valet')}
                  className="text-[#FAF8F5]/70 hover:text-[#9E7E47] transition-colors cursor-pointer"
                >
                  Mercedes-Benz Executive Chauffeur
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleModuleNav('management')}
                  className="text-[#FAF8F5]/70 hover:text-[#9E7E47] transition-colors cursor-pointer"
                >
                  {t.nav.modules.management}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Property Contacts */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9E7E47]">
              {t.footer.colProperty}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#FAF8F5]/75">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9E7E47] shrink-0 mt-0.5" />
                <span>Av. Atlântica, 2600 · Posto 4/5 · Copacabana, Rio de Janeiro</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9E7E47] shrink-0" />
                <span>Concierge Desk: +55 (21) 2545-6500 · Ext. 01</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#9E7E47] shrink-0" />
                <span>BPTur Tourist Police: +55 (21) 2332-2924</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9E7E47] shrink-0" />
                <span>Design Baseline: v1.3.0 Master Release</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Links Row */}
        <div className="pt-8 border-t border-[#9E7E47]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/60">
          <p className="tracking-wider">{t.footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => handleModuleNav('auth')}
              className="hover:text-[#9E7E47] transition-colors cursor-pointer"
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={() => handleModuleNav('experience')}
              className="hover:text-[#9E7E47] transition-colors cursor-pointer"
            >
              {t.footer.terms}
            </button>
            <button
              onClick={() => handleModuleNav('safety')}
              className="hover:text-[#9E7E47] transition-colors cursor-pointer"
            >
              {t.footer.safetyLink}
            </button>
            <span className="text-[#9E7E47] font-semibold">{t.footer.bonvoy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
