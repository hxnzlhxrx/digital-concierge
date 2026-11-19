import React, { useState } from 'react';
import {
  LayoutGrid,
  List,
  Radio,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Crown,
  Send,
  QrCode,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  Wifi,
  Lock,
  Award,
  LogOut,
  Eye,
  EyeOff,
  UserCheck,
  KeyRound,
  SlidersHorizontal,
} from 'lucide-react';
import { useConcierge, RequestStatus, ServiceRequest } from '../context/ConciergeContext';

export const AdministrationDashboardModule: React.FC = () => {
  const {
    t,
    language,
    requests,
    advanceRequestStatus,
    sendBroadcast,
    confirmationCode,
    suiteNumber,
    qrTokenHash,
    refreshQrPass,
    showToast,
    isAdminAuthenticated,
    adminUser,
    adminActiveTab,
    setAdminActiveTab,
    loginAdmin,
    logoutAdmin,
  } = useConcierge();

  // Local state for Login Screen
  const [emailInput, setEmailInput] = useState('concierge.admin@marriott.com');
  const [passwordInput, setPasswordInput] = useState('jw2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Local state for Operations Console
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [broadcastInput, setBroadcastInput] = useState('');

  // Local state for Suite Auth Keycard generator
  const [confInput, setConfInput] = useState(confirmationCode);
  const [suiteInput, setSuiteInput] = useState(suiteNumber);

  // Handle Login submission
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError(null);
    const success = loginAdmin(emailInput, passwordInput);
    if (!success) {
      setLoginError(t.management.invalidCredentialsMsg);
    }
  };

  const handleInstantDemoLogin = () => {
    setLoginError(null);
    loginAdmin('concierge.admin@marriott.com', 'jw2026');
  };

  // Handle Operations Broadcast
  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastInput.trim()) return;
    sendBroadcast(broadcastInput);
    setBroadcastInput('');
  };

  // Handle Suite Key verification
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

  const columns: { status: RequestStatus; label: string }[] = [
    { status: 'pending', label: t.management.statusPending },
    { status: 'in_progress', label: t.management.statusInProgress },
    { status: 'completed', label: t.management.statusCompleted },
  ];

  const renderRequestCard = (req: ServiceRequest) => (
    <div
      key={req.id}
      className="papersheet-card rounded-2xl p-5 space-y-3 border border-[#9E7E47]/25"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] bg-[#1C1C1C] text-[#C5A880]">
          {req.suite} · {req.guestName}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9E7E47]">
          {req.category}
        </span>
      </div>

      <div>
        <h4 className="font-serif-luxury text-base font-semibold text-[#1C1C1C]">
          {req.title}
        </h4>
        <p className="text-xs text-[#4E463A] leading-relaxed mt-1">{req.details}</p>
      </div>

      <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between text-[11px]">
        <span className="text-[#7F7668] font-medium">{req.timestamp}</span>
        <button
          onClick={() => advanceRequestStatus(req.id)}
          className="inline-flex items-center gap-1 font-semibold uppercase tracking-[0.12em] text-[#9E7E47] hover:text-[#1C1C1C] transition-colors cursor-pointer"
        >
          <span>{t.management.advanceStatus}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  // -------------------------------------------------------------
  // 1. UNAUTHENTICATED VIEW: STAFF USER LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
        {/* Top Breadcrumb & Tag */}
        <section className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#9E7E47]/15 border border-[#9E7E47]/30 text-[#9E7E47] text-[10px] font-semibold uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.management.loginBadge}</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1C1C1C]">
            {t.management.loginTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed">
            {t.management.loginSubtitle}
          </p>
        </section>

        {/* Login Card */}
        <div className="max-w-md mx-auto">
          <div className="papersheet-card rounded-3xl p-7 sm:p-10 space-y-7 border border-[#9E7E47]/35 shadow-2xl relative overflow-hidden">
            {/* Top Emblem & Role Badge */}
            <div className="flex flex-col items-center text-center space-y-3 pb-5 border-b border-[#EAE5DC]">
              <img
                src="/assets/jw-marriott-logo.png"
                alt="JW Marriott Griffin Emblem"
                className="h-12 w-auto object-contain"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
                  JW MARRIOTT COPACABANA · STAFF CONSOLE
                </p>
                <div className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-0.5 rounded-full bg-[#1C1C1C] text-[#C5A880] text-[10px] font-semibold uppercase tracking-[0.14em]">
                  <KeyRound className="w-3 h-3 text-[#9E7E47]" />
                  <span>{t.management.roleBadge}</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div
                role="alert"
                className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs leading-relaxed"
              >
                {loginError}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email-input"
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2"
                >
                  {t.management.emailLabel}
                </label>
                <input
                  id="admin-email-input"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-2xl bg-[#FAF8F5] border-b-2 border-[#9E7E47] text-sm font-semibold text-[#1C1C1C] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-password-input"
                  className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2"
                >
                  {t.management.passwordLabel}
                </label>
                <div className="relative">
                  <input
                    id="admin-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder={t.management.passwordPlaceholder}
                    required
                    className="w-full h-12 px-4 pr-11 rounded-2xl bg-[#FAF8F5] border-b-2 border-[#9E7E47] font-mono text-sm text-[#1C1C1C] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7F7668] hover:text-[#1C1C1C] cursor-pointer p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-[#9E7E47]" />
                  <span>{t.management.signInBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handleInstantDemoLogin}
                  className="w-full py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[#FAF8F5] text-[#9E7E47] border border-[#9E7E47]/50 hover:bg-[#9E7E47] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.management.demoLoginBtn}</span>
                </button>
              </div>
            </form>

            {/* Security Notice */}
            <div className="pt-4 border-t border-[#EAE5DC] text-center space-y-1">
              <p className="text-[10px] text-[#7F7668] uppercase tracking-[0.12em] flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 text-[#9E7E47]" />
                <span>{t.management.securityNotice}</span>
              </p>
              <p className="text-[10px] text-[#9E7E47] font-medium">
                {language === 'en'
                  ? 'Demo Quick Access: Password "jw2026" or click "Instant Demo Access"'
                  : 'Acesso Rápido Demo: Senha "jw2026" ou clique em "Acesso Rápido Demo"'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED VIEW: UNIFIED ADMINISTRATION DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
      {/* Executive Staff Header & Sign-Out Bar */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#9E7E47]/20 pb-8">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E7E47]/15 border border-[#9E7E47]/30 text-[#9E7E47] text-[10px] font-semibold uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.management.adminTag}</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1C1C1C]">
            {t.management.adminTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed">
            {t.management.adminSubtitle}
          </p>
        </div>

        {/* Staff Identity & Sign Out Action */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-[#FAF8F5] p-3.5 sm:p-4 rounded-3xl border border-[#9E7E47]/35 shadow-xs self-start lg:self-auto">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1C1C] text-[#C5A880] flex items-center justify-center font-serif text-lg font-bold border border-[#9E7E47]/40">
              CM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#1C1C1C] truncate">
                {adminUser?.name || 'Carlos Mendoza'}
              </p>
              <p className="text-[10px] text-[#9E7E47] font-semibold uppercase tracking-wider truncate">
                {adminUser?.role || 'Chief Concierge & Ops Director'}
              </p>
              <p className="text-[10px] text-[#7F7668] truncate">{adminUser?.email}</p>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-red-50 text-red-700 border border-red-200 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.management.signOutBtn}</span>
          </button>
        </div>
      </section>

      {/* Unified Tab Switcher (All-in-One, Operations, Suite Key QR) */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Administration console tabs"
          className="inline-flex items-center bg-[#EAE5DC] p-1.5 rounded-full border border-[#9E7E47]/30 self-start"
        >
          <button
            role="tab"
            aria-selected={adminActiveTab === 'all'}
            onClick={() => setAdminActiveTab('all')}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
              adminActiveTab === 'all'
                ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-xs'
                : 'text-[#4E463A] hover:text-[#1C1C1C]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{t.management.tabAll}</span>
          </button>

          <button
            role="tab"
            aria-selected={adminActiveTab === 'ops'}
            onClick={() => setAdminActiveTab('ops')}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
              adminActiveTab === 'ops'
                ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-xs'
                : 'text-[#4E463A] hover:text-[#1C1C1C]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{t.management.tabOps}</span>
          </button>

          <button
            role="tab"
            aria-selected={adminActiveTab === 'keys'}
            onClick={() => setAdminActiveTab('keys')}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
              adminActiveTab === 'keys'
                ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-xs'
                : 'text-[#4E463A] hover:text-[#1C1C1C]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{t.management.tabKeys}</span>
          </button>
        </div>

        {/* Kanban / List view switcher for operations */}
        {(adminActiveTab === 'all' || adminActiveTab === 'ops') && (
          <div className="inline-flex items-center bg-[#EAE5DC] p-1 rounded-full border border-[#9E7E47]/30 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('kanban')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-xs'
                  : 'text-[#4E463A] hover:text-[#1C1C1C]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{t.management.viewKanban}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-xs'
                  : 'text-[#4E463A] hover:text-[#1C1C1C]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>{t.management.viewList}</span>
            </button>
          </div>
        )}
      </section>

      {/* Live Room Status & Occupancy KPIs (Visible on All and Operations views) */}
      {(adminActiveTab === 'all' || adminActiveTab === 'ops') && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="papersheet-card rounded-2xl p-6 space-y-2">
            <div className="flex items-center justify-between text-[#9E7E47]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                {t.management.occupancyLabel}
              </span>
              <Users className="w-4 h-4" />
            </div>
            <p className="font-serif-luxury text-3xl font-bold text-[#1C1C1C]">94.2%</p>
            <p className="text-xs text-[#4E463A]">231 / 245 Suites Occupied · 14 Presidential</p>
          </div>

          <div className="papersheet-card rounded-2xl p-6 space-y-2">
            <div className="flex items-center justify-between text-[#9E7E47]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                {t.management.vipArrivalsLabel}
              </span>
              <Crown className="w-4 h-4" />
            </div>
            <p className="font-serif-luxury text-3xl font-bold text-[#1C1C1C]">18 Suites</p>
            <p className="text-xs text-[#4E463A]">Suite 802 (John Doe) Checked-In · Active QR</p>
          </div>

          <div className="papersheet-card rounded-2xl p-6 space-y-2">
            <div className="flex items-center justify-between text-[#9E7E47]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                {t.management.activeRequestsLabel}
              </span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="font-serif-luxury text-3xl font-bold text-[#1C1C1C]">
              {requests.length} Total
            </p>
            <p className="text-xs text-[#4E463A]">
              {requests.filter((r) => r.status === 'pending').length} Pending ·{' '}
              {requests.filter((r) => r.status === 'in_progress').length} In Progress
            </p>
          </div>

          <div className="papersheet-card rounded-2xl p-6 space-y-2">
            <div className="flex items-center justify-between text-[#9E7E47]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                {t.management.avgResponseLabel}
              </span>
              <Clock className="w-4 h-4" />
            </div>
            <p className="font-serif-luxury text-3xl font-bold text-[#1C1C1C]">3m 40s</p>
            <p className="text-xs text-[#4E463A]">Exceeds JW Luxury Benchmark (&lt; 5m)</p>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2A. ALL-IN-ONE VIEW: OPERATIONS & SUITE KEY GENERATOR GRID   */}
      {/* ------------------------------------------------------------- */}
      {adminActiveTab === 'all' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Lg 7): Request Dispatch Queue & Priority Broadcast */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between border-b border-[#9E7E47]/20 pb-3">
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#1C1C1C]">
                {t.management.opsSectionTitle}
              </h2>
              <span className="text-xs font-semibold text-[#9E7E47] uppercase tracking-wider">
                {requests.length} Active Requests
              </span>
            </div>

            {/* Request Dispatch: Kanban or List */}
            {viewMode === 'kanban' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {columns.map((col) => {
                  const colRequests = requests.filter((r) => r.status === col.status);
                  return (
                    <div
                      key={col.status}
                      className="rounded-3xl bg-[#F8F3EA] border border-[#9E7E47]/20 p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#D1C5B5]">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1C1C1C]">
                          {col.label}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1C1C1C] text-[#9E7E47]">
                          {colRequests.length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {colRequests.map((req) => renderRequestCard(req))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="papersheet-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#EAE5DC] bg-[#F8F3EA] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4E463A]">
                        <th className="py-3 px-4">Suite</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Request</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE5DC] text-xs">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-[#FAF8F5]">
                          <td className="py-3 px-4 font-semibold text-[#1C1C1C]">
                            <div>{req.suite}</div>
                            <div className="text-[10px] text-[#7F7668]">{req.guestName}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-[0.12em] bg-[#EAE5DC] text-[#1C1C1C]">
                              {req.category}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-[#1C1C1C]">{req.title}</div>
                            <div className="text-[#4E463A] text-[11px] line-clamp-1">
                              {req.details}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold uppercase tracking-[0.10em] text-[#9E7E47] text-[11px]">
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => advanceRequestStatus(req.id)}
                              className="px-3 py-1 rounded-full bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
                            >
                              {t.management.advanceStatus}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Priority Guest Broadcast Console */}
            <div className="rounded-[28px] leather-dark stitched-brass text-[#FAF8F5] p-6 border border-[#9E7E47]/45 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
                <Radio className="w-3.5 h-3.5" />
                <span>{t.management.broadcastSubtitle}</span>
              </div>
              <h3 className="font-serif-luxury text-xl font-medium text-white">
                {t.management.broadcastTitle}
              </h3>
              <form onSubmit={handleBroadcastSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={broadcastInput}
                  onChange={(e) => setBroadcastInput(e.target.value)}
                  placeholder={t.management.broadcastPlaceholder}
                  className="flex-1 h-11 px-4 rounded-full bg-[#242424] border border-[#9E7E47]/40 text-xs text-white placeholder:text-[#FAF8F5]/45 focus:border-[#9E7E47] focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[#9E7E47] text-white hover:bg-white hover:text-[#1C1C1C] transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.management.broadcastSend}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column (Lg 5): Suite Key QR Generator & Digital Pass Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-[#9E7E47]/20 pb-3">
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#1C1C1C]">
                {t.management.keysSectionTitle}
              </h2>
              <span className="text-xs font-semibold text-[#9E7E47] uppercase tracking-wider">
                {suiteNumber}
              </span>
            </div>

            {/* Stitched Dark Leather Optical QR Pass */}
            <div className="rounded-3xl leather-dark stitched-brass text-[#FAF8F5] p-6 border border-[#9E7E47]/50 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#9E7E47]/25 pb-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/assets/jw-marriott-logo.png"
                    alt="JW Marriott Emblem"
                    className="h-8 w-auto object-contain brightness-0 invert opacity-95"
                  />
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9E7E47]">
                      MARRIOTT BONVOY® TITANIUM
                    </p>
                    <p className="font-serif-luxury text-base font-medium text-white">
                      John Doe · {suiteNumber}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#9E7E47]/20 border border-[#9E7E47] text-[#C5A880] text-[9px] font-semibold uppercase tracking-[0.14em]">
                  <Wifi className="w-3 h-3" />
                  <span>NFC Ready</span>
                </span>
              </div>

              {/* Vector Optical QR Code */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 flex flex-col items-center justify-center text-center border-2 border-[#9E7E47] shadow-inner space-y-3">
                <div
                  role="img"
                  aria-label={`Optical QR Key Pass ${qrTokenHash}`}
                  className="w-40 h-40 p-2.5 bg-white rounded-xl border border-[#D1C5B5] flex flex-col items-center justify-center relative"
                >
                  <svg
                    viewBox="0 0 120 120"
                    className="w-full h-full text-[#1C1C1C]"
                    fill="currentColor"
                  >
                    <path d="M10 10h30v30H10V10zm5 5v20h20V15H15zm5 5h10v10H20V20z" />
                    <path d="M80 10h30v30H80V10zm5 5v20h20V15H85zm5 5h10v10H90V20z" />
                    <path d="M10 80h30v30H10V80zm5 5v20h20V85H15zm5 5h10v10H20V90z" />
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

                <div className="space-y-0.5">
                  <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-[#1C1C1C]">
                    {qrTokenHash}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9E7E47]">
                    {t.auth.nfcReady}
                  </p>
                </div>
              </div>

              {/* Wallet Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleWalletSave('Apple Wallet')}
                  className="py-2.5 px-3 rounded-full bg-white text-[#1C1C1C] hover:bg-[#9E7E47] hover:text-white transition-all text-[11px] font-semibold uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Apple Wallet</span>
                </button>
                <button
                  onClick={() => handleWalletSave('Google Wallet')}
                  className="py-2.5 px-3 rounded-full bg-[#262626] text-[#FAF8F5] border border-[#9E7E47]/50 hover:bg-[#9E7E47] hover:text-white transition-all text-[11px] font-semibold uppercase tracking-[0.12em] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#9E7E47]" />
                  <span>Google Wallet</span>
                </button>
              </div>
            </div>

            {/* Quick Key Regeneration Form */}
            <div className="papersheet-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9E7E47]">
                <RefreshCw className="w-4 h-4" />
                <span>{t.auth.verifyTitle}</span>
              </div>
              <form onSubmit={handleVerifySubmit} className="space-y-3.5">
                <div>
                  <label
                    htmlFor="all-conf-code-input"
                    className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4E463A] mb-1"
                  >
                    {t.auth.confirmationLabel}
                  </label>
                  <input
                    id="all-conf-code-input"
                    type="text"
                    value={confInput}
                    onChange={(e) => setConfInput(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FAF8F5] border-b-2 border-[#9E7E47] font-mono text-xs font-semibold text-[#1C1C1C] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="all-suite-num-input"
                    className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4E463A] mb-1"
                  >
                    {t.auth.suiteNumberLabel}
                  </label>
                  <input
                    id="all-suite-num-input"
                    type="text"
                    value={suiteInput}
                    onChange={(e) => setSuiteInput(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FAF8F5] border-b-2 border-[#9E7E47] text-xs font-semibold text-[#1C1C1C] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-full text-xs font-semibold uppercase tracking-[0.14em] bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#9E7E47]" />
                  <span>{t.auth.regeneratePassCta}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2B. OPERATIONS & DISPATCH DEDICATED FULL-WIDTH VIEW           */}
      {/* ------------------------------------------------------------- */}
      {adminActiveTab === 'ops' && (
        <div className="space-y-8">
          {viewMode === 'kanban' ? (
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {columns.map((col) => {
                const colRequests = requests.filter((r) => r.status === col.status);
                return (
                  <div
                    key={col.status}
                    className="rounded-3xl bg-[#F8F3EA] border border-[#9E7E47]/20 p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#D1C5B5]">
                      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#1C1C1C]">
                        {col.label}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1C1C1C] text-[#9E7E47]">
                        {colRequests.length}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {colRequests.map((req) => renderRequestCard(req))}
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            <section className="papersheet-card rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EAE5DC] bg-[#F8F3EA] text-[10px] font-bold uppercase tracking-[0.18em] text-[#4E463A]">
                      <th className="py-4 px-6">ID & Suite</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Request & Details</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE5DC] text-xs">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-[#FAF8F5]">
                        <td className="py-4 px-6 font-semibold text-[#1C1C1C]">
                          <div>{req.suite}</div>
                          <div className="text-[11px] text-[#7F7668]">{req.guestName}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] bg-[#EAE5DC] text-[#1C1C1C]">
                            {req.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-[#1C1C1C]">{req.title}</div>
                          <div className="text-[#4E463A] mt-0.5">{req.details}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold uppercase tracking-[0.12em] text-[#9E7E47]">
                            {req.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => advanceRequestStatus(req.id)}
                            className="px-3.5 py-1.5 rounded-full bg-[#1C1C1C] text-[#FAF8F5] hover:bg-[#9E7E47] text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer"
                          >
                            {t.management.advanceStatus}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Priority Guest Broadcast Console */}
          <section className="rounded-[32px] leather-dark stitched-brass text-[#FAF8F5] p-6 sm:p-10 border border-[#9E7E47]/45 space-y-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
              <Radio className="w-4 h-4" />
              <span>{t.management.broadcastSubtitle}</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white">
              {t.management.broadcastTitle}
            </h2>

            <form onSubmit={handleBroadcastSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={broadcastInput}
                onChange={(e) => setBroadcastInput(e.target.value)}
                placeholder={t.management.broadcastPlaceholder}
                className="flex-1 h-13 px-5 rounded-full bg-[#242424] border border-[#9E7E47]/40 text-sm text-white placeholder:text-[#FAF8F5]/45 focus:border-[#9E7E47] focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.16em] bg-[#9E7E47] text-white hover:bg-white hover:text-[#1C1C1C] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.management.broadcastSend}</span>
              </button>
            </form>
            <p className="text-xs text-[#FAF8F5]/60">
              {language === 'en'
                ? 'Broadcasts appear immediately in the sticky TopNavBar across all active Guest Suite portals.'
                : 'Os comunicados aparecem imediatamente na barra superior de todos os portais ativos das suítes.'}
            </p>
          </section>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2C. SUITE KEY QR GENERATOR DEDICATED FULL-WIDTH VIEW          */}
      {/* ------------------------------------------------------------- */}
      {adminActiveTab === 'keys' && (
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

            {/* Crisp Vector Optical QR Code */}
            <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center border-2 border-[#9E7E47] shadow-inner space-y-4">
              <div
                role="img"
                aria-label={`Optical QR Key Pass ${qrTokenHash}`}
                className="w-48 h-48 sm:w-56 sm:h-56 p-3 bg-white rounded-2xl border border-[#D1C5B5] flex flex-col items-center justify-center relative"
              >
                <svg
                  viewBox="0 0 120 120"
                  className="w-full h-full text-[#1C1C1C]"
                  fill="currentColor"
                >
                  <path d="M10 10h30v30H10V10zm5 5v20h20V15H15zm5 5h10v10H20V20z" />
                  <path d="M80 10h30v30H80V10zm5 5v20h20V15H85zm5 5h10v10H90V20z" />
                  <path d="M10 80h30v30H10V80zm5 5v20h20V85H15zm5 5h10v10H20V90z" />
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
                    htmlFor="keys-conf-code-input"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2"
                  >
                    {t.auth.confirmationLabel}
                  </label>
                  <input
                    id="keys-conf-code-input"
                    type="text"
                    value={confInput}
                    onChange={(e) => setConfInput(e.target.value)}
                    className="w-full h-13 px-4 rounded-2xl bg-[#FAF8F5] border-b-2 border-[#9E7E47] font-mono text-sm font-semibold text-[#1C1C1C] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="keys-suite-num-input"
                    className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E463A] mb-2"
                  >
                    {t.auth.suiteNumberLabel}
                  </label>
                  <input
                    id="keys-suite-num-input"
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
      )}
    </div>
  );
};
