import React, { useState } from 'react';
import {
  QrCode,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  Wifi,
  Lock,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { useConcierge } from '../context/ConciergeContext';

export const SuiteAuthModule: React.FC = () => {
  const {
    t,
    language,
    confirmationCode,
    suiteNumber,
    qrTokenHash,
    refreshQrPass,
    showToast,
  } = useConcierge();

  const [confInput, setConfInput] = useState(confirmationCode);
  const [suiteInput, setSuiteInput] = useState(suiteNumber);

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refreshQrPass(confInput, suiteInput);
  };

  const handleWalletSave = (provider: 'Apple Wallet' | 'Google Wallet') => {
    showToast(
      language === 'en'
        ? `Suite 802 Digital Key Pass provisioned for ${provider}`
        : `Passe Digital da Suíte 802 provisionado para ${provider}`
    );
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-14">
      {/* Header */}
      <section className="space-y-3 border-b border-[#9E7E47]/20 pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
          {t.auth.tag}
        </p>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1C1C1C]">
          {t.auth.title}
        </h1>
        <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed max-w-3xl">
          {t.auth.subtitle}
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Stitched Dark Leather Optical QR & NFC Digital Pass Card */}
        <div className="lg:col-span-6 rounded-3xl leather-dark stitched-brass text-[#FAF8F5] p-6 sm:p-10 border border-[#9E7E47]/50 shadow-2xl space-y-8">
          <div className="flex items-center justify-between border-b border-[#9E7E47]/25 pb-5">
            <div className="flex items-center gap-3">
              <img
                src="/assets/jw-marriott-logo.png"
                alt="JW Marriott Emblem"
                className="h-10 w-auto object-contain brightness-0 invert opacity-95"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
                  MARRIOTT BONVOY® TITANIUM ELITE
                </p>
                <h2 className="font-serif-luxury text-xl font-medium text-white">
                  John Doe · {suiteNumber}
                </h2>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9E7E47]/20 border border-[#9E7E47] text-[#C5A880] text-[10px] font-semibold uppercase tracking-[0.16em]">
              <Wifi className="w-3.5 h-3.5" />
              <span>NFC / QR</span>
            </span>
          </div>

          {/* Crisp Vector Optical QR Code Representation */}
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center border-2 border-[#9E7E47] shadow-inner space-y-4">
            <div
              role="img"
              aria-label={`Optical QR Key Pass ${qrTokenHash}`}
              className="w-48 h-48 sm:w-56 sm:h-56 p-3 bg-white rounded-2xl border border-[#D1C5B5] flex flex-col items-center justify-center relative"
            >
              {/* High-Contrast Geometric QR Matrix SVG */}
              <svg
                viewBox="0 0 120 120"
                className="w-full h-full text-[#1C1C1C]"
                fill="currentColor"
              >
                {/* Finder Patterns */}
                <path d="M10 10h30v30H10V10zm5 5v20h20V15H15zm5 5h10v10H20V20z" />
                <path d="M80 10h30v30H80V10zm5 5v20h20V15H85zm5 5h10v10H90V20z" />
                <path d="M10 80h30v30H10V80zm5 5v20h20V85H15zm5 5h10v10H20V90z" />
                {/* Data Modules */}
                <rect x="48" y="12" width="6" height="6" />
                <rect x="60" y="12" width="12" height="6" />
                <rect x="48" y="24" width="12" height="6" />
                <rect x="66" y="24" width="6" height="12" />
                <rect x="12" y="48" width="12" height="6" />
                <rect x="30" y="48" width="6" height="12" />
                <rect x="44" y="44" width="32" height="32" rx="6" fill="#9E7E47" />
                <text
                  x="60"
                  y="63"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="serif"
                >
                  JW
                </text>
                <rect x="84" y="48" width="12" height="6" />
                <rect x="102" y="48" width="6" height="18" />
                <rect x="12" y="60" width="6" height="12" />
                <rect x="84" y="60" width="12" height="12" />
                <rect x="48" y="84" width="12" height="6" />
                <rect x="66" y="84" width="6" height="18" />
                <rect x="80" y="84" width="18" height="6" />
                <rect x="102" y="84" width="8" height="12" />
                <rect x="48" y="96" width="6" height="12" />
                <rect x="80" y="96" width="12" height="12" />
                <rect x="96" y="102" width="14" height="6" />
              </svg>
            </div>

            <div className="space-y-1">
              <p className="font-mono text-xs font-bold tracking-[0.18em] text-[#1C1C1C]">
                {qrTokenHash}
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9E7E47]">
                {t.auth.nfcReady}
              </p>
            </div>
          </div>

          {/* Mobile Wallet Integration Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={() => handleWalletSave('Apple Wallet')}
              className="py-3.5 px-4 rounded-full bg-white text-[#1C1C1C] hover:bg-[#9E7E47] hover:text-white transition-all text-xs font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.auth.addToAppleWallet}</span>
            </button>
            <button
              onClick={() => handleWalletSave('Google Wallet')}
              className="py-3.5 px-4 rounded-full bg-[#262626] text-[#FAF8F5] border border-[#9E7E47]/50 hover:bg-[#9E7E47] hover:text-white transition-all text-xs font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#9E7E47]" />
              <span>{t.auth.addToGoogleWallet}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-[#9E7E47]/20 flex items-center justify-between text-[11px] text-[#FAF8F5]/70">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#9E7E47]" />
              {t.auth.passActiveBadge}
            </span>
            <span>{t.auth.ephemeralNotice}</span>
          </div>
        </div>

        {/* Right Column: Passwordless Suite Verification Form & Security Guarantees */}
        <div className="lg:col-span-6 space-y-6">
          <div className="papersheet-card rounded-3xl p-6 sm:p-9 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
                <ShieldCheck className="w-4 h-4" />
                <span>ZERO-PASSWORD CRYPTOGRAPHIC HANDSHAKE</span>
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#1C1C1C]">
                {t.auth.verifyTitle}
              </h2>
              <p className="text-sm text-[#4E463A] leading-relaxed">{t.auth.verifySubtitle}</p>
            </div>

            <form onSubmit={handleVerifySubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="conf-code-input"
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2"
                >
                  {t.auth.confirmationLabel}
                </label>
                <input
                  id="conf-code-input"
                  type="text"
                  value={confInput}
                  onChange={(e) => setConfInput(e.target.value)}
                  className="w-full h-13 px-4 rounded-2xl bg-[#FAF8F5] border-b-2 border-[#9E7E47] font-mono text-sm font-semibold text-[#1C1C1C] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="suite-num-input"
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2"
                >
                  {t.auth.suiteNumberLabel}
                </label>
                <input
                  id="suite-num-input"
                  type="text"
                  value={suiteInput}
                  onChange={(e) => setSuiteInput(e.target.value)}
                  className="w-full h-13 px-4 rounded-2xl bg-[#FAF8F5] border-b-2 border-[#9E7E47] text-sm font-semibold text-[#1C1C1C] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-[#9E7E47]" />
                <span>{t.auth.regeneratePassCta}</span>
              </button>
            </form>
          </div>

          {/* Access Privileges Summary Card */}
          <div className="papersheet-card rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9E7E47]">
              <Award className="w-4 h-4" />
              <span>
                {language === 'en'
                  ? 'Active Suite 802 Keycard Permissions'
                  : 'Permissões Ativas da Chave Digital Suíte 802'}
              </span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#4E463A]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E7E47] shrink-0" />
                <span>8th Floor Oceanfront Presidential Wing & Private Elevator Express</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E7E47] shrink-0" />
                <span>JW Executive Lounge & Rooftop Infinity Pool Terrace (24/7 Access)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#9E7E47] shrink-0" />
                <span>Posto 5 Beach Butler Wristband Pairing & Spa by JW Thermal Suite</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
