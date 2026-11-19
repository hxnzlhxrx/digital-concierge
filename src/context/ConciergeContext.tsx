import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, ModuleId, ModalType, translations, TranslationSchema } from '../i18n/translations';

export type RequestStatus = 'pending' | 'in_progress' | 'completed';

export interface ServiceRequest {
  id: string;
  suite: string;
  guestName: string;
  category: 'Amenity' | 'Dining' | 'Chauffeur' | 'Housekeeping' | 'Security' | 'Spa';
  title: string;
  details: string;
  timestamp: string;
  status: RequestStatus;
  priority: 'VIP Titanium' | 'Standard' | 'Immediate';
}

export interface SoundscapeSong {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
  youtubeVideoId: string;
}

export interface SoundscapeTrack {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  category: 'morning' | 'sunset' | 'samba' | 'lounge';
  duration: string;
  durationSec: number;
  bpm: string;
  keySignature: string;
  coverImage: string;
  spotifyUrl: string;
  youtubeUrl: string;
  appleUrl: string;
  spotifyEmbedUrl: string;
  youtubeEmbedUrl: string;
  appleEmbedUrl: string;
  descriptionEn: string;
  descriptionPt: string;
  songs: SoundscapeSong[];
}

export interface AdminUser {
  name: string;
  role: string;
  email: string;
}

export const SOUNDSCAPE_COLLECTIONS: SoundscapeTrack[] = [
  {
    id: 'bossa-morning',
    title: 'Bossa Nova Morning Light',
    subtitle: 'Sunlit Nylon Guitar & Atlantic Breeze',
    artist: 'João & Astrud Acoustic Ensemble · Posto 5 Sessions',
    category: 'morning',
    duration: '04:18',
    durationSec: 258,
    bpm: '72 BPM',
    keySignature: 'F Major 7',
    coverImage: '/assets/spanish-guitar-terrace.png',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1EIhDXnCBCnVi9',
    youtubeUrl: 'https://music.youtube.com/playlist?list=PLPabdEIQxVqAuGRr1o7PG8wfq0fHJZNwa',
    appleUrl: 'https://music.apple.com/br/playlist/bossa-nova-lounge/pl.4c6905cc01094522abf4ad746ea745dc',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1EIhDXnCBCnVi9?utm_source=generator&theme=0',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/8mcsaEqrbfU?playlist=8mcsaEqrbfU,E1tOV7y94DY,fE4Ks8Aj934,W-YnyZG8fNU,EQC4Ye7hr9Y,JGqzKmp_5Bg&autoplay=1&enablejsapi=1',
    appleEmbedUrl: 'https://embed.music.apple.com/br/playlist/bossa-nova-lounge/pl.4c6905cc01094522abf4ad746ea745dc',
    descriptionEn:
      'Recorded on a sunlit Copacabana penthouse terrace with vintage nylon-string classical guitars and brushed percussion.',
    descriptionPt:
      'Gravado em um terraço ensolarado de cobertura em Copacabana com violões clássicos de cordas de nylon e percussão suave.',
    songs: [
      {
        id: 'bossa-1',
        title: 'Garota de Ipanema',
        artist: 'Antônio Carlos Jobim & Vinicius de Moraes',
        duration: '03:42',
        durationSec: 222,
        youtubeVideoId: '8mcsaEqrbfU',
      },
      {
        id: 'bossa-2',
        title: 'Águas de Março',
        artist: 'Elis Regina & Tom Jobim',
        duration: '03:32',
        durationSec: 212,
        youtubeVideoId: 'E1tOV7y94DY',
      },
      {
        id: 'bossa-3',
        title: 'Desafinado',
        artist: 'João Gilberto',
        duration: '02:44',
        durationSec: 164,
        youtubeVideoId: 'fE4Ks8Aj934',
      },
      {
        id: 'bossa-4',
        title: 'Corcovado (Quiet Nights)',
        artist: 'Astrud Gilberto & Stan Getz',
        duration: '04:15',
        durationSec: 255,
        youtubeVideoId: 'W-YnyZG8fNU',
      },
      {
        id: 'bossa-5',
        title: 'Chega de Saudade',
        artist: 'João Gilberto',
        duration: '02:01',
        durationSec: 121,
        youtubeVideoId: 'EQC4Ye7hr9Y',
      },
      {
        id: 'bossa-6',
        title: 'Wave',
        artist: 'Antônio Carlos Jobim',
        duration: '02:56',
        durationSec: 176,
        youtubeVideoId: 'JGqzKmp_5Bg',
      },
    ],
  },
  {
    id: 'sunset-arpoador',
    title: 'Sunset at Arpoador',
    subtitle: 'Warm Analog Vinyl & Golden Hour Rhodes',
    artist: 'Quarteto Atlântica · Vinyl Master 180g',
    category: 'sunset',
    duration: '05:12',
    durationSec: 312,
    bpm: '68 BPM',
    keySignature: 'D Minor 9',
    coverImage: '/assets/bossa-vinyl-turntable.png',
    spotifyUrl: 'https://open.spotify.com/playlist/06GRuE6iFANfdy14J9YrL0',
    youtubeUrl: 'https://music.youtube.com/watch?v=SDcCVmshCzw',
    appleUrl: 'https://music.apple.com/br/playlist/mpb-dos-anos-60-essenciais/pl.5b4e39b4e8d740cc9a49c6477c7bbc71',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/06GRuE6iFANfdy14J9YrL0?utm_source=generator&theme=0',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/SDcCVmshCzw?playlist=SDcCVmshCzw,bMobOTY1pps,hg0XftC43Zo,0QrJ3XH-ujU,sN_qH0U5Pec,ly-Gzbd1eI0&autoplay=1&enablejsapi=1',
    appleEmbedUrl: 'https://embed.music.apple.com/br/playlist/mpb-dos-anos-60-essenciais/pl.5b4e39b4e8d740cc9a49c6477c7bbc71',
    descriptionEn:
      'Spun from rare 1960s Brazilian analog pressings celebrating the applause of the golden hour over Pedra do Arpoador.',
    descriptionPt:
      'Extraído de prensagens analógicas brasileiras raras dos anos 1960 celebrando o aplauso do pôr do sol na Pedra do Arpoador.',
    songs: [
      {
        id: 'sunset-1',
        title: 'Samba de Verão (So Nice)',
        artist: 'Marcos Valle',
        duration: '03:08',
        durationSec: 188,
        youtubeVideoId: 'SDcCVmshCzw',
      },
      {
        id: 'sunset-2',
        title: 'Tarde em Itapoã',
        artist: 'Toquinho & Vinicius de Moraes',
        duration: '04:14',
        durationSec: 254,
        youtubeVideoId: 'bMobOTY1pps',
      },
      {
        id: 'sunset-3',
        title: 'Mas que Nada',
        artist: 'Jorge Ben Jor',
        duration: '03:02',
        durationSec: 182,
        youtubeVideoId: 'hg0XftC43Zo',
      },
      {
        id: 'sunset-4',
        title: 'O Barquinho',
        artist: 'Roberto Menescal & Nara Leão',
        duration: '02:35',
        durationSec: 155,
        youtubeVideoId: '0QrJ3XH-ujU',
      },
      {
        id: 'sunset-5',
        title: 'Manhã de Carnaval',
        artist: 'Luiz Bonfá',
        duration: '04:02',
        durationSec: 242,
        youtubeVideoId: 'FNK-OaWhwGU',
      },
      {
        id: 'sunset-6',
        title: 'Eu Sei Que Vou Te Amar',
        artist: 'Vinicius de Moraes',
        duration: '03:15',
        durationSec: 195,
        youtubeVideoId: 'ly-Gzbd1eI0',
      },
    ],
  },
  {
    id: 'lapa-roots-samba',
    title: 'Lapa Roots Samba',
    subtitle: 'Historic Arcos da Lapa Acoustic Heritage',
    artist: 'Velha Guarda da Lapa & Cavaquinho Trio',
    category: 'samba',
    duration: '03:54',
    durationSec: 234,
    bpm: '96 BPM',
    keySignature: 'G Major 6',
    coverImage: '/assets/lapa-nightlife.png',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWTUHOvJwQIMp',
    youtubeUrl: 'https://music.youtube.com/watch?v=56mu8KSUYqk',
    appleUrl: 'https://music.apple.com/br/playlist/samba-de-raiz-samba-antigo/pl.ddb84f7d9a944accb8ef24e7ba1b8de4',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWTUHOvJwQIMp?utm_source=generator&theme=0',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/56mu8KSUYqk?playlist=56mu8KSUYqk,pBWg7LGETL0,ud9PlROstDw,xIQsCtJD-mA,RkkGVgOqPuM,DwsKhZLj01M&autoplay=1&enablejsapi=1',
    appleEmbedUrl: 'https://embed.music.apple.com/br/playlist/samba-de-raiz-samba-antigo/pl.ddb84f7d9a944accb8ef24e7ba1b8de4',
    descriptionEn:
      'Intimate acoustic samba-canção echoing beneath the historic colonial aqueduct of Lapa with 7-string guitar and pandeiro.',
    descriptionPt:
      'Samba-canção acústico intimista ecoando sob os históricos Arcos da Lapa com violão de 7 cordas e pandeiro artesanal.',
    songs: [
      {
        id: 'samba-1',
        title: 'Preciso Me Encontrar',
        artist: 'Cartola',
        duration: '02:58',
        durationSec: 178,
        youtubeVideoId: '56mu8KSUYqk',
      },
      {
        id: 'samba-2',
        title: 'As Rosas Não Falam',
        artist: 'Cartola',
        duration: '02:53',
        durationSec: 173,
        youtubeVideoId: 'pBWg7LGETL0',
      },
      {
        id: 'samba-3',
        title: 'O Mundo É Um Moinho',
        artist: 'Cartola',
        duration: '03:54',
        durationSec: 234,
        youtubeVideoId: 'ud9PlROstDw',
      },
      {
        id: 'samba-4',
        title: 'Foi Um Rio Que Passou em Minha Vida',
        artist: 'Paulinho da Viola',
        duration: '04:32',
        durationSec: 272,
        youtubeVideoId: 'xIQsCtJD-mA',
      },
      {
        id: 'samba-5',
        title: 'Trem das Onze',
        artist: 'Adoniran Barbosa',
        duration: '02:50',
        durationSec: 170,
        youtubeVideoId: 'RkkGVgOqPuM',
      },
      {
        id: 'samba-6',
        title: 'Não Deixe o Samba Morrer',
        artist: 'Alcione',
        duration: '04:20',
        durationSec: 260,
        youtubeVideoId: 'DwsKhZLj01M',
      },
    ],
  },
  {
    id: 'evening-ipanema',
    title: 'Evening in Ipanema',
    subtitle: 'Late-Night Lounge & Tenor Saxophone',
    artist: 'Baretto-Londra Midnight Trio',
    category: 'lounge',
    duration: '06:05',
    durationSec: 365,
    bpm: '64 BPM',
    keySignature: 'Bb Major 7',
    coverImage: '/assets/baretto-londra-lounge.png',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4wta20PHgwo',
    youtubeUrl: 'https://music.youtube.com/watch?v=SDcCVmshCzw',
    appleUrl: 'https://music.apple.com/us/playlist/late-night-jazz/pl.ee13f1f8d7864ed6ac747ae8a28f603c',
    spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4wta20PHgwo?utm_source=generator&theme=0',
    youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/SDcCVmshCzw?playlist=SDcCVmshCzw,U7eOs5lERww,_Tt7w1yhHPc,0xNO4NjTnfM,VEsmqOOKmmU,pNWpquMzJSY&autoplay=1&enablejsapi=1',
    appleEmbedUrl: 'https://embed.music.apple.com/us/playlist/late-night-jazz/pl.ee13f1f8d7864ed6ac747ae8a28f603c',
    descriptionEn:
      'Velvety tenor saxophone, upright acoustic bass, and Steinway grand piano curated for twilight cocktails.',
    descriptionPt:
      'Saxofone tenor aveludado, contrabaixo acústico e piano de cauda Steinway curados para coquetéis ao anoitecer.',
    songs: [
      {
        id: 'lounge-1',
        title: 'Midnight Bossa Lounge',
        artist: 'Baretto-Londra Midnight Trio',
        duration: '04:45',
        durationSec: 285,
        youtubeVideoId: 'SDcCVmshCzw',
      },
      {
        id: 'lounge-2',
        title: 'Blue Bossa',
        artist: 'Dexter Gordon',
        duration: '05:20',
        durationSec: 320,
        youtubeVideoId: 'U7eOs5lERww',
      },
      {
        id: 'lounge-3',
        title: 'Insensatez (How Insensitive)',
        artist: 'Tom Jobim',
        duration: '03:46',
        durationSec: 226,
        youtubeVideoId: '_Tt7w1yhHPc',
      },
      {
        id: 'lounge-4',
        title: 'Samba do Avião',
        artist: 'Tom Jobim',
        duration: '02:48',
        durationSec: 168,
        youtubeVideoId: '0xNO4NjTnfM',
      },
      {
        id: 'lounge-5',
        title: 'Lôbo Bobo',
        artist: 'Carlos Lyra',
        duration: '02:12',
        durationSec: 132,
        youtubeVideoId: 'VEsmqOOKmmU',
      },
      {
        id: 'lounge-6',
        title: 'Triste',
        artist: 'Elis Regina',
        duration: '02:40',
        durationSec: 160,
        youtubeVideoId: 'pNWpquMzJSY',
      },
    ],
  },
];

const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'REQ-802-01',
    suite: 'Suite 802',
    guestName: 'John Doe',
    category: 'Dining',
    title: 'The Carioca by Chef Amaral — Tasting Table',
    details: '2 Guests · 20:30 BRT · Oceanfront Window · Grand Cru Sommelier Pairing',
    timestamp: '10 mins ago',
    status: 'in_progress',
    priority: 'VIP Titanium',
  },
  {
    id: 'REQ-802-02',
    suite: 'Suite 802',
    guestName: 'John Doe',
    category: 'Amenity',
    title: 'Evening Turn-Down & Egyptian Linen Refresh',
    details: 'Hypoallergenic goose-down pillows + Chamomile tea service at 21:00',
    timestamp: '22 mins ago',
    status: 'pending',
    priority: 'VIP Titanium',
  },
  {
    id: 'REQ-901-03',
    suite: 'Suite 901',
    guestName: 'Elena Rostova',
    category: 'Chauffeur',
    title: 'Mercedes-Benz S-Class Luxury Chauffeur · Museu do Amanhã',
    details: 'Private Cultural Route via Porto Maravilha · Bilingual Private Chauffeur',
    timestamp: '35 mins ago',
    status: 'completed',
    priority: 'VIP Titanium',
  },
  {
    id: 'REQ-704-04',
    suite: 'Suite 704',
    guestName: 'Henrique Vasconcelos',
    category: 'Spa',
    title: 'Spa by JW — Amazonian Clay & Ocean Stone Ritual',
    details: 'Couples Suite · 17:00 BRT · Aromatherapy preparation',
    timestamp: '48 mins ago',
    status: 'in_progress',
    priority: 'Standard',
  },
];

interface ConciergeContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
  activeModule: ModuleId;
  setActiveModule: (mod: ModuleId, withSkeleton?: boolean) => void;
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  skeletonMode: boolean;
  setSkeletonMode: (val: boolean) => void;
  triggerTemporarySkeleton: (ms?: number) => void;
  requests: ServiceRequest[];
  addRequest: (req: Omit<ServiceRequest, 'id' | 'timestamp' | 'status' | 'suite' | 'guestName'>) => void;
  advanceRequestStatus: (id: string) => void;
  broadcastMessage: string | null;
  sendBroadcast: (msg: string) => void;
  dismissBroadcast: () => void;
  toastNotification: string | null;
  showToast: (msg: string) => void;
  // Audio Player (Sticky Player only visible when a playlist is actively playing)
  currentTrack: SoundscapeTrack;
  currentSongIndex: number;
  currentSong: SoundscapeSong;
  isPlaying: boolean;
  isPlayerVisible: boolean;
  progressSec: number;
  volume: number;
  suiteCastActive: boolean;
  selectTrack: (track: SoundscapeTrack) => void;
  nextSong: () => void;
  prevSong: () => void;
  shuffleSong: () => void;
  selectSongIndex: (idx: number) => void;
  togglePlay: () => void;
  closePlayer: () => void;
  setProgressSec: React.Dispatch<React.SetStateAction<number>>;
  setVolume: (vol: number) => void;
  toggleSuiteCast: () => void;
  // Suite Auth
  confirmationCode: string;
  suiteNumber: string;
  qrTokenHash: string;
  refreshQrPass: (conf: string, suite: string) => void;
  // Administration Dashboard & Staff Authentication
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  adminActiveTab: 'all' | 'ops' | 'keys';
  setAdminActiveTab: (tab: 'all' | 'ops' | 'keys') => void;
  loginAdmin: (email?: string, password?: string) => boolean;
  logoutAdmin: () => void;
}

const ConciergeContext = createContext<ConciergeContextValue | undefined>(undefined);

export const ConciergeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeModuleState, setActiveModuleState] = useState<ModuleId>('experience');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [skeletonMode, setSkeletonMode] = useState<boolean>(false);
  const [requests, setRequests] = useState<ServiceRequest[]>(INITIAL_REQUESTS);
  const [broadcastMessage, setBroadcastMessage] = useState<string | null>(
    'Golden Hour Veuve Clicquot Sabrage Ritual begins at 17:45 on the Rooftop Infinity Terrace.'
  );
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Audio player state — Sticky player starts hidden until a playlist is played!
  // Initialize with a randomized soundscape collection (e.g. Sunset at Arpoador, Lapa Roots Samba, or Evening in Ipanema)
  // so the player never repetitively defaults to track 0 (Bossa Nova Morning Light)
  const [currentTrack, setCurrentTrack] = useState<SoundscapeTrack>(() => {
    const nonBossaTracks = SOUNDSCAPE_COLLECTIONS.filter((t) => t.id !== 'bossa-morning');
    const randomIndex = Math.floor(Math.random() * nonBossaTracks.length);
    return nonBossaTracks[randomIndex] || SOUNDSCAPE_COLLECTIONS[1];
  });
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(false);
  const [progressSec, setProgressSec] = useState<number>(0);
  const [volume, setVolume] = useState<number>(82);
  const [suiteCastActive, setSuiteCastActive] = useState<boolean>(true);

  const playlistSongs: SoundscapeSong[] = currentTrack.songs || [];
  const currentSong: SoundscapeSong = playlistSongs[currentSongIndex] || {
    id: currentTrack.id,
    title: currentTrack.title,
    artist: currentTrack.artist,
    duration: currentTrack.duration,
    durationSec: currentTrack.durationSec,
    youtubeVideoId: playlistSongs[0]?.youtubeVideoId || '8mcsaEqrbfU',
  };

  const nextSong = useCallback(() => {
    const total = currentTrack.songs?.length || 1;
    setCurrentSongIndex((prev) => (prev + 1) % total);
    setProgressSec(0);
  }, [currentTrack.songs]);

  const prevSong = useCallback(() => {
    const total = currentTrack.songs?.length || 1;
    setCurrentSongIndex((prev) => (prev - 1 + total) % total);
    setProgressSec(0);
  }, [currentTrack.songs]);

  const shuffleSong = useCallback(() => {
    const total = currentTrack.songs?.length || 1;
    if (total > 1) {
      setCurrentSongIndex((prev) => {
        const candidates = Array.from({ length: total }, (_, i) => i).filter((i) => i !== prev);
        return candidates[Math.floor(Math.random() * candidates.length)];
      });
      setProgressSec(0);
    }
  }, [currentTrack.songs]);

  const selectSongIndex = useCallback((idx: number) => {
    const total = currentTrack.songs?.length || 1;
    if (idx >= 0 && idx < total) {
      setCurrentSongIndex(idx);
      setProgressSec(0);
    }
  }, [currentTrack.songs]);

  // Suite auth state
  const [confirmationCode, setConfirmationCode] = useState<string>('JWM-RIO-802941');
  const [suiteNumber, setSuiteNumber] = useState<string>('Suite 802');
  const [qrTokenHash, setQrTokenHash] = useState<string>('BONVOY-802-E7A9-44C1-2026');

  // Administration Dashboard & Staff Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminActiveTab, setAdminActiveTab] = useState<'all' | 'ops' | 'keys'>('all');

  const loginAdmin = (email = 'concierge.admin@marriott.com', password = 'jw2026') => {
    const validEmail = email.trim() || 'concierge.admin@marriott.com';
    const trimmedPw = password.trim();
    // Accept standard demo passwords ('jw2026', 'admin', 'marriott', or non-empty demo submissions)
    if (!trimmedPw || trimmedPw === 'jw2026' || trimmedPw === 'admin' || trimmedPw === 'marriott' || trimmedPw.length >= 4) {
      setIsAdminAuthenticated(true);
      setAdminUser({
        name: 'Carlos Mendoza',
        role: 'Chief Concierge & Operations Director',
        email: validEmail,
      });
      showToast(
        language === 'en'
          ? 'Authenticated: Welcome to Administration Dashboard'
          : 'Autenticado: Bem-vindo ao Painel de Administração'
      );
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    showToast(
      language === 'en'
        ? 'Signed out of Administration Console'
        : 'Sessão administrativa encerrada'
    );
  };

  const showToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification((prev) => (prev === msg ? null : prev));
    }, 4200);
  };

  const triggerTemporarySkeleton = (ms = 650) => {
    setSkeletonMode(true);
    setTimeout(() => {
      setSkeletonMode(false);
    }, ms);
  };

  const setActiveModule = (mod: ModuleId, withSkeleton = false) => {
    setActiveModuleState(mod);
    if (withSkeleton) {
      triggerTemporarySkeleton(420);
    }
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        // Fallback for environments where smooth scrolling is unhandled
        window.scrollTo(0, 0);
      }
    }
  };

  const addRequest = (req: Omit<ServiceRequest, 'id' | 'timestamp' | 'status' | 'suite' | 'guestName'>) => {
    const newReq: ServiceRequest = {
      ...req,
      id: `REQ-802-${Math.floor(10 + Math.random() * 89)}`,
      suite: suiteNumber,
      guestName: 'John Doe',
      timestamp: 'Just now',
      status: 'pending',
    };
    setRequests((prev) => [newReq, ...prev]);
    showToast(
      language === 'en'
        ? `Dispatched to Concierge: ${req.title}`
        : `Enviado ao Concierge: ${req.title}`
    );
  };

  const advanceRequestStatus = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const nextStatus: RequestStatus =
          r.status === 'pending' ? 'in_progress' : r.status === 'in_progress' ? 'completed' : 'pending';
        return { ...r, status: nextStatus };
      })
    );
  };

  const sendBroadcast = (msg: string) => {
    if (!msg.trim()) return;
    setBroadcastMessage(msg.trim());
    showToast(
      language === 'en'
        ? 'Priority Broadcast transmitted to all active suites'
        : 'Comunicado prioritário transmitido para todas as suítes'
    );
  };

  const dismissBroadcast = () => setBroadcastMessage(null);

  const selectTrack = (track: SoundscapeTrack) => {
    setCurrentTrack(track);
    setCurrentSongIndex(0);
    setProgressSec(0);
    setIsPlaying(true);
    setIsPlayerVisible(true);
    showToast(
      language === 'en'
        ? `Now Playing in ${suiteNumber}: ${track.title}`
        : `Tocando na ${suiteNumber}: ${track.title}`
    );
  };

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        setIsPlayerVisible(true);
      }
      return next;
    });
  };

  const closePlayer = () => {
    setIsPlaying(false);
    setIsPlayerVisible(false);
  };

  const toggleSuiteCast = () => {
    setSuiteCastActive((prev) => {
      const next = !prev;
      showToast(
        next
          ? language === 'en'
            ? 'Online High-Fidelity Audio Enabled'
            : 'Áudio Online de Alta Fidelidade Ativado'
          : language === 'en'
          ? 'Online Audio Synthesizer Muted'
          : 'Sintetizador de Áudio Online Silenciado'
      );
      return next;
    });
  };

  const refreshQrPass = (conf: string, suite: string) => {
    triggerTemporarySkeleton(500);
    setConfirmationCode(conf || 'JWM-RIO-802941');
    setSuiteNumber(suite || 'Suite 802');
    const randomSuffix = Math.random().toString(16).substring(2, 6).toUpperCase();
    setQrTokenHash(`BONVOY-802-${randomSuffix}-99F2-2026`);
    showToast(
      language === 'en'
        ? 'Ephemeral Optical QR Key regenerated for Suite 802'
        : 'Chave QR Óptica Efêmera regenerada para a Suíte 802'
    );
  };

  return (
    <ConciergeContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        activeModule: activeModuleState,
        setActiveModule,
        activeModal,
        setActiveModal,
        skeletonMode,
        setSkeletonMode,
        triggerTemporarySkeleton,
        requests,
        addRequest,
        advanceRequestStatus,
        broadcastMessage,
        sendBroadcast,
        dismissBroadcast,
        toastNotification,
        showToast,
        currentTrack,
        currentSongIndex,
        currentSong,
        isPlaying,
        isPlayerVisible,
        progressSec,
        volume,
        suiteCastActive,
        selectTrack,
        nextSong,
        prevSong,
        shuffleSong,
        selectSongIndex,
        togglePlay,
        closePlayer,
        setProgressSec,
        setVolume,
        toggleSuiteCast,
        confirmationCode,
        suiteNumber,
        qrTokenHash,
        refreshQrPass,
        isAdminAuthenticated,
        adminUser,
        adminActiveTab,
        setAdminActiveTab,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </ConciergeContext.Provider>
  );
};

export const useConcierge = (): ConciergeContextValue => {
  const ctx = useContext(ConciergeContext);
  if (!ctx) {
    throw new Error('useConcierge must be used within a ConciergeProvider');
  }
  return ctx;
};
