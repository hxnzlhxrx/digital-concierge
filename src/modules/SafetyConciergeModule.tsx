import React from 'react';
import {
  ShieldCheck,
  PhoneCall,
  Compass,
  Banknote,
  Sun,
  Headset,
  Sparkles,
  Briefcase,
  Car,
  CheckCircle2,
} from 'lucide-react';
import { useConcierge } from '../context/ConciergeContext';

const EMERGENCY_HOTLINES = [
  {
    id: 'bptur',
    unitEn: 'Tourist Police (BPTur)',
    unitPt: 'Polícia de Turismo (BPTur)',
    number: '+55 (21) 2332-2924',
    badge: '24/7 BILINGUAL PATROL',
    descEn: 'Dedicated Zona Sul tourist battalion stationed along Copacabana & Ipanema.',
    descPt: 'Batalhão especializado em atendimento ao turista na Zona Sul (Copacabana e Ipanema).',
  },
  {
    id: 'pm',
    unitEn: 'Policia Militar',
    unitPt: 'Polícia Militar',
    number: '190',
    badge: 'METROPOLITAN RAPID RESPONSE',
    descEn: 'Immediate state police dispatch for metropolitan security incidents.',
    descPt: 'Acionamento policial imediato para ocorrências na região metropolitana.',
  },
  {
    id: 'samu',
    unitEn: 'SAMU Ambulance',
    unitPt: 'SAMU Ambulância',
    number: '192',
    badge: 'EMERGENCY MEDICAL ICU',
    descEn: 'Mobile intensive care medical response & Copa Star Hospital coordination.',
    descPt: 'Unidade móvel de terapia intensiva e coordenação com o Hospital Copa Star.',
  },
  {
    id: 'hotel-sec',
    unitEn: 'In-House Hotel Security',
    unitPt: 'Segurança Interna do Hotel',
    number: 'Ext. 99',
    badge: 'EXECUTIVE PROTECTION DESK',
    descEn: 'Immediate on-premise JW Marriott security & Posto 5 beach escort team.',
    descPt: 'Equipe interna de proteção executiva JW Marriott e acompanhamento no Posto 5.',
  },
];

const DEPARTMENT_SPEED_DIAL = [
  {
    id: 'front-desk',
    nameEn: 'Executive Front Desk',
    namePt: 'Recepção Executiva',
    ext: 'Ext. 01',
    icon: Headset,
    descEn: 'Suite billing, Bonvoy Elite assistance & late checkout',
    descPt: 'Faturamento da suíte, assistência Bonvoy Elite e late check-out',
  },
  {
    id: 'housekeeping',
    nameEn: 'Housekeeping & Linen',
    namePt: 'Governança & Enxoval',
    ext: 'Ext. 02',
    icon: Sparkles,
    descEn: 'Turn-down service, garment pressing & pillow curation',
    descPt: 'Abertura de cama, passadoria expressa e menu de travesseiros',
  },
  {
    id: 'butler',
    nameEn: '24/7 Butler Service',
    namePt: 'Serviço de Mordomia 24/7',
    ext: 'Ext. 03',
    icon: Briefcase,
    descEn: 'In-suite dining setup, packing assistance & private bar',
    descPt: 'Jantar privativo na suíte, organização de bagagem e adega',
  },
  {
    id: 'valet',
    nameEn: 'Executive Valet & Fleet',
    namePt: 'Valet Executivo & Frota',
    ext: 'Ext. 04',
    icon: Car,
    descEn: 'Porte-cochère vehicle retrieval & luxury Mercedes chauffeur dispatch',
    descPt: 'Retirada de veículo na rampa e despacho de Mercedes de luxo com chofer',
  },
];

export const SafetyConciergeModule: React.FC = () => {
  const { t, language, addRequest, showToast } = useConcierge();

  const handleDialHotline = (unit: string, number: string) => {
    showToast(
      language === 'en'
        ? `Connecting Suite 802 VoIP Line to ${unit} (${number})...`
        : `Conectando Linha VoIP da Suíte 802 para ${unit} (${number})...`
    );
  };

  const handleDepartmentDispatch = (deptName: string, ext: string) => {
    addRequest({
      category: 'Amenity',
      title: `Direct Speed Dial Request — ${deptName} (${ext})`,
      details: `Priority Suite 802 callback & attendant dispatch initiated`,
      priority: 'Immediate',
    });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-16">
      {/* Header */}
      <section className="space-y-3 border-b border-[#9E7E47]/20 pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
          {t.safety.tag}
        </p>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1C1C1C]">
          {t.safety.title}
        </h1>
        <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed max-w-3xl">
          {t.safety.subtitle}
        </p>
      </section>

      {/* Verified Emergency Hotline Grid */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
            {t.safety.hotlineSubtitle}
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1C1C] mt-1">
            {t.safety.hotlineTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EMERGENCY_HOTLINES.map((hotline) => {
            const unitName = language === 'en' ? hotline.unitEn : hotline.unitPt;
            return (
              <div
                key={hotline.id}
                className="papersheet-card rounded-2xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] bg-[#F8F3EA] text-[#9E7E47] border border-[#9E7E47]/25">
                      {hotline.badge}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-[#9E7E47]" />
                  </div>
                  <h3 className="font-serif-luxury text-lg font-semibold text-[#1C1C1C]">
                    {unitName}
                  </h3>
                  <p className="text-2xl font-bold tracking-tight text-[#1C1C1C] font-mono">
                    {hotline.number}
                  </p>
                  <p className="text-xs text-[#4E463A] leading-relaxed">
                    {language === 'en' ? hotline.descEn : hotline.descPt}
                  </p>
                </div>

                <button
                  onClick={() => handleDialHotline(unitName, hotline.number)}
                  className="w-full py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#9E7E47]" />
                  <span>
                    {t.safety.callNow} · {hotline.number}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Zona Sul Safety Protocols (Bento Grid with Museu do Amanhã) */}
      <section className="space-y-6">
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1C1C]">
          {t.safety.bentoTitle}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: Santiago Calatrava's Museu do Amanhã Secure Cultural Route */}
          <article className="lg:col-span-7 papersheet-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E7E47]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>VERIFIED CULTURAL CORRIDOR</span>
                </span>
                <h3 className="font-serif-luxury text-2xl font-medium text-[#1C1C1C]">
                  Santiago Calatrava’s Museu do Amanhã
                </h3>
                <p className="text-xs sm:text-sm text-[#4E463A] leading-relaxed">
                  {language === 'en'
                    ? 'Located at Pier Mauá (Porto Maravilha). Our concierge pre-arranges private morning entry and direct drop-off at the museum plaza via Aterro do Flamengo expressway.'
                    : 'Localizado no Píer Mauá (Porto Maravilha). Nosso concierge organiza entrada matinal privada e desembarque direto na praça do museu via Aterro do Flamengo.'}
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#9E7E47]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Vetted VIP Security Perimeter · 20 mins from Hotel</span>
              </div>
            </div>
            <div className="md:col-span-6 min-h-[240px]">
              <img
                src="/assets/museu-do-amanha.png"
                alt="Santiago Calatrava Museu do Amanhã futuristic architecture in Rio de Janeiro"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </article>

          {/* Bento Card 2: Posto 5 Beachfront Etiquette & Sanctuary */}
          <article className="lg:col-span-5 papersheet-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F8F3EA] border border-[#9E7E47]/30 flex items-center justify-center text-[#9E7E47]">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E7E47] block">
                BEACHFRONT SANCTUARY PROTOCOL
              </span>
              <h3 className="font-serif-luxury text-2xl font-medium text-[#1C1C1C]">
                Posto 5 Beach Etiquette & Private Attendants
              </h3>
              <p className="text-xs sm:text-sm text-[#4E463A] leading-relaxed">
                {language === 'en'
                  ? 'Leave luxury timepieces and passports in your Suite 802 biometric safe. Cross Avenida Atlântica with only your waterproof NFC wristband—our private JW Beach Butlers provide loungers, umbrellas, chilled coconut water, and continuous visual supervision.'
                  : 'Deixe relógios de alto valor e passaportes no cofre biométrico da Suíte 802. Atravesse a Avenida Atlântica apenas com sua pulseira NFC à prova d’água — nossos mordomos de praia oferecem espreguiçadeiras, guarda-sóis, água de coco gelada e supervisão contínua.'}
              </p>
            </div>

            <div className="pt-3 border-t border-[#EAE5DC] flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1C1C1C]">JW Beach Station: Posto 4/5</span>
              <span className="text-[#9E7E47] font-semibold">07:00 – 18:30 BRT</span>
            </div>
          </article>

          {/* Bento Card 3: Currency Exchange & Contactless Payments */}
          <article className="lg:col-span-12 papersheet-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-11 h-11 rounded-2xl bg-[#F8F3EA] border border-[#9E7E47]/30 flex items-center justify-center text-[#9E7E47] shrink-0">
                <Banknote className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9E7E47]">
                  FINANCIAL & CURRENCY PROTOCOL
                </span>
                <h3 className="font-serif-luxury text-xl font-medium text-[#1C1C1C]">
                  {language === 'en'
                    ? 'Verified Currency Exchange & Contactless Apple/Google Pay'
                    : 'Câmbio Verificado & Pagamentos por Aproximação Apple/Google Pay'}
                </h3>
                <p className="text-xs sm:text-sm text-[#4E463A] leading-relaxed">
                  {language === 'en'
                    ? 'Avoid street ATMs. Over 98% of Zona Sul boutiques, fine restaurants, and beach kiosks accept tap-to-pay via Apple Wallet and Google Wallet. For physical Brazilian Real (BRL) notes, utilize our audited Executive Cashier at the Mezzanine level.'
                    : 'Evite caixas eletrônicos de rua. Mais de 98% das boutiques da Zona Sul, restaurantes e quiosques aceitam pagamento por aproximação via Apple Wallet e Google Wallet. Para espécie em Reais (BRL), utilize nosso Caixa Executivo no Mezanino.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDepartmentDispatch('Executive Cashier & Currency Desk', 'Ext. 01')}
              className="px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.15em] border border-[#9E7E47] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              {language === 'en' ? 'Request In-Suite Currency Exchange' : 'Solicitar Câmbio na Suíte'}
            </button>
          </article>
        </div>
      </section>

      {/* Direct Department Speed Dial */}
      <section className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
            {t.safety.speedDialSubtitle}
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1C1C] mt-1">
            {t.safety.speedDialTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEPARTMENT_SPEED_DIAL.map((dept) => {
            const Icon = dept.icon;
            const deptName = language === 'en' ? dept.nameEn : dept.namePt;
            return (
              <div
                key={dept.id}
                className="papersheet-card rounded-2xl p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-[#F8F3EA] border border-[#9E7E47]/25 flex items-center justify-center text-[#9E7E47]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-[#9E7E47]">{dept.ext}</span>
                  </div>
                  <h3 className="font-serif-luxury text-lg font-semibold text-[#1C1C1C]">
                    {deptName}
                  </h3>
                  <p className="text-xs text-[#4E463A] leading-relaxed">
                    {language === 'en' ? dept.descEn : dept.descPt}
                  </p>
                </div>

                <button
                  onClick={() => handleDepartmentDispatch(deptName, dept.ext)}
                  className="w-full py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#FAF8F5] border border-[#9E7E47]/40 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-colors cursor-pointer"
                >
                  {t.safety.dispatchInstant} · {dept.ext}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
