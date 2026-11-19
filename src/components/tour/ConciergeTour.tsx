import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  Compass,
  Crown,
  Disc3,
  Headphones,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Map as MapIcon,
  Music,
  Radio,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { useConcierge } from '../../context/ConciergeContext';
import { Language, ModalType, ModuleId } from '../../i18n/translations';
import './tour.css';

/* Guía del Concierge — recorrido por la app como un paseo por el calçadão de Copacabana:
   cada paso es un "Posto" y el progreso avanza sobre la onda de Burle Marx.
   - Se abre sola al primer ingreso de la sesión (espera si hay otro <dialog> abierto).
   - Se reabre desde el menú 802 o el pie de página con openConciergeTour().
   - ← / → recorren los Postos, Esc cierra y el foco vuelve a quien la abrió.
   - "Llévame ahí" cierra la guía y abre el módulo o modal real de ese paso. */

const OPEN_EVENT = 'concierge:tour-open';
const SESSION_KEY = 'jwm.concierge.session';
const AUTO_OPEN_DELAY = 1200;

export const openConciergeTour = () => window.dispatchEvent(new Event(OPEN_EVENT));

type L10n = Record<Language, string>;
type TourAction = { kind: 'module'; module: ModuleId } | { kind: 'modal'; modal: Exclude<ModalType, null> } | { kind: 'admin' };

interface TourStep {
  icon: React.FC<{ className?: string }>;
  chapter: L10n;
  title: L10n;
  text: L10n;
  points: L10n[];
  note?: L10n;
  action?: { label: L10n; run: TourAction };
}

const STEPS: TourStep[] = [
  /* ---------- Boas-vindas ---------- */
  {
    icon: Crown,
    chapter: { en: 'Welcome', pt: 'Boas-vindas' },
    title: { en: 'Your stay, gathered in one place', pt: 'Sua estadia, reunida em um só lugar' },
    text: {
      en: 'This digital concierge accompanies you from the first sunrise to checkout: requests, dining, music, the city and your safety, at any hour and from any device.',
      pt: 'Este concierge digital acompanha você do primeiro nascer do sol ao check-out: pedidos, gastronomia, música, a cidade e sua segurança, a qualquer hora e em qualquer dispositivo.',
    },
    points: [
      { en: 'Six areas: Suite, Carioca Rhythm, Explore, Safety, Operations and the 802 menu', pt: 'Seis áreas: Suíte, Ritmo Carioca, Explorar, Segurança, Operações e o menu 802' },
      { en: 'Every screen speaks English and Brazilian Portuguese', pt: 'Todas as telas falam inglês e português do Brasil' },
      { en: 'Designed for the phone in your hand and the screen in your suite', pt: 'Pensado para o celular na mão e para a tela da suíte' },
    ],
    note: {
      en: 'Fourteen stops along the promenade, six of them devoted to music. Step off whenever you like.',
      pt: 'Catorze paradas pelo calçadão, seis delas dedicadas à música. Saia quando quiser.',
    },
  },
  /* ---------- Suíte ---------- */
  {
    icon: KeyRound,
    chapter: { en: 'Suite · Keycard', pt: 'Suíte · Cartão-chave' },
    title: { en: 'A leather keycard with two faces', pt: 'Um cartão-chave de couro com duas faces' },
    text: {
      en: 'The stitched keycard at the top of your suite greets you by name. Tap it, or press Enter, and it turns over to reveal your stay folio.',
      pt: 'O cartão-chave costurado no topo da sua suíte recebe você pelo nome. Toque nele, ou pressione Enter, e ele vira para mostrar o registro da sua estadia.',
    },
    points: [
      { en: 'Front: your Marriott Bonvoy® Titanium Elite status and the Suite 802 Key button', pt: 'Frente: seu status Marriott Bonvoy® Titanium Elite e o botão Chave da Suíte 802' },
      { en: 'Back: stay dates, suite assignment, inclusions and your butler’s extension', pt: 'Verso: datas da estadia, acomodação, privilégios inclusos e o ramal do mordomo' },
      { en: 'A gentle nudge reminds you the card can be flipped', pt: 'Um leve movimento lembra que o cartão pode ser virado' },
    ],
    action: { label: { en: 'See my keycard', pt: 'Ver meu cartão' }, run: { kind: 'module', module: 'experience' } },
  },
  {
    icon: BellRing,
    chapter: { en: 'Suite · Hospitality Bar', pt: 'Suíte · Barra de Hospitalidade' },
    title: { en: 'One touch, and the butler is on the way', pt: 'Um toque e o mordomo já está a caminho' },
    text: {
      en: 'The Express Hospitality Bar sends your request straight to the butler and housekeeping teams. A confirmation appears the moment it is dispatched, and the request joins the operations queue.',
      pt: 'A Barra Expressa de Hospitalidade envia seu pedido direto às equipes de mordomia e governança. A confirmação aparece no instante do envio e o pedido entra na fila de operações.',
    },
    points: [
      { en: 'Evening turn-down with pillow mist and chamomile infusion', pt: 'Arrumação noturna com névoa para travesseiro e infusão de camomila' },
      { en: 'Fresh plush towels and a private sommelier to the suite', pt: 'Toalhas felpudas e sommelier particular na suíte' },
      { en: 'Executive valet and chauffeur staged at the ramp', pt: 'Valet executivo e motorista à espera na rampa' },
    ],
    action: { label: { en: 'Go to the bar', pt: 'Ir para a barra' }, run: { kind: 'module', module: 'experience' } },
  },
  {
    icon: Landmark,
    chapter: { en: 'Suite · Heritage', pt: 'Suíte · Patrimônio' },
    title: { en: 'The wave beneath your balcony', pt: 'A onda sob a sua varanda' },
    text: {
      en: 'Your suite page tells the story of Roberto Burle Marx’s 1970 promenade, four kilometres of black and white stone, and opens the doors to the hotel’s private experiences.',
      pt: 'A página da suíte conta a história do calçadão de Roberto Burle Marx, de 1970, quatro quilômetros de pedra preta e branca, e abre as portas para as experiências privadas do hotel.',
    },
    points: [
      { en: 'Presidential Wing: the suite and its oceanfront balcony', pt: 'Ala Presidencial: a suíte e sua varanda de frente para o mar' },
      { en: 'Spa by JW Rituals: cupuaçu, açaí and sound-healing treatments', pt: 'Rituais Spa by JW: tratamentos com cupuaçu, açaí e terapia sonora' },
      { en: 'In-Suite Cellar: a candlelit sunset dinner on your balcony', pt: 'Adega na Suíte: jantar à luz de velas no pôr do sol, na sua varanda' },
    ],
  },
  {
    icon: UtensilsCrossed,
    chapter: { en: 'Gastronomy', pt: 'Gastronomia' },
    title: { en: 'A table at The Carioca, an evening at Baretto-Londra', pt: 'Uma mesa no The Carioca, uma noite no Baretto-Londra' },
    text: {
      en: 'Reserve Chef Amaral’s contemporary Brazilian table or a VIP seat at the jazz lounge, choosing the time and party size in a single form.',
      pt: 'Reserve a mesa contemporânea brasileira do Chef Amaral ou um lugar VIP no lounge de jazz, escolhendo horário e número de pessoas em um só formulário.',
    },
    points: [
      { en: 'Atlantic catch, native herbs and fire-roasting by Chef Amaral', pt: 'Peixes do Atlântico, ervas nativas e brasa pelo Chef Amaral' },
      { en: 'Botanical mixology and live bossa nova trios at night', pt: 'Mixologia botânica e trios de bossa nova ao vivo à noite' },
      { en: 'Your reservation reaches the concierge desk instantly', pt: 'Sua reserva chega na hora ao balcão do concierge' },
    ],
    action: { label: { en: 'Reserve a table', pt: 'Reservar mesa' }, run: { kind: 'modal', modal: 'dining' } },
  },
  /* ---------- Música ---------- */
  {
    icon: Music,
    chapter: { en: 'Carioca Rhythm · Collections', pt: 'Ritmo Carioca · Coleções' },
    title: { en: 'Four soundscapes, twenty-four classics', pt: 'Quatro trilhas, vinte e quatro clássicos' },
    text: {
      en: 'Carioca Rhythm gathers four acoustic collections of six songs each, from Jobim and João Gilberto to Cartola and Adoniran Barbosa. The page turns nocturnal, like a lounge after sunset.',
      pt: 'O Ritmo Carioca reúne quatro coleções acústicas de seis músicas cada, de Jobim e João Gilberto a Cartola e Adoniran Barbosa. A página fica noturna, como um lounge depois do pôr do sol.',
    },
    points: [
      { en: 'Bossa Nova Morning Light: nylon guitar and Atlantic breeze', pt: 'Bossa Nova Morning Light: violão de nylon e brisa do Atlântico' },
      { en: 'Sunset at Arpoador: warm vinyl and golden-hour Rhodes', pt: 'Sunset at Arpoador: vinil quente e Rhodes na hora dourada' },
      { en: 'Lapa Roots Samba and Evening in Ipanema for the night', pt: 'Lapa Roots Samba e Evening in Ipanema para a noite' },
    ],
    note: {
      en: 'Filter by mood with the pills: Morning Light, Arpoador Sunset, Lapa Samba or Ipanema Night.',
      pt: 'Filtre pelo clima com as pílulas: Luz da Manhã, Pôr do Sol, Samba da Lapa ou Noite em Ipanema.',
    },
    action: { label: { en: 'Open Carioca Rhythm', pt: 'Abrir Ritmo Carioca' }, run: { kind: 'module', module: 'rhythm' } },
  },
  {
    icon: Disc3,
    chapter: { en: 'Carioca Rhythm · Turntable', pt: 'Ritmo Carioca · Toca-discos' },
    title: { en: 'Drop the needle on the record', pt: 'Baixe a agulha sobre o disco' },
    text: {
      en: 'The turntable is more than decoration. Tap the vinyl and it spins, the tonearm swings onto the groove and a random song begins playing.',
      pt: 'O toca-discos é mais que decoração. Toque no vinil e ele gira, o braço desce sobre o sulco e uma música aleatória começa a tocar.',
    },
    points: [
      { en: 'The spotlight card shows the pressing, artist, tempo in BPM and musical key', pt: 'O cartão em destaque mostra o disco, o artista, o andamento em BPM e a tonalidade' },
      { en: 'Play / pause and a shuffle button right beside the record', pt: 'Play / pausa e um botão aleatório ao lado do disco' },
      { en: 'When the music stops, the tonearm returns to its rest', pt: 'Quando a música para, o braço volta ao descanso' },
    ],
    action: { label: { en: 'Spin the vinyl', pt: 'Girar o vinil' }, run: { kind: 'module', module: 'rhythm' } },
  },
  {
    icon: Headphones,
    chapter: { en: 'Carioca Rhythm · Streaming', pt: 'Ritmo Carioca · Streaming' },
    title: { en: 'Listen here, or in your own app', pt: 'Ouça aqui ou no seu próprio app' },
    text: {
      en: 'Every collection plays inside the concierge through YouTube Music, with no sign-in. If you prefer your library, open the same collection in the service you already use.',
      pt: 'Cada coleção toca dentro do concierge pelo YouTube Music, sem login. Se preferir sua biblioteca, abra a mesma coleção no serviço que você já usa.',
    },
    points: [
      { en: 'Listen Online: full songs with the in-site player', pt: 'Ouvir Online: músicas completas no player do site' },
      { en: 'Open in YouTube Music, Spotify or Apple Music', pt: 'Abrir no YouTube Music, Spotify ou Apple Music' },
      { en: 'Each service glows in its own brand colour', pt: 'Cada serviço brilha com a cor da sua marca' },
    ],
  },
  {
    icon: Radio,
    chapter: { en: 'Carioca Rhythm · Floating Player', pt: 'Ritmo Carioca · Player flutuante' },
    title: { en: 'The music follows you everywhere', pt: 'A música acompanha você por toda parte' },
    text: {
      en: 'Once a collection starts, a floating player appears and stays with you as you move from the map to safety or dining. It only appears when something is playing.',
      pt: 'Assim que uma coleção começa, surge um player flutuante que segue com você do mapa à segurança ou à gastronomia. Ele só aparece quando algo está tocando.',
    },
    points: [
      { en: 'A compact pill with a spinning platter and play / next controls', pt: 'Uma pílula compacta com um disco girando e controles de play / próxima' },
      { en: 'A gold line traces the pill’s edge as the song progresses', pt: 'Uma linha dourada percorre a borda da pílula conforme a música avança' },
      { en: 'Tap it to expand into the full console, or close it at any time', pt: 'Toque para expandir no console completo ou feche quando quiser' },
    ],
  },
  {
    icon: SlidersHorizontal,
    chapter: { en: 'Carioca Rhythm · Console', pt: 'Ritmo Carioca · Console' },
    title: { en: 'A complete console in your pocket', pt: 'Um console completo no seu bolso' },
    text: {
      en: 'The expanded player is a full listening console, synchronised in real time with YouTube. The music keeps playing when you minimise it.',
      pt: 'O player expandido é um console de audição completo, sincronizado em tempo real com o YouTube. A música continua tocando ao minimizar.',
    },
    points: [
      { en: 'Switch between the four collections without leaving the player', pt: 'Troque entre as quatro coleções sem sair do player' },
      { en: 'Previous, play / pause, next and shuffle within the playlist', pt: 'Anterior, play / pausa, próxima e aleatório dentro da playlist' },
      { en: 'Seek bar, volume with mute, and the next song plays on its own', pt: 'Barra de tempo, volume com mudo e a próxima música toca sozinha' },
    ],
    note: {
      en: 'Minimise the console to the corner and keep exploring with the music on.',
      pt: 'Minimize o console no canto e continue explorando com a música tocando.',
    },
  },
  /* ---------- Cidade e segurança ---------- */
  {
    icon: MapIcon,
    chapter: { en: 'Explore', pt: 'Explorar' },
    title: { en: 'Rio, mapped from your balcony', pt: 'O Rio, mapeado da sua varanda' },
    text: {
      en: 'A daytime vector map of the Zona Sul with five landmarks, from Forte de Copacabana to Santa Teresa, each with its distance from the hotel and the best window to visit.',
      pt: 'Um mapa vetorial diurno da Zona Sul com cinco marcos, do Forte de Copacabana a Santa Teresa, cada um com a distância do hotel e o melhor horário para visitar.',
    },
    points: [
      { en: 'Switch between the light map and the hybrid view', pt: 'Alterne entre o mapa claro e a vista híbrida' },
      { en: 'A concierge protocol note for every destination', pt: 'Uma orientação do concierge para cada destino' },
      { en: 'Schedule a Mercedes-Benz chauffeur to any landmark', pt: 'Agende um motorista Mercedes-Benz para qualquer marco' },
    ],
    action: { label: { en: 'Open the map', pt: 'Abrir o mapa' }, run: { kind: 'module', module: 'explore' } },
  },
  {
    icon: ShieldCheck,
    chapter: { en: 'Safety 24/7', pt: 'Segurança 24/7' },
    title: { en: 'Calm, because help is one tap away', pt: 'Tranquilidade, porque a ajuda está a um toque' },
    text: {
      en: 'Verified emergency numbers, Posto 5 beachfront etiquette and a direct line to every hotel department, gathered on one screen.',
      pt: 'Números de emergência verificados, etiqueta da orla do Posto 5 e linha direta com cada departamento do hotel, reunidos em uma só tela.',
    },
    points: [
      { en: 'BPTur Tourist Police, Military Police 190 and SAMU 192', pt: 'Polícia do Turismo BPTur, Polícia Militar 190 e SAMU 192' },
      { en: 'Your dedicated butler at Ext. 99, day and night', pt: 'Seu mordomo dedicado no Ramal 99, dia e noite' },
      { en: 'Bilingual operators on every hotline', pt: 'Atendentes bilíngues em todas as linhas' },
    ],
    action: { label: { en: 'See safety contacts', pt: 'Ver contatos de segurança' }, run: { kind: 'module', module: 'safety' } },
  },
  /* ---------- Operações ---------- */
  {
    icon: LayoutDashboard,
    chapter: { en: 'Operations', pt: 'Operações' },
    title: { en: 'Behind the scenes, in real time', pt: 'Os bastidores, em tempo real' },
    text: {
      en: 'The staff console shows suite occupancy and the dispatch queue. Every request you send from the guest side lands there, ready to move from pending to completed.',
      pt: 'O console da equipe mostra a ocupação das suítes e a fila de despacho. Cada pedido feito pelo hóspede chega ali, pronto para avançar de pendente a concluído.',
    },
    points: [
      { en: 'Kanban board or list view for the dispatch queue', pt: 'Quadro kanban ou lista para a fila de despacho' },
      { en: 'Broadcast a message to every active suite', pt: 'Envie um aviso para todas as suítes ativas' },
      { en: 'Generate the Suite Key QR, ready for Apple or Google Wallet', pt: 'Gere a Chave QR da suíte, pronta para Apple ou Google Wallet' },
    ],
    note: {
      en: 'This is a demo: use Instant Demo Access, or the passcode jw2026.',
      pt: 'Esta é uma demonstração: use o Acesso Demo Instantâneo ou a senha jw2026.',
    },
    action: { label: { en: 'Open the console', pt: 'Abrir o console' }, run: { kind: 'admin' } },
  },
  /* ---------- Menu ---------- */
  {
    icon: Search,
    chapter: { en: 'Menu 802 & Languages', pt: 'Menu 802 & Idiomas' },
    title: { en: 'Ask the menu, and it takes you there', pt: 'Pergunte ao menu e ele leva você até lá' },
    text: {
      en: 'The 802 button at the top opens your concierge card: every module, quick access to dining and chauffeur, and a search that understands what you are looking for.',
      pt: 'O botão 802 no topo abre seu cartão de concierge: todos os módulos, acesso rápido a gastronomia e motorista, e uma busca que entende o que você procura.',
    },
    points: [
      { en: 'Type “bossa”, “valet” or “Posto 5” and go straight there', pt: 'Digite “bossa”, “valet” ou “Posto 5” e vá direto' },
      { en: 'Hotel announcements and pending requests appear on the same card', pt: 'Os avisos do hotel e os pedidos pendentes aparecem no mesmo cartão' },
      { en: 'Switch EN / PT at any moment from the top bar, or right here', pt: 'Troque EN / PT a qualquer momento na barra superior, ou aqui mesmo' },
    ],
    note: {
      en: 'You can walk this promenade again from the 802 menu or the footer: “Concierge Guide”.',
      pt: 'Você pode refazer este passeio pelo menu 802 ou pelo rodapé: “Guia do Concierge”.',
    },
  },
];

/* Onda de Burle Marx: cada tramo entre Postos es media onda exacta, así el largo del trazo
   crece en proporción al paso y el relleno coincide con cada estación. */
const WAVE_W = 1000;
const WAVE_H = 40;
const WAVE_PAD = 16;
const WAVE_AMP = 9;
const stationX = (i: number) => WAVE_PAD + (i * (WAVE_W - WAVE_PAD * 2)) / (STEPS.length - 1);
const stationY = (i: number) => WAVE_H / 2 + (i % 2 === 0 ? -WAVE_AMP : WAVE_AMP);
const WAVE_PATH = STEPS.slice(1)
  .map((_, i) => {
    const x0 = stationX(i);
    const x1 = stationX(i + 1);
    const third = (x1 - x0) / 3;
    return `C${x0 + third} ${stationY(i)} ${x1 - third} ${stationY(i + 1)} ${x1} ${stationY(i + 1)}`;
  })
  .reduce((d, seg) => `${d} ${seg}`, `M${stationX(0)} ${stationY(0)}`);

export const ConciergeTour: React.FC = () => {
  const { language, setLanguage, setActiveModule, setActiveModal, setAdminActiveTab } = useConcierge();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<Element | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const lang = language;
  const s = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const Icon = s.icon;

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    // Si otro modal nativo está abierto (reserva, valet...), espera a que se cierre.
    const other = Array.from(document.querySelectorAll('dialog[open]')).find((d) => d !== dialog);
    if (other) {
      other.addEventListener('close', () => window.setTimeout(open, 300), { once: true });
      return;
    }
    openerRef.current = document.activeElement;
    setStep(0);
    setIsOpen(true);
    try {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } catch {
      dialog.setAttribute('open', '');
    }
  }, []);

  const close = useCallback((restoreFocus = true) => {
    const dialog = dialogRef.current;
    if (dialog?.open && typeof dialog.close === 'function') dialog.close();
    else dialog?.removeAttribute('open');
    setIsOpen(false);
    const opener = openerRef.current as HTMLElement | null;
    if (restoreFocus && opener && document.contains(opener)) opener.focus();
  }, []);

  // Entradas: evento global (menú 802, pie de página) y primer ingreso de la sesión.
  useEffect(() => {
    window.addEventListener(OPEN_EVENT, open);
    let alreadyInSite = false;
    try {
      alreadyInSite = Boolean(sessionStorage.getItem(SESSION_KEY));
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* almacenamiento bloqueado: se muestra igual */
    }
    const timer =
      !alreadyInSite && import.meta.env.MODE !== 'test' ? window.setTimeout(open, AUTO_OPEN_DELAY) : 0;
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.clearTimeout(timer);
    };
  }, [open]);

  // Cada cambio de Posto vuelve el texto al inicio.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [step]);

  // Al abrir, el foco va a "Siguiente".
  useEffect(() => {
    if (isOpen) nextRef.current?.focus();
  }, [isOpen]);

  const go = (index: number, focus: 'next' | 'prev' | 'none' = 'next') => {
    if (index < 0 || index >= STEPS.length || index === step) return;
    setStep(index);
    requestAnimationFrame(() => {
      if (focus === 'next') nextRef.current?.focus();
      if (focus === 'prev') (index === 0 ? nextRef.current : prevRef.current)?.focus();
    });
  };

  const runAction = (action: TourAction) => {
    close(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (action.kind === 'module') setActiveModule(action.module, true);
    if (action.kind === 'admin') {
      setAdminActiveTab('all');
      setActiveModule('management', true);
    }
    // El modal se abre cuando la guía ya cerró (dos <dialog> modales no conviven bien).
    if (action.kind === 'modal') window.setTimeout(() => setActiveModal(action.modal), 60);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if ((event.target as HTMLElement).closest('input, select, textarea')) return;
    const onStation = Boolean((event.target as HTMLElement).closest('[data-station]'));
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(step + 1, onStation ? 'none' : 'next');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(step - 1, onStation ? 'none' : 'prev');
    }
  };

  const copy = {
    guide: lang === 'en' ? 'Concierge Guide' : 'Guia do Concierge',
    posto: lang === 'en' ? 'Posto' : 'Posto',
    of: lang === 'en' ? 'of' : 'de',
    close: lang === 'en' ? 'Close guide' : 'Fechar guia',
    skip: lang === 'en' ? 'Skip guide' : 'Pular guia',
    prev: lang === 'en' ? 'Previous stop' : 'Parada anterior',
    next: lang === 'en' ? 'Next stop' : 'Próxima parada',
    finish: lang === 'en' ? 'Begin my stay' : 'Começar minha estadia',
    signature: lang === 'en' ? 'Your JW Concierge' : 'Seu Concierge JW',
    stations: lang === 'en' ? 'Guide stops' : 'Paradas da guia',
    language: lang === 'en' ? 'Guide language' : 'Idioma da guia',
  };
  const pad = (n: number) => String(n).padStart(2, '0');
  const progress = step / (STEPS.length - 1);

  return (
    <dialog
      ref={dialogRef}
      className="cg-dialog"
      aria-labelledby="cg-title"
      aria-describedby="cg-text"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={onKeyDown}
    >
      {isOpen && (
        <div className="cg-shell">
          {/* Panel nocturno: medallón, numeral del Posto y capítulo. */}
          <aside className="cg-aside" aria-hidden="true">
            <div className="cg-aside__inner" key={`aside-${step}`}>
              <span className="cg-medallion">
                <Icon className="cg-medallion__icon" />
              </span>
              <span className="cg-numeral">{pad(step + 1)}</span>
              <span className="cg-aside__chapter">{s.chapter[lang]}</span>
            </div>
            <img className="cg-aside__crest" src="/assets/jw-marriott-logo.png" alt="" />
          </aside>

          <div className="cg-main">
            <header className="cg-head">
              <p className="cg-eyebrow">
                <Compass className="cg-eyebrow__icon" aria-hidden="true" />
                <span>
                  {copy.guide} · {copy.posto} {step + 1} {copy.of} {STEPS.length}
                </span>
              </p>
              <div className="cg-tools">
                <div className="cg-lang" role="group" aria-label={copy.language}>
                  {(['en', 'pt'] as Language[]).map((code) => (
                    <button
                      key={code}
                      type="button"
                      className="cg-lang__btn"
                      aria-pressed={lang === code}
                      aria-label={code === 'en' ? 'English' : 'Português'}
                      onClick={() => setLanguage(code)}
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button type="button" className="cg-close" onClick={() => close()} aria-label={copy.close} title={copy.close}>
                  <X aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="cg-body" ref={bodyRef}>
              <div className="cg-content" key={`content-${step}`}>
                <p className="cg-chapter">{s.chapter[lang]}</p>
                <h2 id="cg-title" className="cg-title">
                  {s.title[lang]}
                </h2>
                <p id="cg-text" className="cg-text">
                  {s.text[lang]}
                </p>
                <ul className="cg-points" role="list">
                  {s.points.map((point, i) => (
                    <li key={i}>
                      <span className="cg-points__mark" aria-hidden="true" />
                      <span>{point[lang]}</span>
                    </li>
                  ))}
                </ul>
                {s.note && (
                  <blockquote className="cg-note">
                    <p>{s.note[lang]}</p>
                    <footer>{copy.signature}</footer>
                  </blockquote>
                )}
                {s.action && (
                  <button type="button" className="cg-goto" onClick={() => runAction(s.action!.run)}>
                    <span>{s.action.label[lang]}</span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <footer className="cg-foot">
            {/* Calçadão: la onda se llena hasta el Posto actual; cada estación lleva a su paso. */}
            <div className="cg-promenade" role="group" aria-label={copy.stations}>
              <svg className="cg-wave" viewBox={`0 0 ${WAVE_W} ${WAVE_H}`} preserveAspectRatio="none" aria-hidden="true">
                <path className="cg-wave__track" d={WAVE_PATH} pathLength={1} />
                <path className="cg-wave__fill" d={WAVE_PATH} pathLength={1} style={{ strokeDashoffset: 1 - progress }} />
              </svg>
              {STEPS.map((station, i) => (
                <button
                  key={i}
                  type="button"
                  data-station
                  className="cg-station"
                  style={{ left: `${(stationX(i) / WAVE_W) * 100}%`, top: `${(stationY(i) / WAVE_H) * 100}%` }}
                  aria-current={i === step ? 'step' : undefined}
                  data-done={i < step || undefined}
                  aria-label={`${copy.posto} ${i + 1}: ${station.title[lang]}`}
                  onClick={() => go(i, 'none')}
                />
              ))}
            </div>

            <div className="cg-actions">
              <button type="button" className="cg-skip" onClick={() => close()}>
                {copy.skip}
              </button>
              <div className="cg-nav">
                {step > 0 && (
                  <button
                    ref={prevRef}
                    type="button"
                    className="cg-prev"
                    onClick={() => go(step - 1, 'prev')}
                    aria-label={copy.prev}
                    title={copy.prev}
                  >
                    <ArrowLeft aria-hidden="true" />
                  </button>
                )}
                <button
                  ref={nextRef}
                  type="button"
                  className={`cg-next${isLast ? ' cg-next--finish' : ''}`}
                  onClick={() => (isLast ? close() : go(step + 1))}
                >
                  <span>{isLast ? copy.finish : copy.next}</span>
                  {!isLast && <ArrowRight aria-hidden="true" />}
                </button>
              </div>
            </div>
          </footer>
        </div>
      )}
    </dialog>
  );
};
