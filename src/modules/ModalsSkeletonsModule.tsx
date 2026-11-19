import React from 'react';
import { Sparkles, Utensils, Car, Layers, CheckCircle2 } from 'lucide-react';
import { useConcierge } from '../context/ConciergeContext';
import { ModuleSkeleton } from '../components/skeletons/ModuleSkeleton';

export const ModalsSkeletonsModule: React.FC = () => {
  const { t, language, setActiveModal, triggerTemporarySkeleton, skeletonMode, setSkeletonMode } =
    useConcierge();

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16">
      {/* Header */}
      <section className="space-y-3 border-b border-[#9E7E47]/20 pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
          {t.modals.tag}
        </p>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1C1C1C]">
          {t.modals.title}
        </h1>
        <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed max-w-3xl">
          {t.modals.subtitle}
        </p>
      </section>

      {/* Interactive Modals Launcher Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Modal Card 1: Amenities & Linen */}
        <article className="papersheet-card rounded-3xl p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F3EA] border border-[#9E7E47]/30 flex items-center justify-center text-[#9E7E47]">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E7E47] block">
              {t.modals.amenitiesModalSub}
            </span>
            <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1C1C]">
              {t.modals.amenitiesModalTitle}
            </h2>
            <p className="text-sm text-[#4E463A] leading-relaxed">
              {language === 'en'
                ? 'Configure bespoke Hungarian goose-down pillows, 600-thread Egyptian cotton sheets, L’Occitane bath salts, and evening turn-down schedules.'
                : 'Configure travesseiros de pluma de ganso húngaro, lençóis de algodão egípcio 600 fios, sais de banho L’Occitane e horários de abertura de cama.'}
            </p>
          </div>
          <button
            onClick={() => setActiveModal('amenities')}
            className="w-full py-3.5 px-5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-colors cursor-pointer"
          >
            {t.modals.launchModal} · Amenities
          </button>
        </article>

        {/* Modal Card 2: Fine Dining & Sommelier */}
        <article className="papersheet-card rounded-3xl p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F3EA] border border-[#9E7E47]/30 flex items-center justify-center text-[#9E7E47]">
              <Utensils className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E7E47] block">
              {t.modals.diningModalSub}
            </span>
            <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1C1C]">
              {t.modals.diningModalTitle}
            </h2>
            <p className="text-sm text-[#4E463A] leading-relaxed">
              {language === 'en'
                ? 'Book contemporary coastal fine dining tasting menus at The Carioca led by Chef Amaral, or late-night jazz tables at Baretto-Londra with Master Sommelier Grand Cru pairings.'
                : 'Reserve menus degustação de alta gastronomia costeira no The Carioca com o Chef Amaral, ou mesas de jazz no Baretto-Londra com harmonização Grand Cru do Master Sommelier.'}
            </p>
          </div>
          <button
            onClick={() => setActiveModal('dining')}
            className="w-full py-3.5 px-5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#9E7E47] text-white hover:bg-[#1C1C1C] transition-colors cursor-pointer"
          >
            {t.modals.launchModal} · Fine Dining
          </button>
        </article>

        {/* Modal Card 3: Executive Valet & Chauffeur */}
        <article className="papersheet-card rounded-3xl p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F3EA] border border-[#9E7E47]/30 flex items-center justify-center text-[#9E7E47]">
              <Car className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E7E47] block">
              {t.modals.valetModalSub}
            </span>
            <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1C1C]">
              {t.modals.valetModalTitle}
            </h2>
            <p className="text-sm text-[#4E463A] leading-relaxed">
              {language === 'en'
                ? 'Schedule luxury Mercedes-Benz S-Class sedans or V-Class vans with bilingual private chauffeurs, or summon your vehicle to the porte-cochère.'
                : 'Agende sedãs de luxo Mercedes-Benz S-Class ou vans V-Class com choferes particulares bilíngues, ou solicite seu veículo na rampa.'}
            </p>
          </div>
          <button
            onClick={() => setActiveModal('valet')}
            className="w-full py-3.5 px-5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-colors cursor-pointer"
          >
            {t.modals.launchModal} · Chauffeur
          </button>
        </article>
      </section>

      {/* Multi-Breakpoint Skeleton Screen Framework Live Showcase */}
      <section className="rounded-3xl bg-[#F8F3EA] border border-[#9E7E47]/30 p-6 sm:p-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D1C5B5] pb-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.modals.skeletonSubtitle}</span>
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1C1C]">
              {t.modals.skeletonTitle}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => triggerTemporarySkeleton()}
              className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-colors cursor-pointer"
            >
              {t.modals.toggleSkeletonBtn} (1.8s)
            </button>
            <button
              onClick={() => setSkeletonMode(!skeletonMode)}
              className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-[#9E7E47] text-[#1C1C1C] hover:bg-[#EAE5DC] transition-colors cursor-pointer"
            >
              {skeletonMode ? 'Disable Global Skeleton' : 'Hold Global Skeleton'}
            </button>
          </div>
        </div>

        {/* Embedded Live Multi-Breakpoint Skeleton Specimen */}
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#EAE5DC] overflow-hidden">
          <div className="px-6 py-3 bg-[#EAE5DC]/60 border-b border-[#D1C5B5] flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A]">
            <span>Live Specimen · Zero Cumulative Layout Shift (CLS = 0.00)</span>
            <span className="inline-flex items-center gap-1 text-[#9E7E47]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Desktop / Tablet / Mobile Fluid Geometry</span>
            </span>
          </div>
          <ModuleSkeleton variant="grid" />
        </div>
      </section>
    </div>
  );
};
