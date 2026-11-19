import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ConciergeProvider, useConcierge } from './context/ConciergeContext';
import { TopNavBar } from './components/layout/TopNavBar';
import { Footer } from './components/layout/Footer';
import { FloatingStickyPlayer } from './components/audio/FloatingStickyPlayer';
import { GlobalModals } from './components/modals/GlobalModals';
import { ModuleSkeleton } from './components/skeletons/ModuleSkeleton';
import { ConciergeTour } from './components/tour/ConciergeTour';
import { GuestExperienceModule } from './modules/GuestExperienceModule';
import { CariocaRhythmModule } from './modules/CariocaRhythmModule';
import { ExploreCopacabanaModule } from './modules/ExploreCopacabanaModule';
import { SafetyConciergeModule } from './modules/SafetyConciergeModule';
import { AdministrationDashboardModule } from './modules/AdministrationDashboardModule';

const ConciergeShell: React.FC = () => {
  const { activeModule, skeletonMode, toastNotification } = useConcierge();
  const isDarkTheme = activeModule === 'rhythm';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isDarkTheme
          ? 'bg-[#141414] text-[#FAF8F5]'
          : 'bg-copacabana-canvas text-[#1C1C1C]'
      }`}
    >
      <TopNavBar />

      {/* Live Toast Feedback */}
      {toastNotification && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 right-4 sm:right-8 z-50 max-w-md rounded-2xl bg-[#1C1C1C] text-[#FAF8F5] border border-[#9E7E47] px-4 py-3 shadow-2xl flex items-center gap-3 text-xs font-medium"
        >
          <CheckCircle2 className="w-4 h-4 text-[#9E7E47] shrink-0" />
          <span>{toastNotification}</span>
        </div>
      )}

      <main className="flex-1">
        {skeletonMode ? (
          <ModuleSkeleton variant="hero" />
        ) : (
          <>
            {activeModule === 'experience' && <GuestExperienceModule />}
            {activeModule === 'rhythm' && <CariocaRhythmModule />}
            {activeModule === 'explore' && <ExploreCopacabanaModule />}
            {activeModule === 'safety' && <SafetyConciergeModule />}
            {(activeModule === 'management' || activeModule === 'auth') && (
              <AdministrationDashboardModule />
            )}
          </>
        )}
      </main>

      <Footer />
      <FloatingStickyPlayer />
      <GlobalModals />
      <ConciergeTour />
    </div>
  );
};

export function App() {
  return (
    <ConciergeProvider>
      <ConciergeShell />
    </ConciergeProvider>
  );
}

export default App;
