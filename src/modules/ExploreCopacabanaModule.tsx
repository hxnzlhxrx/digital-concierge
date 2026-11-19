import React, { useState } from 'react';
import {
  MapPin,
  Car,
  ShieldCheck,
  Clock,
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
} from 'lucide-react';
import { useConcierge } from '../context/ConciergeContext';

interface Landmark {
  id: string;
  name: string;
  categoryEn: string;
  categoryPt: string;
  distance: string;
  bestTimeEn: string;
  bestTimePt: string;
  coords: { top: string; left: string };
  descriptionEn: string;
  descriptionPt: string;
  securityNoteEn: string;
  securityNotePt: string;
  image: string;
}

const LANDMARKS: Landmark[] = [
  {
    id: 'forte-copacabana',
    name: 'Forte de Copacabana & Confeitaria Colombo',
    categoryEn: 'HISTORIC COASTAL FORTRESS & BELLE ÉPOQUE CAFÉ',
    categoryPt: 'FORTALEZA HISTÓRICA COSTEIRA & CAFÉ BELLE ÉPOQUE',
    distance: '1.8 km · 6 mins in Mercedes S-Class',
    bestTimeEn: '08:30 – 11:00 BRT (Morning Ocean Breeze)',
    bestTimePt: '08:30 – 11:00 BRT (Brisa Matinal do Atlântico)',
    coords: { top: '68%', left: '54%' },
    descriptionEn:
      'Perched on the southern headland at Posto 6, offering panoramic views of the entire Burle Marx curve alongside traditional Portuguese pastries at Confeitaria Colombo.',
    descriptionPt:
      'Situado no promontório sul no Posto 6, oferecendo vistas panorâmicas de toda a curva de Burle Marx ao lado da tradicional confeitaria na Confeitaria Colombo.',
    securityNoteEn: 'Military-policed cultural perimeter; direct chauffeur drop-off at main gate.',
    securityNotePt: 'Perímetro cultural policiado; desembarque direto com chofer no portão principal.',
    image: '/assets/copacabana-beach-aerial.png',
  },
  {
    id: 'pedra-arpoador',
    name: 'Pedra do Arpoador & Sunset Viewpoint',
    categoryEn: 'ICONIC GOLDEN HOUR PENINSULA',
    categoryPt: 'PENÍNSULA ICÔNICA DO PÔR DO SOL',
    distance: '2.2 km · 8 mins via Av. Francisco Otaviano',
    bestTimeEn: '16:45 – 18:15 BRT (Golden Hour Applause)',
    bestTimePt: '16:45 – 18:15 BRT (Aplauso ao Pôr do Sol)',
    coords: { top: '74%', left: '46%' },
    descriptionEn:
      'Where Copacabana meets Ipanema. Witness Rio’s most celebrated ritual as locals and travelers applaud the sun sinking behind Two Brothers peaks (Morro Dois Irmãos).',
    descriptionPt:
      'Onde Copacabana encontra Ipanema. Testemunhe o ritual mais celebrado do Rio enquanto cariocas e viajantes aplaudem o sol se pondo atrás do Morro Dois Irmãos.',
    securityNoteEn: 'Dedicated BPTur patrol zone; private escort available on request.',
    securityNotePt: 'Zona de patrulha dedicada do BPTur; escolta privada disponível sob consulta.',
    image: '/assets/spanish-guitar-terrace.png',
  },
  {
    id: 'cristo-redentor',
    name: 'Corcovado & Cristo Redentor',
    categoryEn: 'SEVEN WONDERS SANCTUARY · TIJUCA FOREST',
    categoryPt: 'SANTUÁRIO DAS SETE MARAVILHAS · FLORESTA DA TIJUCA',
    distance: '8.5 km · 22 mins via Cosme Velho VIP Lane',
    bestTimeEn: '07:30 – 09:00 BRT (First Private Ascent)',
    bestTimePt: '07:30 – 09:00 BRT (Primeira Subida Privada)',
    coords: { top: '42%', left: '38%' },
    descriptionEn:
      'Ascend 710 meters through the Atlantic rainforest of Tijuca National Park to the Art Deco monument embracing Guanabara Bay and Sugarloaf.',
    descriptionPt:
      'Suba 710 metros pela Mata Atlântica do Parque Nacional da Tijuca até o monumento Art Déco que abraça a Baía de Guanabara e o Pão de Açúcar.',
    securityNoteEn: 'JW Concierge pre-clears VIP fast-track boarding at Paineiras Visitor Center.',
    securityNotePt: 'Concierge JW pré-credencia embarque VIP sem filas no Centro de Visitantes Paineiras.',
    image: '/assets/hero-penthouse-sunrise.png',
  },
  {
    id: 'pao-de-acucar',
    name: 'Pão de Açúcar (Sugarloaf Cable Car)',
    categoryEn: 'GUANABARA BAY GRANITE MONOLITH · URCA',
    categoryPt: 'MONÓLITO DE GRANITO DA BAÍA DE GUANABARA · URCA',
    distance: '5.1 km · 14 mins to Praia Vermelha VIP Lounge',
    bestTimeEn: '15:30 – 18:30 BRT (Twilight Harbor Panorama)',
    bestTimePt: '15:30 – 18:30 BRT (Panorama Crepuscular da Baía)',
    coords: { top: '52%', left: '72%' },
    descriptionEn:
      'Board the Swiss glass cabin bondinho from peaceful Urca to Morro da Urca and the 396-meter summit of Pão de Açúcar with private champagne access.',
    descriptionPt:
      'Embarque no bondinho suíço a partir da tranquila Urca até o Morro da Urca e o cume de 396 metros do Pão de Açúcar com acesso VIP e champanhe.',
    securityNoteEn: 'Urca is Rio’s most tranquil military neighborhood; zero-friction access.',
    securityNotePt: 'A Urca é o bairro militar mais tranquilo do Rio; acesso de altíssima segurança.',
    image: '/assets/burle-marx-promenade.png',
  },
  {
    id: 'santa-teresa',
    name: 'Santa Teresa & Bohemian Heritage',
    categoryEn: 'HISTORIC HILLTOP ATELIERS & BONDE TRAMWAY',
    categoryPt: 'ATELIÊS HISTÓRICOS & BONDE DE SANTA TERESA',
    distance: '9.4 km · 24 mins via Aterro do Flamengo',
    bestTimeEn: '11:00 – 15:30 BRT (Daytime Cultural & Art Walk)',
    bestTimePt: '11:00 – 15:30 BRT (Passeio Diurno de Arte e Cultura)',
    coords: { top: '26%', left: '58%' },
    descriptionEn:
      'Cobblestone avenues, 19th-century mansions, Parque das Ruínas views, and private studio visits with contemporary Brazilian sculptors and painters.',
    descriptionPt:
      'Ruas de paralelepípedos, casarões do século XIX, vista do Parque das Ruínas e visitas privadas a ateliês de escultores e pintores brasileiros contemporâneos.',
    securityNoteEn: 'Recommended with JW Marriott Private Luxury Chauffeur remaining on standby.',
    securityNotePt: 'Recomendado com Chofer Particular JW Marriott permanecendo à disposição.',
    image: '/assets/lapa-nightlife.png',
  },
];

export const ExploreCopacabanaModule: React.FC = () => {
  const { t, language, setActiveModal, addRequest } = useConcierge();
  const [mapVariant, setMapVariant] = useState<'vector' | 'satellite'>('vector');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark>(LANDMARKS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleQuickChauffeur = (landmark: Landmark) => {
    addRequest({
      category: 'Chauffeur',
      title: `Mercedes-Benz S-Class Luxury Chauffeur → ${landmark.name}`,
      details: `${landmark.distance} · ${
        language === 'en' ? landmark.securityNoteEn : landmark.securityNotePt
      }`,
      priority: 'VIP Titanium',
    });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-14">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#9E7E47]/20 pb-8">
        <div className="space-y-2 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
            {t.explore.tag}
          </p>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1C1C1C]">
            {t.explore.title}
          </h1>
          <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed">
            {t.explore.subtitle}
          </p>
        </div>

        {/* Map Layer Switcher (MD3E Liquid Glass Segmented Capsule) */}
        <div className="inline-flex items-center mica-frosted-light p-1.5 rounded-full border border-[#9E7E47]/30 self-start lg:self-auto">
          <button
            onClick={() => setMapVariant('vector')}
            className={`md3e-btn inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap cursor-pointer ${
              mapVariant === 'vector'
                ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-sm'
                : 'text-[#4E463A] hover:text-[#1C1C1C]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{t.explore.viewModeVector}</span>
          </button>
          <button
            onClick={() => setMapVariant('satellite')}
            className={`md3e-btn inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap cursor-pointer ${
              mapVariant === 'satellite'
                ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-sm'
                : 'text-[#4E463A] hover:text-[#1C1C1C]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.explore.viewModeSatellite}</span>
          </button>
        </div>
      </section>

      {/* Interactive Daytime Google Maps Light Mode Vector Cartography Viewer */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-[#9E7E47]/35 shadow-[0_12px_36px_-4px_rgba(28,28,28,0.1)] bg-[#F8F3EA] h-[440px] sm:h-[540px]">
          <div
            className="w-full h-full transition-transform duration-500 ease-out relative"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={
                mapVariant === 'vector'
                  ? '/assets/map-light-vector-rio.png'
                  : '/assets/map-vector-satellite.png'
              }
              alt="Daytime Google Maps Light Mode Vector Cartography of Rio de Janeiro and Copacabana"
              className="w-full h-full object-cover"
            />

            {/* JW Marriott Copacabana Anchor Beacon */}
            <div
              style={{ top: '62%', left: '50%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="px-3 py-1.5 rounded-full bg-[#1C1C1C] text-[#FAF8F5] border-2 border-[#9E7E47] shadow-lg flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#9E7E47] animate-ping" />
                <span>JW Marriott Copacabana (Suite 802)</span>
              </div>
            </div>

            {/* Interactive Satin Brass Landmark Beacons */}
            {LANDMARKS.map((landmark, idx) => {
              const isSelected = selectedLandmark.id === landmark.id;
              return (
                <button
                  key={landmark.id}
                  onClick={() => setSelectedLandmark(landmark)}
                  style={{ top: landmark.coords.top, left: landmark.coords.left }}
                  aria-label={`Select landmark: ${landmark.name}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold shadow-md border transition-all ${
                      isSelected
                        ? 'bg-[#9E7E47] text-white border-white'
                        : 'bg-white/95 text-[#1C1C1C] border-[#9E7E47]/50 hover:bg-[#1C1C1C] hover:text-[#FAF8F5]'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-[#1C1C1C] text-[#C5A880] text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="hidden sm:inline whitespace-nowrap">
                      {landmark.name.split('&')[0].trim()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Top Left Cartographic Standard Verification Pill */}
          <div className="absolute top-4 left-4 z-30 glass-ivory px-3.5 py-1.5 rounded-full border border-[#9E7E47]/30 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1C1C1C]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#9E7E47]" />
            <span>{t.explore.mapStandardBadge}</span>
          </div>

          {/* Bottom Right Zoom Controls */}
          <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-1.5">
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, Number((z + 0.15).toFixed(2))))}
              aria-label="Zoom in map"
              className="w-9 h-9 rounded-full glass-ivory border border-[#9E7E47]/30 flex items-center justify-center text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-colors shadow-sm cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(1, Number((z - 0.15).toFixed(2))))}
              aria-label="Zoom out map"
              className="w-9 h-9 rounded-full glass-ivory border border-[#9E7E47]/30 flex items-center justify-center text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-colors shadow-sm cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selected Landmark Detail Inspection Sheet */}
        <aside className="lg:col-span-4 papersheet-card rounded-3xl p-6 sm:p-7 space-y-5">
          <div className="relative h-48 rounded-2xl overflow-hidden border border-[#9E7E47]/20">
            <img
              src={selectedLandmark.image}
              alt={selectedLandmark.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1C1C1C]/85 text-[#C5A880] text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md">
              {language === 'en' ? selectedLandmark.categoryEn : selectedLandmark.categoryPt}
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="font-serif-luxury text-2xl font-medium text-[#1C1C1C]">
              {selectedLandmark.name}
            </h2>
            <p className="text-sm text-[#4E463A] leading-relaxed">
              {language === 'en' ? selectedLandmark.descriptionEn : selectedLandmark.descriptionPt}
            </p>
          </div>

          <div className="space-y-2.5 pt-3 border-t border-[#EAE5DC] text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#9E7E47] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1C1C1C]">{t.explore.distanceLabel}: </span>
                <span className="text-[#4E463A]">{selectedLandmark.distance}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#9E7E47] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1C1C1C]">{t.explore.bestTimeLabel}: </span>
                <span className="text-[#4E463A]">
                  {language === 'en' ? selectedLandmark.bestTimeEn : selectedLandmark.bestTimePt}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#9E7E47] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1C1C1C]">{t.explore.securityNoteLabel}: </span>
                <span className="text-[#4E463A]">
                  {language === 'en'
                    ? selectedLandmark.securityNoteEn
                    : selectedLandmark.securityNotePt}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => handleQuickChauffeur(selectedLandmark)}
              className="w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Car className="w-4 h-4 text-[#9E7E47]" />
              <span>
                {language === 'en'
                  ? 'Dispatch S-Class to This Landmark'
                  : 'Solicitar S-Class para Este Destino'}
              </span>
            </button>
            <button
              onClick={() => setActiveModal('valet')}
              className="w-full py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-[#9E7E47] text-[#1C1C1C] hover:bg-[#EAE5DC] transition-colors cursor-pointer"
            >
              {t.explore.chauffeurCta}
            </button>
          </div>
        </aside>
      </section>

      {/* All 5 Landmarks Selector Strip */}
      <section className="space-y-5">
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1C1C]">
          {t.explore.landmarksTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {LANDMARKS.map((item, index) => {
            const active = selectedLandmark.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedLandmark(item)}
                className={`p-5 rounded-2xl text-left transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#1C1C1C] text-[#FAF8F5] border-[#9E7E47] shadow-md'
                    : 'papersheet-card text-[#1C1C1C]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-6 h-6 rounded-full bg-[#9E7E47] text-white text-xs font-bold flex items-center justify-center">
                    0{index + 1}
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                      active ? 'text-[#C5A880]' : 'text-[#7F7668]'
                    }`}
                  >
                    {item.distance.split('·')[0]}
                  </span>
                </div>
                <h3 className="font-serif-luxury text-base font-semibold leading-snug">
                  {item.name}
                </h3>
              </button>
            );
          })}
        </div>
      </section>

      {/* Executive Chauffeur Planner Banner (Stitched Dark Leather + MD3E Morph) */}
      <section className="rounded-[32px] leather-dark stitched-brass text-[#FAF8F5] p-6 sm:p-10 border border-[#9E7E47]/45 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
            {t.explore.chauffeurSubtitle}
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white">
            {t.explore.chauffeurTitle}
          </h2>
          <p className="text-sm text-[#FAF8F5]/80 leading-relaxed">
            {language === 'en'
              ? 'Travel across Rio de Janeiro in supreme comfort. Our private fleet of luxury Mercedes-Benz S-Class sedans and V-Class executive vans is operated by dedicated bilingual chauffeurs and city concierges.'
              : 'Viaje pelo Rio de Janeiro com máximo conforto. Nossa frota privada de sedãs de luxo Mercedes-Benz S-Class e vans executivas V-Class é operada por choferes particulares bilíngues e concierges de bordo.'}
          </p>
        </div>
        <button
          onClick={() => setActiveModal('valet')}
          className="inline-flex items-center gap-2.5 px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#9E7E47] text-white hover:bg-white hover:text-[#1C1C1C] transition-all shrink-0 cursor-pointer"
        >
          <Car className="w-4 h-4" />
          <span>{t.explore.chauffeurCta}</span>
        </button>
      </section>
    </div>
  );
};
