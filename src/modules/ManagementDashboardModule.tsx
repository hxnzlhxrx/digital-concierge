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
} from 'lucide-react';
import { useConcierge, RequestStatus, ServiceRequest } from '../context/ConciergeContext';

export const ManagementDashboardModule: React.FC = () => {
  const { t, language, requests, advanceRequestStatus, sendBroadcast } = useConcierge();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [broadcastInput, setBroadcastInput] = useState('');

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastInput.trim()) return;
    sendBroadcast(broadcastInput);
    setBroadcastInput('');
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

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#9E7E47]/20 pb-8">
        <div className="space-y-2 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9E7E47]">
            {t.management.tag}
          </p>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#1C1C1C]">
            {t.management.title}
          </h1>
          <p className="text-sm sm:text-base text-[#4E463A] leading-relaxed">
            {t.management.subtitle}
          </p>
        </div>

        {/* Kanban / List View Switcher */}
        <div className="inline-flex items-center bg-[#EAE5DC] p-1 rounded-full border border-[#9E7E47]/30 self-start lg:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
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
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#1C1C1C] text-[#9E7E47] shadow-xs'
                : 'text-[#4E463A] hover:text-[#1C1C1C]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>{t.management.viewList}</span>
          </button>
        </div>
      </section>

      {/* Live Room Status & Occupancy KPIs */}
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

      {/* Real-Time Request Dispatch: Kanban or List View */}
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

      {/* Priority Guest Broadcast Console (Stitched Dark Leather + Mica) */}
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
  );
};
