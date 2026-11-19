import React, { useState } from 'react';
import {
  Play,
  Pause,
  Disc,
  ExternalLink,
  Radio,
  Sparkles,
  Volume2,
  Waves,
  Shuffle,
} from 'lucide-react';
import { useConcierge, SOUNDSCAPE_COLLECTIONS, SoundscapeTrack } from '../context/ConciergeContext';

export const CariocaRhythmModule: React.FC = () => {
  const {
    t,
    language,
    currentTrack,
    isPlaying,
    isPlayerVisible,
    selectTrack,
    togglePlay,
  } = useConcierge();

  const [activeFilter, setActiveFilter] = useState<'all' | 'morning' | 'sunset' | 'samba' | 'lounge'>('all');

  const filteredTracks =
    activeFilter === 'all'
      ? SOUNDSCAPE_COLLECTIONS
      : SOUNDSCAPE_COLLECTIONS.filter((item) => item.category === activeFilter);

  const handlePlayTrack = (track: SoundscapeTrack) => {
    if (!isPlayerVisible) {
      selectTrack(track);
    } else if (currentTrack.id === track.id) {
      togglePlay();
    } else {
      selectTrack(track);
    }
  };

  const handleRandomPlay = () => {
    const candidateTracks = SOUNDSCAPE_COLLECTIONS.filter((t) => t.id !== currentTrack.id);
    const selected =
      candidateTracks.length > 0
        ? candidateTracks[Math.floor(Math.random() * candidateTracks.length)]
        : SOUNDSCAPE_COLLECTIONS[0];
    selectTrack(selected);
  };

  return (
    <div className="relative min-h-screen bg-night-sanctuary text-[#FAF8F5] overflow-hidden pb-24">
      {/* Ambient Blurred Vinyl & Dusk Shadow Background Layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={currentTrack.coverImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-15 blur-3xl scale-110 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/80 via-[#141414]/90 to-[#141414]" />
        <div className="absolute -top-40 right-10 w-[520px] h-[520px] rounded-full bg-[#9E7E47]/12 blur-[130px]" />
        <div className="absolute top-1/3 -left-32 w-[460px] h-[460px] rounded-full bg-[#4F4255]/25 blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full bg-[#B84C16]/10 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 pt-10 sm:pt-16 space-y-20">
        {/* Nocturnal Editorial Hero & Interactive Analog Vinyl Turntable Deck */}
        <section className="space-y-8 sm:space-y-10">
          {/* Section Header: Narrative & Tag */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#9E7E47]/40 backdrop-blur-md">
              <Radio className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A880]">
                {t.rhythm.tag} · ANALOG HI-FI LOUNGE
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-semibold text-[#FAF8F5] leading-[1.1] tracking-tight">
              {t.rhythm.title}
            </h1>
            <p className="text-sm sm:text-base text-[#FAF8F5]/75 leading-relaxed max-w-2xl">
              {t.rhythm.subtitle}
            </p>
          </div>

          {/* Symmetrical / Balanced Hero Grid: Active Spotlight Card (7 cols) + Centered Turntable Card (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 7 Columns: Active Vinyl Pressing Spotlight (Liquid Glass Dark + Brass Stitching) */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-[28px] liquid-glass-dark stitched-brass space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                    {isPlaying && isPlayerVisible
                      ? language === 'en'
                        ? 'NOW SPINNING ON TURNTABLE'
                        : 'GIRANDO AGORA NO TOCA-DISCOS'
                      : language === 'en'
                      ? 'SELECTED VINYL PRESSING · READY TO PLAY'
                      : 'VINIL SELECIONADO · PRONTO PARA TOCAR'}
                  </span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white mt-1">
                    {currentTrack.title}
                  </h2>
                  <p className="text-xs text-[#FAF8F5]/70 mt-0.5">
                    {currentTrack.artist} · <span className="text-[#C5A880]">{currentTrack.bpm}</span> ·{' '}
                    {currentTrack.keySignature}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Random Shuffle Vinyl Play Button */}
                  <button
                    onClick={handleRandomPlay}
                    title={language === 'en' ? 'Play Everything Randomly (Shuffle)' : 'Reproduzir Tudo Aleatoriamente (Modo Aleatório)'}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-white/10 hover:bg-[#9E7E47] text-[#FAF8F5] hover:text-white border border-[#9E7E47]/40 transition-all shadow-md cursor-pointer"
                  >
                    <Shuffle className="w-4 h-4 text-[#C5A880]" />
                    <span>{language === 'en' ? 'Shuffle All' : 'Modo Aleatório'}</span>
                  </button>

                  {/* Play / Pause Vinyl Button */}
                  <button
                    onClick={() => handlePlayTrack(currentTrack)}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#9E7E47] text-white hover:bg-[#C5A880] hover:text-[#141414] transition-all shadow-lg cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        <span>{language === 'en' ? 'Pause Vinyl' : 'Pausar Vinil'}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 ml-0.5" />
                        <span>{t.rhythm.playCollection}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#FAF8F5]/75 leading-relaxed">
                {language === 'en' ? currentTrack.descriptionEn : currentTrack.descriptionPt}
              </p>

              {/* Thematic Glassmorphic Streaming Integration with Neon Brand Glows */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                    {t.rhythm.streamingSubtitle}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3.5">
                  {/* YouTube Music Crimson (#FF0000) Glow - Prioritized Primary Full Audio */}
                  <a
                    href={currentTrack.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-youtube inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold text-white ring-2 ring-[#FF0000]/60 shadow-[0_0_16px_rgba(255,0,0,0.35)]"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000] shadow-[0_0_10px_#FF0000] animate-pulse" />
                    <span>YouTube Music · {language === 'en' ? 'Full Songs' : 'Músicas Completas'}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  {/* Spotify Emerald (#1DB954) Glow - Secondary Option */}
                  <a
                    href={currentTrack.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-spotify inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold text-white/90 opacity-90 hover:opacity-100"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1DB954] shadow-[0_0_8px_#1DB954]" />
                    <span>Spotify</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  {/* Apple Music Magenta/Rose (#FC3C44) Glow - Secondary Option */}
                  <a
                    href={currentTrack.appleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="streaming-apple inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold text-white/90 opacity-90 hover:opacity-100"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FC3C44] shadow-[0_0_8px_#FC3C44]" />
                    <span>Apple Music</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Tactile Stitched Cognac Leather & Analog Vinyl Platter with Animated Audiophile Tonearm */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-[40px] p-6 leather-cognac stitched-brass border border-[#9E7E47]/50 flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Background Turntable Texture (Purely decorative, aria-hidden, no alt text to prevent leaking text) */}
                <img
                  src="/assets/bossa-vinyl-turntable.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity pointer-events-none"
                />
                <div className="absolute inset-0 bg-radial from-transparent via-[#141414]/50 to-[#141414]/90 pointer-events-none" />

                {/* Rotating Vinyl Record Disc (Clicking spins and plays everything randomly) */}
                <div
                  onClick={handleRandomPlay}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    language === 'en'
                      ? 'Spin vinyl disc to play everything randomly'
                      : 'Girar disco de vinil para reproduzir aleatoriamente'
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleRandomPlay();
                  }}
                  className={`relative z-10 w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#0B0B0B] border-4 border-[#2A2622] shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center cursor-pointer transition-transform duration-700 ${
                    isPlaying ? 'animate-spin' : 'hover:scale-105'
                  }`}
                  style={{ animationDuration: '16s' }}
                >
                  {/* Vinyl Grooves Concentric Rings */}
                  <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute inset-7 rounded-full border border-white/5 pointer-events-none" />
                  <div className="absolute inset-11 rounded-full border border-[#9E7E47]/15 pointer-events-none" />
                  <div className="absolute inset-16 rounded-full border border-white/10 pointer-events-none" />

                  {/* Center Album Label */}
                  <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#9E7E47] relative shadow-inner">
                    <img
                      src={currentTrack.coverImage}
                      alt={currentTrack.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#141414] border-2 border-[#C5A880]" />
                    </div>
                  </div>
                </div>

                {/* Audiophile Luxury Tonearm & Stylus Needle (Pivot in Top-Right, Swings onto Vinyl with Subtle Analog Micro-Drift) */}
                <div
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 w-32 h-64 sm:w-36 sm:h-72 pointer-events-none z-20"
                  style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.75))' }}
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 120 240"
                    className={`w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isPlaying ? 'rotate-[26deg] tonearm-needle-sway' : 'rotate-[-6deg]'
                    }`}
                    style={{ transformOrigin: '85px 35px' }}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="armTubeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#C5A880" />
                        <stop offset="35%" stopColor="#FFF9F0" />
                        <stop offset="65%" stopColor="#9E7E47" />
                        <stop offset="100%" stopColor="#3C342A" />
                      </linearGradient>
                      <radialGradient id="pivotBaseGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#3A342D" />
                        <stop offset="60%" stopColor="#1E1B18" />
                        <stop offset="100%" stopColor="#0F0D0C" />
                      </radialGradient>
                      <linearGradient id="counterweightGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2A2622" />
                        <stop offset="45%" stopColor="#E0C9A6" />
                        <stop offset="70%" stopColor="#9E7E47" />
                        <stop offset="100%" stopColor="#1A1815" />
                      </linearGradient>
                      <linearGradient id="headshellGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#24201D" />
                        <stop offset="50%" stopColor="#181512" />
                        <stop offset="100%" stopColor="#0B0B0B" />
                      </linearGradient>
                    </defs>

                    {/* Tonearm Rest Post & Cueing Arm Bridge */}
                    <g id="arm-rest-assembly">
                      <rect x="104" y="60" width="7" height="24" rx="2.5" fill="#1C1815" stroke="#9E7E47" strokeWidth="0.8" />
                      <path d="M 85 52 Q 106 58 108 72" stroke="#C5A880" strokeWidth="1.5" strokeLinecap="round" />
                    </g>

                    {/* Counterweight Behind Pivot Bearing */}
                    <g id="counterweight">
                      <rect x="75" y="4" width="20" height="20" rx="4" fill="url(#counterweightGrad)" stroke="#9E7E47" strokeWidth="1" />
                      <line x1="77" y1="10" x2="93" y2="10" stroke="#1A1815" strokeWidth="1" opacity="0.7" />
                      <line x1="77" y1="14" x2="93" y2="14" stroke="#1A1815" strokeWidth="1" opacity="0.7" />
                      <line x1="77" y1="18" x2="93" y2="18" stroke="#1A1815" strokeWidth="1" opacity="0.7" />
                    </g>

                    {/* Gimbal Base & Bearing Ring */}
                    <g id="gimbal-base">
                      <circle cx="85" cy="35" r="26" fill="url(#pivotBaseGrad)" stroke="#9E7E47" strokeWidth="1.8" />
                      <circle cx="85" cy="35" r="18" fill="#1C1916" stroke="#C5A880" strokeWidth="1" strokeDasharray="3 2" />
                      <circle cx="85" cy="35" r="9" fill="url(#counterweightGrad)" stroke="#9E7E47" strokeWidth="1.2" />
                      <circle cx="85" cy="35" r="3.5" fill="#141414" />
                    </g>

                    {/* Curved Metallic Tonearm Wand (Tube) */}
                    <g id="tonearm-wand">
                      <path
                        d="M 85 35 C 85 90, 68 135, 42 175 L 32 200"
                        stroke="#9E7E47"
                        strokeWidth="6"
                        strokeLinecap="round"
                        opacity="0.35"
                      />
                      <path
                        d="M 85 35 C 85 90, 68 135, 42 175 L 32 200"
                        stroke="url(#armTubeGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 85 35 C 85 90, 68 135, 42 175 L 32 200"
                        stroke="rgba(255, 255, 255, 0.75)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* Headshell, Cartridge & Stylus Assembly */}
                    <g id="cartridge-headshell">
                      <polygon
                        points="24,196 40,202 30,230 16,222"
                        fill="url(#headshellGrad)"
                        stroke="#9E7E47"
                        strokeWidth="1.4"
                      />
                      <line x1="22" y1="208" x2="33" y2="213" stroke="#C5A880" strokeWidth="1.5" />
                      <path
                        d="M 40 202 Q 50 205 48 214"
                        stroke="#C5A880"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      {/* Precision Audiophile Diamond Stylus Tip (Micro-Glow & Stable Anchor without SVG transform glitches) */}
                      {isPlaying && (
                        <circle
                          cx="21"
                          cy="227"
                          r="4.5"
                          fill="#FFE082"
                          className="needle-stylus-glow pointer-events-none"
                        />
                      )}
                      <circle cx="21" cy="227" r="2" fill="#FFE082" stroke="#9E7E47" strokeWidth="0.5" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Pills & Four Soundscape Collections */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
                SELECTED BY BARETTO-LONDRA & POSTO 5 ACOUSTIC STUDIO
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-medium text-white mt-1">
                {language === 'en' ? 'Four Listening Journeys' : 'Quatro Jornadas Sonoras'}
              </h2>
            </div>

            {/* Mood Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', labelEn: 'All Pressings', labelPt: 'Todos os Vinis' },
                { id: 'morning', labelEn: 'Morning Light', labelPt: 'Luz da Manhã' },
                { id: 'sunset', labelEn: 'Arpoador Sunset', labelPt: 'Pôr do Sol' },
                { id: 'samba', labelEn: 'Lapa Samba', labelPt: 'Samba da Lapa' },
                { id: 'lounge', labelEn: 'Ipanema Night', labelPt: 'Noite em Ipanema' },
              ].map((pill) => {
                const active = activeFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() =>
                      setActiveFilter(pill.id as 'all' | 'morning' | 'sunset' | 'samba' | 'lounge')
                    }
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
                      active
                        ? 'bg-[#9E7E47] text-white shadow-[0_0_20px_rgba(158,126,71,0.4)]'
                        : 'bg-white/5 text-[#FAF8F5]/70 border border-white/10 hover:border-[#9E7E47]/50 hover:text-white'
                    }`}
                  >
                    {language === 'en' ? pill.labelEn : pill.labelPt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Asymmetric Dark Glass Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTracks.map((track, idx) => {
              const isSelected = currentTrack.id === track.id && isPlayerVisible;
              return (
                <article
                  key={track.id}
                  className={`group relative rounded-[32px] overflow-hidden leather-dark stitched-brass border transition-all duration-500 p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
                    isSelected
                      ? 'border-[#C5A880] shadow-[0_20px_50px_rgba(158,126,71,0.28)]'
                      : 'border-[#9E7E47]/30 hover:border-[#C5A880]/70'
                  }`}
                >
                  <div className="space-y-5">
                    <div
                      className={`relative h-60 overflow-hidden border border-[#9E7E47]/25 ${
                        idx % 2 === 0 ? 'organic-arch-left' : 'organic-arch-right'
                      }`}
                    >
                      <img
                        src={track.coverImage}
                        alt={track.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/25 to-transparent" />

                      <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#141414]/85 text-[#C5A880] text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md border border-[#9E7E47]/30 flex items-center gap-1.5">
                        <Disc
                          className={`w-3.5 h-3.5 text-[#9E7E47] ${
                            isSelected && isPlaying ? 'animate-spin' : ''
                          }`}
                        />
                        <span>
                          {track.bpm} · {track.duration}
                        </span>
                      </div>

                      <button
                        onClick={() => handlePlayTrack(track)}
                        aria-label={`Play ${track.title}`}
                        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#9E7E47] text-white hover:bg-white hover:text-[#141414] transition-all flex items-center justify-center shadow-lg cursor-pointer"
                      >
                        {isSelected && isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                        {track.subtitle}
                      </p>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white">
                        {track.title}
                      </h3>
                      <p className="text-xs text-[#FAF8F5]/60 font-medium">{track.artist}</p>
                      <p className="text-sm text-[#FAF8F5]/80 leading-relaxed pt-1">
                        {language === 'en' ? track.descriptionEn : track.descriptionPt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Play Action & Glowing Streaming Pills */}
                  <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => handlePlayTrack(track)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                        isSelected && isPlaying
                          ? 'bg-[#9E7E47] text-white shadow-[0_0_20px_rgba(158,126,71,0.5)]'
                          : 'bg-white/10 text-[#FAF8F5] hover:bg-[#9E7E47] hover:text-white'
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                          <span>{language === 'en' ? 'Playing in Suite' : 'Tocando na Suíte'}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>{t.rhythm.playCollection}</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={track.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="streaming-youtube px-3 py-1 rounded-full text-[10px] font-semibold text-white shadow-xs"
                      >
                        YouTube
                      </a>
                      <a
                        href={track.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="streaming-spotify px-2.5 py-1 rounded-full text-[10px] font-medium text-white/80 hover:text-white"
                      >
                        Spotify
                      </a>
                      <a
                        href={track.appleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="streaming-apple px-2.5 py-1 rounded-full text-[10px] font-medium text-white/80 hover:text-white"
                      >
                        Apple
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Hidden: IN-SUITE VINYL SOMMELIER SERVICE
        <section className="rounded-[32px] p-8 sm:p-10 bg-gradient-to-r from-[#231829]/80 via-[#1C1C1C]/90 to-[#141414] border border-[#9E7E47]/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-[#9E7E47]/30 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5 text-[#9E7E47]" />
              <span>IN-SUITE VINYL SOMMELIER SERVICE</span>
            </div>
            <p className="text-sm sm:text-base text-[#FAF8F5]/85 leading-relaxed">
              {language === 'en'
                ? 'Our Cultural Concierge delivers an audiophile turntable and original Brazilian pressings of João Gilberto, Tom Jobim, and Stan Getz directly to your suite.'
                : 'Nosso Concierge Cultural entrega um toca-discos audiófilo e prensagens originais de João Gilberto, Tom Jobim e Stan Getz diretamente na sua suíte.'}
            </p>
          </div>
          <button
            onClick={() => handlePlayTrack(SOUNDSCAPE_COLLECTIONS[1])}
            className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#9E7E47] text-white hover:bg-[#C5A880] hover:text-[#141414] transition-all shrink-0 cursor-pointer"
          >
            {language === 'en' ? 'Start Sunset Vinyl Session' : 'Iniciar Sessão de Vinil'}
          </button>
        </section>
        */}

        {/* DID YOU KNOW? — Copacabana Heritage Card */}
        <section className="rounded-[32px] p-8 sm:p-10 bg-gradient-to-r from-[#231829]/80 via-[#1C1C1C]/90 to-[#141414] border border-[#9E7E47]/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-[#9E7E47]/30 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
              <Sparkles className="w-3.5 h-3.5 text-[#9E7E47]" />
              <span>{language === 'en' ? 'DID YOU KNOW? · COPACABANA HERITAGE' : 'VOCÊ SABIA? · HISTÓRIA DE COPACABANA'}</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium text-white">
              {language === 'en'
                ? 'Avenida Atlântica & The Cradle of Bossa Nova'
                : 'Avenida Atlântica & O Berço da Bossa Nova'}
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/75 leading-relaxed">
              {language === 'en'
                ? 'Before rising to global acclaim, Copacabana was an intimate bohemian haven. In the late 1950s, just footsteps from our Posto 5 beachfront, the ocean-facing apartments of Avenida Atlântica served as the historic gathering place where João Gilberto, Tom Jobim, and Nara Leão first perfected the syncopated acoustic guitar rhythm that gave birth to Bossa Nova.'
                : 'Antes de se tornar um ícone internacional, Copacabana era um recanto boêmio intimista. No final dos anos 1950, a poucos passos do Posto 5, os apartamentos à beira-mar da Avenida Atlântica foram o ponto de encontro onde João Gilberto, Tom Jobim e Nara Leão lapidaram a batida sincopada no violão de nylon que deu origem à Bossa Nova.'}
            </p>
          </div>
          <button
            onClick={() => handlePlayTrack(SOUNDSCAPE_COLLECTIONS[0])}
            className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#9E7E47] text-white hover:bg-[#C5A880] hover:text-[#141414] transition-all shrink-0 cursor-pointer"
          >
            {language === 'en' ? 'Play Posto 5 Morning Bossa' : 'Tocar Bossa do Posto 5'}
          </button>
        </section>
      </div>
    </div>
  );
};
