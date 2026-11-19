import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

describe('JW Marriott Copacabana Digital Guest Concierge Suite (PRD v1.3.0)', () => {
  it('renders Module 1 (Guest Experience) with Suite 802 greeting, hides sticky player by default, and omits Modals/Skeletons from nav', () => {
    render(<App />);

    expect(screen.getAllByText(/Welcome John Doe · Suite 802/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Roberto Burle Marx & The Iconic Wave Promenade/i)).toBeInTheDocument();
    expect(screen.getAllByText(/The Carioca/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Baretto-Londra Jazz Lounge/i).length).toBeGreaterThan(0);

    // Sticky player must NOT be visible before a playlist is played
    expect(screen.queryByLabelText(/Carioca Rhythm Sticky Audio Player/i)).not.toBeInTheDocument();

    // Modals & Skeletons must NOT be a navigable tab in the navbar
    expect(screen.queryByRole('button', { name: /Modals & Skeletons/i })).not.toBeInTheDocument();
  });

  it('shows the sticky audio player ONLY when a playlist is triggered to play', () => {
    render(<App />);

    const playMorningBtn = screen.getByRole('button', { name: /Play Morning Bossa/i });
    fireEvent.click(playMorningBtn);

    expect(screen.getByLabelText(/Carioca Rhythm Sticky Audio Player/i)).toBeInTheDocument();
  });

  it('toggles seamlessly between English (EN) and Brazilian Portuguese (PT)', () => {
    render(<App />);

    const langTrack = screen.getByRole('group', { name: /Language switcher/i });
    expect(langTrack).toBeInTheDocument();
    expect(langTrack).toHaveClass('language-toggle-track');

    const slidingPill = langTrack.querySelector('.language-toggle-pill');
    expect(slidingPill).toBeInTheDocument();
    expect(slidingPill?.getAttribute('style')).toContain('translate3d(0, 0, 0)');

    const ptButton = screen.getByRole('button', { name: 'PT' });
    expect(ptButton).toHaveClass('language-toggle-btn');
    fireEvent.click(ptButton);

    expect(slidingPill?.getAttribute('style')).toContain('translate3d(100%, 0, 0)');
    expect(screen.getAllByText(/Bem-vindo ao Rio/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Roberto Burle Marx & O Calçadão de Ondas/i)).toBeInTheDocument();

    const enButton = screen.getByRole('button', { name: 'EN' });
    expect(enButton).toHaveClass('language-toggle-btn');
    fireEvent.click(enButton);
    expect(slidingPill?.getAttribute('style')).toContain('translate3d(0, 0, 0)');
    expect(screen.getAllByText(/Welcome John Doe · Suite 802/i).length).toBeGreaterThan(0);
  });

  it('navigates across modules, renders Carioca Rhythm in dark luxury mode, and invokes modals on demand', () => {
    render(<App />);

    // Module 2: Carioca Rhythm (Dark Nocturnal Luxury Page)
    fireEvent.click(screen.getAllByRole('button', { name: /Carioca Rhythm/i })[0]);
    expect(screen.getByText(/Carioca Rhythm & Vinyl/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Bossa Nova Morning Light/i).length).toBeGreaterThan(0);

    // Module 3: Explore Copacabana & Beyond (Light Vector Cartography)
    fireEvent.click(screen.getAllByRole('button', { name: /Explore & Map/i })[0]);
    expect(screen.getByText(/GOOGLE MAPS LIGHT MODE VECTOR STANDARD/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Forte de Copacabana & Confeitaria Colombo/i).length).toBeGreaterThan(0);

    // Module 4: Guest Services & Safety
    fireEvent.click(screen.getAllByRole('button', { name: /Safety & 24\/7/i })[0]);
    expect(screen.getAllByText(/\+55 \(21\) 2332-2924/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/190/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/192/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Ext\. 99/i).length).toBeGreaterThan(0);

    // Invoke Modal via TopNavBar "Concierge" CTA
    fireEvent.click(screen.getByRole('button', { name: /^Concierge$/i }));
    expect(screen.getByText(/In-Room Amenities & Linen Request/i)).toBeInTheDocument();
  });

  it('synchronizes guest amenity requests in real time with the Operations Management Dashboard after staff authentication', () => {
    render(<App />);

    const towelsBtn = screen.getByText(/Fresh Plush Towels|Fresh Towels/i).closest('button');
    expect(towelsBtn).not.toBeNull();
    fireEvent.click(towelsBtn!);

    fireEvent.click(screen.getAllByRole('button', { name: /Ops Console/i })[0]);

    // Staff authentication screen is presented
    expect(screen.getByText(/Executive Administration Portal/i)).toBeInTheDocument();

    // Authenticate via Sign In
    const signInBtn = screen.getByRole('button', { name: /Sign In to Dashboard/i });
    fireEvent.click(signInBtn);

    expect(
      screen.getAllByText(/Suite 802 Heated Plush Bath & Copacabana Beach Towels/i).length
    ).toBeGreaterThan(0);
  });

  it('unifies Suite Key QR Generator and Operations Console behind an authenticated Administration Dashboard', () => {
    render(<App />);

    // Navigate to unified Administration Console
    fireEvent.click(screen.getAllByRole('button', { name: /Ops Console/i })[0]);

    // Unauthenticated: Verify login gate elements
    expect(screen.getByText(/Executive Administration Portal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Executive Staff Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Security Passcode/i)).toBeInTheDocument();

    // Sign in using the Instant Demo Access button
    const demoBtn = screen.getByRole('button', { name: /Instant Demo Access/i });
    fireEvent.click(demoBtn);

    // Authenticated: Unified Administration Dashboard is visible
    expect(screen.getByText(/Administration & Hospitality Operations Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Carlos Mendoza/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Out/i })).toBeInTheDocument();

    // Both Operations & Suite Key QR tabs are accessible
    expect(screen.getByRole('tab', { name: /All-in-One Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Operations & Dispatch/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Suite Key QR Generator/i })).toBeInTheDocument();

    // Switch to dedicated Suite Key QR Generator tab
    fireEvent.click(screen.getByRole('tab', { name: /Suite Key QR Generator/i }));
    expect(screen.getByText(/MARRIOTT BONVOY® TITANIUM ELITE/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Apple Wallet/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Google Wallet/i })).toBeInTheDocument();
    expect(screen.getByText(/ZERO-PASSWORD CRYPTOGRAPHIC HANDSHAKE/i)).toBeInTheDocument();

    // Sign out to verify session lock
    fireEvent.click(screen.getByRole('button', { name: /Sign Out/i }));
    expect(screen.getByText(/Executive Administration Portal/i)).toBeInTheDocument();
  });

  it('flips the luxury suite keycard on click, revealing stay folio information, Griffin emblem, and JW signature', () => {
    render(<App />);

    // Initially, keycard shows front details and flip affordance button
    const flipBtn = screen.getByRole('button', { name: /Flip to view stay folio/i });
    expect(flipBtn).toBeInTheDocument();
    expect(screen.getAllByText(/Suite 802 Keycard Active/i).length).toBeGreaterThan(0);
    expect(document.querySelector('.keycard-floating-stage')).toBeInTheDocument();
    expect(document.querySelector('.keycard-shadow-breathing')).toBeInTheDocument();

    // Click to flip card
    fireEvent.click(flipBtn);

    // Back face is revealed with stay folio details
    expect(screen.getAllByText(/#JWM-802-RIO-2026/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/J\. Willard Marriott/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/J\. Willard Marriott signature/i).length).toBeGreaterThan(0);
    expect(screen.getAllByAltText(/JW Marriott Official Griffin Emblem/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/16 Nov – 21 Nov 2026|16 – 21 Nov 2026/i).length).toBeGreaterThan(0);

    // Click to return to keycard
    const returnBtn = screen.getAllByRole('button', { name: /Return to Suite Keycard/i })[0];
    fireEvent.click(returnBtn);
    expect(flipBtn).toHaveAttribute('aria-label', expect.stringMatching(/Flip to view stay folio/i));
  });

  it('flips keycard in Portuguese and ensures "Voltar para Chave da Suíte" button is visible and functional', () => {
    render(<App />);

    // Toggle to Portuguese
    const ptButton = screen.getByRole('button', { name: 'PT' });
    fireEvent.click(ptButton);

    // Verify Portuguese greeting rendered
    expect(screen.getAllByText(/Bem-vindo ao Rio · John Doe · Suíte 802/i).length).toBeGreaterThan(0);

    // Flip button in PT
    const flipBtn = screen.getByRole('button', { name: /Virar para ver detalhes da estadia/i });
    expect(flipBtn).toBeInTheDocument();

    // Flip to back
    fireEvent.click(flipBtn);

    // Verify back face in PT
    expect(screen.getAllByText(/#JWM-802-RIO-2026/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Registro Oficial de Hospedagem/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Fundador · JW Marriott Hotels/i).length).toBeGreaterThan(0);

    // Verify "Voltar para Chave da Suíte" return button
    const returnBtns = screen.getAllByRole('button', { name: /Voltar para Chave da Suíte/i });
    expect(returnBtns.length).toBeGreaterThan(0);
    fireEvent.click(returnBtns[0]);

    // Card flips back to front
    expect(flipBtn).toHaveAttribute('aria-label', expect.stringMatching(/Virar para ver detalhes da estadia/i));
  });

  it('connects Carioca Rhythm to real Spotify, YouTube Music, and Apple Music playlists and supports in-site reproduction', () => {
    render(<App />);

    // Navigate to Module 2 (Carioca Rhythm)
    fireEvent.click(screen.getAllByRole('button', { name: /Carioca Rhythm/i })[0]);

    // Verify real playlist links are present for Bossa Nova Morning Light
    const spotifyLinks = screen.getAllByRole('link', { name: /Spotify/i });
    expect(
      spotifyLinks.some((link) => link.getAttribute('href') === 'https://open.spotify.com/playlist/37i9dQZF1EIhDXnCBCnVi9')
    ).toBe(true);

    const ytLinks = screen.getAllByRole('link', { name: /YouTube/i });
    expect(
      ytLinks.some(
        (link) => link.getAttribute('href') === 'https://music.youtube.com/playlist?list=PLPabdEIQxVqAuGRr1o7PG8wfq0fHJZNwa'
      )
    ).toBe(true);

    const appleLinks = screen.getAllByRole('link', { name: /Apple/i });
    expect(
      appleLinks.some(
        (link) =>
          link.getAttribute('href') ===
          'https://music.apple.com/br/playlist/bossa-nova-lounge/pl.4c6905cc01094522abf4ad746ea745dc'
      )
    ).toBe(true);

    // Initially, before playing, sticky player is hidden
    expect(screen.queryByLabelText(/Carioca Rhythm Sticky Audio Player/i)).not.toBeInTheDocument();

    // Click Shuffle All random play button on the vinyl card to trigger playback
    const shuffleBtn = screen.getByRole('button', { name: /Shuffle All|Modo Aleatório/i });
    expect(shuffleBtn).toBeInTheDocument();
    fireEvent.click(shuffleBtn);

    // Verify global sticky player appears on the right edge of the viewport
    const stickyPlayer = screen.getByLabelText(/Carioca Rhythm Sticky Audio Player/i);
    expect(stickyPlayer).toBeInTheDocument();

    // Verify in-site optimized YouTube Music player iframe is rendered
    expect(screen.getByTitle(/In-Site YouTube Player/i)).toBeInTheDocument();

    // Verify player displays dedicated YouTube Music audio engine branding
    expect(within(stickyPlayer).getAllByText(/YouTube Music/i).length).toBeGreaterThan(0);

    // Verify playlist changer controls exist in the floating player
    expect(within(stickyPlayer).getByText(/Change Playlist|Mudar Playlist/i)).toBeInTheDocument();

    // Verify track title in player matches the active collection and iframe title
    const lapaBtn = within(stickyPlayer).getByRole('button', { name: /Lapa Roots Samba/i });
    fireEvent.click(lapaBtn);
    expect(within(stickyPlayer).getAllByText(/Lapa Roots Samba/i).length).toBeGreaterThan(0);
    expect(screen.getByTitle(/In-Site YouTube Player - Lapa Roots Samba/i)).toBeInTheDocument();

    // Verify control button: Next song advances song within playlist (WITHOUT changing the playlist!)
    const nextBtn = within(stickyPlayer).getAllByRole('button', { name: /Next song in playlist|Próxima música na playlist/i })[0];
    fireEvent.click(nextBtn);
    expect(within(stickyPlayer).getAllByText(/As Rosas Não Falam/i).length).toBeGreaterThan(0);
    expect(within(stickyPlayer).getAllByText(/Lapa Roots Samba/i).length).toBeGreaterThan(0);

    // Verify control button: Prev song retreats song within playlist (WITHOUT changing the playlist!)
    const prevBtn = within(stickyPlayer).getByRole('button', { name: /Previous song in playlist|Música anterior na playlist/i });
    fireEvent.click(prevBtn);
    expect(within(stickyPlayer).getAllByText(/Preciso Me Encontrar/i).length).toBeGreaterThan(0);
    expect(within(stickyPlayer).getAllByText(/Lapa Roots Samba/i).length).toBeGreaterThan(0);

    // Verify control button: Play/Pause toggles playback state
    const pauseBtn = within(stickyPlayer).getByRole('button', { name: /Pause soundscape/i });
    fireEvent.click(pauseBtn);
    expect(within(stickyPlayer).getByRole('button', { name: /Play soundscape/i })).toBeInTheDocument();
    const playBtn = within(stickyPlayer).getByRole('button', { name: /Play soundscape/i });
    fireEvent.click(playBtn);
    expect(within(stickyPlayer).getByRole('button', { name: /Pause soundscape/i })).toBeInTheDocument();

    // Verify control button: Mute toggle
    const muteBtn = within(stickyPlayer).getByRole('button', { name: /Toggle mute/i });
    fireEvent.click(muteBtn);

    // Verify minimizing the player: keeps iframe mounted in DOM to prevent stopping audio
    const minimizeBtn = within(stickyPlayer).getByLabelText(/Minimize to corner|Minimizar no canto/i);
    expect(minimizeBtn).toBeInTheDocument();
    fireEvent.click(minimizeBtn);

    // Minimized compact badge should now be visible with the expand button
    const expandBtn = within(stickyPlayer).getByRole('button', { name: /Expand player|Expandir player/i });
    expect(expandBtn).toBeInTheDocument();

    // Verify responsive centering classes on mobile viewport and right-docking on desktop
    expect(stickyPlayer.className).toMatch(/left-1\/2/);
    expect(stickyPlayer.className).toMatch(/-translate-x-1\/2/);
    expect(stickyPlayer.className).toMatch(/sm:left-auto/);
    expect(stickyPlayer.className).toMatch(/sm:right-6/);
    expect(stickyPlayer.className).toMatch(/sm:translate-x-0/);
    expect(stickyPlayer.className).toMatch(/items-center/);
    expect(stickyPlayer.className).toMatch(/sm:items-end/);

    // Verify minimized badge has the semantic class with pill curvature and touch handling
    const badge = stickyPlayer.querySelector('.player-minimized-badge');
    expect(badge).toBeInTheDocument();

    // CRITICAL: The streaming iframe MUST remain mounted in the DOM when minimized to avoid stopping playback
    expect(screen.getByTitle(/In-Site YouTube Player/i)).toBeInTheDocument();

    // Expand player back to full console
    fireEvent.click(expandBtn);
    expect(within(stickyPlayer).queryByRole('button', { name: /Expand player|Expandir player/i })).not.toBeInTheDocument();

    // Verify close button is present and functional
    const closeBtn = within(stickyPlayer).getByRole('button', { name: /Close audio player/i });
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(screen.queryByLabelText(/Carioca Rhythm Sticky Audio Player/i)).not.toBeInTheDocument();
  });
});
