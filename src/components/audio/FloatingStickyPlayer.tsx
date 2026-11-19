import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Volume2,
  VolumeX,
  Radio,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Music,
} from 'lucide-react';
import {
  useConcierge,
  SOUNDSCAPE_COLLECTIONS,
  SoundscapeTrack,
  SoundscapeSong,
} from '../../context/ConciergeContext';

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export const FloatingStickyPlayer: React.FC = () => {
  const {
    language,
    currentTrack,
    currentSongIndex,
    currentSong,
    nextSong,
    prevSong,
    shuffleSong,
    isPlaying,
    isPlayerVisible,
    progressSec,
    volume,
    selectTrack,
    togglePlay,
    closePlayer,
    setProgressSec,
    setVolume,
  } = useConcierge();

  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [liveDuration, setLiveDuration] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lastSyncTimestampRef = useRef<number>(0);

  // Reset live duration when song changes
  useEffect(() => {
    setLiveDuration(null);
    lastSyncTimestampRef.current = 0;
  }, [currentTrack.id, currentSong.id]);

  // Synchronize progress bar directly with YouTube IFrame Player API postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin &&
        !event.origin.includes('youtube.com') &&
        !event.origin.includes('youtube-nocookie.com')
      ) {
        return;
      }

      try {
        let data = event.data;
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch {
            return;
          }
        }
        if (!data || typeof data !== 'object') return;

        // Extract infoDelivery payload from YouTube
        const info = data.info || (data.infoDelivery && data.infoDelivery.info);

        // 1. Sync live track duration as detected by YouTube
        if (info && typeof info.duration === 'number' && info.duration > 0) {
          setLiveDuration(Math.round(info.duration));
        }

        // 2. Sync exact current playback seconds with YouTube progress
        if (info && typeof info.currentTime === 'number') {
          const exactSec = Math.floor(info.currentTime);
          setProgressSec(exactSec);
          lastSyncTimestampRef.current = Date.now();
        }

        // 3. YouTube Player State 0 = YT.PlayerState.ENDED
        const state =
          data.event === 'onStateChange'
            ? data.info
            : info && typeof info.playerState === 'number'
            ? info.playerState
            : null;

        // Auto-advance strictly governed by YouTube's real playback duration:
        // Advances ONLY when YouTube video finishes (ENDED state 0) or reaches YouTube's real track end
        if (state === 0) {
          nextSong();
        } else if (
          info &&
          typeof info.duration === 'number' &&
          typeof info.currentTime === 'number' &&
          info.duration > 10 &&
          info.currentTime >= info.duration - 0.25
        ) {
          nextSong();
        }
      } catch {
        // Safe cross-origin handling
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [nextSong, setProgressSec]);

  // Heartbeat ping: Subscribe to YouTube IFrame API infoDelivery events
  useEffect(() => {
    if (!isPlayerVisible) return;

    const pingListening = () => {
      try {
        if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
          return;
        }
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }),
            '*'
          );
        }
      } catch {
        // Safe cross-origin handling
      }
    };

    pingListening();
    const interval = setInterval(pingListening, 1000);
    return () => clearInterval(interval);
  }, [isPlayerVisible, currentSong.id]);

  // Fallback progression ticker (only active when YouTube events are not available)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      if (Date.now() - lastSyncTimestampRef.current > 2500) {
        setProgressSec((prev) => {
          const total = liveDuration || currentSong.durationSec || currentTrack.durationSec || 240;
          if (prev + 1 >= total) {
            nextSong();
            return 0;
          }
          return prev + 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, liveDuration, currentSong.durationSec, currentTrack.durationSec, nextSong, setProgressSec]);

  // Safe YouTube iframe postMessage command dispatcher
  const postToYouTube = (func: string, args: any[] = []) => {
    try {
      if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') {
        return;
      }
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args }),
          '*'
        );
      }
    } catch {
      // Cross-origin safe
    }
  };

  const handleTogglePlay = () => {
    postToYouTube(isPlaying ? 'pauseVideo' : 'playVideo');
    togglePlay();
  };

  const handleToggleMute = () => {
    if (volume === 0) {
      setVolume(80);
      postToYouTube('unMute');
      postToYouTube('setVolume', [80]);
    } else {
      setVolume(0);
      postToYouTube('mute');
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const songTotalSec = liveDuration || currentSong.durationSec || currentTrack.durationSec || 240;
    const newSec = Math.round(pct * songTotalSec);
    setProgressSec(newSec);
    postToYouTube('seekTo', [newSec, true]);
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }),
          '*'
        );
      }
    } catch {
      // Cross-origin safe
    }
  };

  // Sticky player is ONLY visible when a playlist has been triggered to play!
  if (!isPlayerVisible) return null;

  const playlistSongs: SoundscapeSong[] = currentTrack.songs || [];
  const currentIndex = SOUNDSCAPE_COLLECTIONS.findIndex((c) => c.id === currentTrack.id);

  // Advance to the NEXT SONG in the current playlist (NOT changing playlist!)
  const handleNextSong = () => {
    nextSong();
  };

  // Retreat to the PREVIOUS SONG in the current playlist (NOT changing playlist!)
  const handlePrevSong = () => {
    prevSong();
  };

  // Play a random song WITHIN the active playlist (Shuffle playlist songs)
  const handleShuffleSong = () => {
    shuffleSong();
  };

  // Explicit Playlist switcher (changes between Bossa Nova, Sunset, Lapa, Evening)
  const handleSelectCollection = (track: SoundscapeTrack) => {
    selectTrack(track);
  };

  const currentExternalUrl = currentSong.youtubeVideoId
    ? `https://music.youtube.com/watch?v=${currentSong.youtubeVideoId}`
    : currentTrack.youtubeUrl;

  const songDurationSec = liveDuration || currentSong.durationSec || currentTrack.durationSec || 240;
  const progressPct = Math.min(100, Math.max(0, (progressSec / songDurationSec) * 100));
  const displayTotalDuration = liveDuration ? formatTime(liveDuration) : currentSong.duration;

  const originParam =
    typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null'
      ? `&origin=${encodeURIComponent(window.location.origin)}`
      : '';

  return (
    <aside
      aria-label="Carioca Rhythm Sticky Audio Player"
      className={`player-floating-aside fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0 z-50 flex flex-col items-center sm:items-end transition-all duration-300 ${
        isMinimized ? 'w-auto max-w-[calc(100vw-1.5rem)] sm:max-w-md' : 'w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px]'
      }`}
    >
      {/* Minimized Compact Badge (Centered in viewport on mobile, docked right on tablet/desktop) */}
      {isMinimized && (
        <div className="player-minimized-badge liquid-glass-dark stitched-brass rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 border border-[#9E7E47]/50 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_15px_rgba(158,126,71,0.25)] flex items-center gap-2 sm:gap-2.5 backdrop-blur-xl animate-fade-in max-w-full overflow-hidden">
          {/* Spinning Vinyl Platter Thumbnail */}
          <div
            onClick={() => setIsMinimized(false)}
            role="button"
            tabIndex={0}
            title={language === 'en' ? 'Click to expand player' : 'Clique para expandir o player'}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#C5A880] relative cursor-pointer shadow-md shrink-0"
          >
            <img
              src={currentTrack.coverImage}
              alt={currentTrack.title}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '14s' }}
            />
            <span className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[#141414] border border-[#C5A880]" />
          </div>

          <div
            onClick={() => setIsMinimized(false)}
            className="min-w-0 flex-1 cursor-pointer"
            title={language === 'en' ? 'Click to expand player' : 'Clique para expandir o player'}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse shrink-0" />
              <p className="font-serif-luxury text-xs font-semibold text-white truncate max-w-[110px] sm:max-w-[160px] md:max-w-[200px]">
                {currentSong.title}
              </p>
            </div>
            <p className="text-[9px] sm:text-[10px] text-[#C5A880] uppercase tracking-wider truncate max-w-[110px] sm:max-w-[160px] md:max-w-[200px]">
              {currentSong.artist} · {currentTrack.title}
            </p>
          </div>

          {/* Quick Play/Pause */}
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause soundscape' : 'Play soundscape'}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#9E7E47] text-white hover:bg-[#C5A880] hover:text-[#141414] transition-all flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5" />}
          </button>

          {/* Quick Next Song in Playlist */}
          <button
            type="button"
            onClick={handleNextSong}
            title={language === 'en' ? 'Next song in playlist' : 'Próxima música na playlist'}
            aria-label={language === 'en' ? 'Next song in playlist' : 'Próxima música na playlist'}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full text-white/75 hover:text-[#C5A880] hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer shrink-0"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Expand Button */}
          <button
            onClick={() => setIsMinimized(false)}
            title={language === 'en' ? 'Expand player' : 'Expandir player'}
            aria-label={language === 'en' ? 'Expand player' : 'Expandir player'}
            className="p-1 sm:p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          {/* Dismiss Player */}
          <button
            onClick={closePlayer}
            title={language === 'en' ? 'Close player' : 'Fechar player'}
            aria-label="Close audio player"
            className="p-1 sm:p-1.5 rounded-full text-white/50 hover:text-[#B84C16] hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Real-time YouTube Progress Bar on Minimized Capsule (Anchored at Baseline, Taller & Masked) */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 sm:h-2 bg-white/10 overflow-hidden pointer-events-none progress-bar-mask rounded-b-full">
            <div
              className="h-full bg-gradient-to-r from-[#9E7E47] via-[#C5A880] to-[#E5D2BA] transition-[width] duration-150 ease-linear"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Full Expanded In-Site Streaming Console: ALWAYS kept mounted in DOM so audio does not pause */}
      <div
        className={`player-expanded-console liquid-glass-dark stitched-brass rounded-[28px] border border-[#9E7E47]/50 shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_25px_rgba(158,126,71,0.25)] text-[#FAF8F5] backdrop-blur-2xl transition-all duration-300 ${
          isMinimized
            ? 'h-0 max-h-0 w-0 max-w-0 opacity-0 overflow-hidden pointer-events-none p-0 m-0 border-none select-none'
            : 'w-full relative opacity-100 overflow-hidden animate-fade-in'
        }`}
      >
          {/* Top Header: Title, Live Status & Action Buttons */}
          <div className="px-4 py-3 border-b border-white/10 bg-black/40 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Radio className="w-4 h-4 text-[#C5A880] animate-pulse shrink-0" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A880] truncate">
                    {currentTrack.title}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-[#C5A880] font-mono shrink-0">
                    {language === 'en'
                      ? `Track ${currentSongIndex + 1}/${playlistSongs.length || 1}`
                      : `Faixa ${currentSongIndex + 1}/${playlistSongs.length || 1}`}
                  </span>
                </div>
                <span className="text-[11px] text-white/80 font-serif-luxury truncate block">
                  {currentSong.title} — {currentSong.artist}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* External App Link */}
              <a
                href={currentExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={language === 'en' ? 'Open in native streaming app' : 'Abrir no app de streaming'}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Minimize to Right Edge Badge */}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                title={language === 'en' ? 'Minimize to corner' : 'Minimizar no canto'}
                aria-label={language === 'en' ? 'Minimize to corner' : 'Minimizar no canto'}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Close Window Button */}
              <button
                type="button"
                onClick={closePlayer}
                title={language === 'en' ? 'Close player' : 'Fechar player'}
                aria-label="Close audio player"
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-[#B84C16] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Playlist Changer Selector (Switch between the 4 Carioca soundscapes) */}
          <div className="px-4 py-2.5 bg-black/25 border-b border-white/5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#C5A880] flex items-center gap-1.5">
                <Music className="w-3 h-3 text-[#C5A880]" />
                <span>{language === 'en' ? 'Change Playlist' : 'Mudar Playlist'}</span>
              </span>
              <span className="text-[9px] text-white/50 font-mono">
                {currentIndex + 1} / {SOUNDSCAPE_COLLECTIONS.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {SOUNDSCAPE_COLLECTIONS.map((col) => {
                const isSelected = col.id === currentTrack.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => handleSelectCollection(col)}
                    className={`px-2.5 py-1.5 rounded-xl text-[10px] font-medium text-left truncate transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#9E7E47] text-white border-[#C5A880] shadow-[0_0_12px_rgba(158,126,71,0.5)] font-semibold'
                        : 'bg-white/5 text-white/75 border-white/5 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="truncate block">{col.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dedicated YouTube Music Audio Source Bar */}
          <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#FF0000] shadow-[0_0_8px_#FF0000] animate-pulse shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white truncate">
                YouTube Music
              </span>
              <span className="text-[8.5px] px-2 py-0.5 rounded-full bg-[#9E7E47]/20 text-[#C5A880] border border-[#9E7E47]/30 font-medium shrink-0">
                {language === 'en' ? 'Full Hi-Fi Songs' : 'Músicas Completas'}
              </span>
            </div>

            <a
              href={currentExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={language === 'en' ? 'Open in YouTube Music app' : 'Abrir no app YouTube Music'}
              className="text-[9.5px] text-[#C5A880] hover:text-white flex items-center gap-1 transition-colors shrink-0 font-medium"
            >
              <span>{language === 'en' ? 'Open App' : 'Abrir no App'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Real Functional Streaming Player IFrame (Single Optimized YouTube Music Player) */}
          <div className="p-3 bg-black/70">
            <div className="rounded-xl overflow-hidden bg-black/90 border border-[#9E7E47]/30 shadow-inner">
              <iframe
                key={`youtube-${currentTrack.id}-${currentSong.id}`}
                ref={iframeRef}
                title={`In-Site YouTube Player - ${currentTrack.title}`}
                src={
                  currentSong.youtubeVideoId
                    ? `https://www.youtube-nocookie.com/embed/${currentSong.youtubeVideoId}?autoplay=1&enablejsapi=1${originParam}&widgetid=1`
                    : currentTrack.youtubeEmbedUrl
                }
                width="100%"
                height="180"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="eager"
                className="w-full"
              />
            </div>
          </div>

          {/* Bottom Audio Navigation & Music Change Controls Bar */}
          <div className="px-4 py-3 bg-black/60 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between gap-3">
              {/* Artwork & Track Info */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C5A880] relative shadow-md shrink-0">
                  <img
                    src={currentTrack.coverImage}
                    alt={currentTrack.title}
                    className={`w-full h-full object-cover ${isPlaying ? 'animate-spin' : ''}`}
                    style={{ animationDuration: '14s' }}
                  />
                  <span className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-[#141414] border border-[#C5A880]" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif-luxury text-xs font-semibold text-white truncate">
                    {currentSong.title}
                  </p>
                  <p className="text-[10px] text-[#C5A880] truncate">
                    {currentSong.artist} · {currentTrack.title}
                  </p>
                </div>
              </div>

              {/* Music Change Controls: Prev, Play/Pause, Next, Shuffle */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevSong}
                  aria-label={language === 'en' ? 'Previous song in playlist' : 'Música anterior na playlist'}
                  title={language === 'en' ? 'Previous song in playlist' : 'Música anterior na playlist'}
                  className="p-1.5 rounded-full text-white/75 hover:text-[#C5A880] hover:bg-white/10 transition-all cursor-pointer"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? 'Pause soundscape' : 'Play soundscape'}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4B991] via-[#9E7E47] to-[#7A5D2E] text-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-md cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={handleNextSong}
                  aria-label={language === 'en' ? 'Next song in playlist' : 'Próxima música na playlist'}
                  title={language === 'en' ? 'Next song in playlist' : 'Próxima música na playlist'}
                  className="p-1.5 rounded-full text-white/75 hover:text-[#C5A880] hover:bg-white/10 transition-all cursor-pointer"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleShuffleSong}
                  aria-label={language === 'en' ? 'Shuffle playlist songs' : 'Músicas aleatórias na playlist'}
                  title={language === 'en' ? 'Play randomly (Shuffle)' : 'Reproduzir aleatoriamente'}
                  className="p-1.5 rounded-full text-white/75 hover:text-[#C5A880] hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Timeline Progress Bar & Volume — Synchronized in Real Time with YouTube */}
            <div className="flex items-center justify-between gap-2.5 pt-1.5 border-t border-white/5">
              <span className="text-[10px] font-mono text-[#FAF8F5]/80 min-w-[34px] text-left tabular-nums select-none">
                {formatTime(progressSec)}
              </span>

              <div
                onClick={handleSeek}
                role="slider"
                aria-label={language === 'en' ? 'Playback seek slider' : 'Controle de tempo da música'}
                aria-valuemin={0}
                aria-valuemax={songDurationSec}
                aria-valuenow={progressSec}
                tabIndex={0}
                title={language === 'en' ? 'Click to seek in track' : 'Clique para avançar/retroceder'}
                className="group relative flex-1 h-5 flex items-center cursor-pointer select-none"
              >
                {/* Background Track with Hardware-Accelerated Mask */}
                <div className="w-full h-2 bg-white/15 rounded-full overflow-hidden group-hover:h-2.5 transition-all progress-bar-mask relative">
                  {/* Real-time YouTube Audio Progress Fill */}
                  <div
                    className="h-full bg-gradient-to-r from-[#9E7E47] via-[#C5A880] to-[#E5D2BA] transition-[width] duration-150 ease-linear"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                {/* Seeker Handle (glow thumb appears on hover, bounded within track) */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-[#9E7E47] shadow-[0_0_6px_rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ left: `clamp(0px, calc(${progressPct}% - 7px), calc(100% - 14px))` }}
                />
              </div>

              <span className="text-[10px] font-mono text-[#FAF8F5]/60 min-w-[34px] text-right tabular-nums select-none">
                {displayTotalDuration}
              </span>

              <div className="flex items-center gap-1 pl-1">
                <button
                  type="button"
                  onClick={handleToggleMute}
                  aria-label="Toggle mute"
                  title={volume === 0 ? 'Unmute' : 'Mute'}
                  className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-[#B84C16]" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
    </aside>
  );
};
