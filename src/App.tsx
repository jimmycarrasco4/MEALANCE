import React, { useCallback, useState } from 'react';
import { BrandLogo } from './components/BrandLogo';
import { ConfiguratorView } from './components/ConfiguratorView';
import { DashboardView } from './components/DashboardView';
import { LandingView } from './components/LandingView';
import { TransitionLoader } from './components/TransitionLoader';
import { DEFAULT_USER_CONFIG, DEMO_USER_CONFIG } from './data/mealanceData';
import { AllergyId, DayOfWeek, EffortLevel, UserConfig } from './types/mealance';
import { RotateCcw, Zap } from 'lucide-react';

type AppView = 'landing' | 'configurator' | 'transition' | 'dashboard';

export function App() {
  const [view, setView] = useState<AppView>('landing');
  const [config, setConfig] = useState<UserConfig>(DEFAULT_USER_CONFIG);

  const handleStartWizard = () => {
    setView('configurator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickDemo = () => {
    setConfig(DEMO_USER_CONFIG);
    setView('transition');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishWizard = () => {
    setView('transition');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTransitionComplete = useCallback(() => {
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleUpdateDayEffort = (day: DayOfWeek, effort: EffortLevel) => {
    setConfig((prev) => ({
      ...prev,
      dailyEffort: {
        ...prev.dailyEffort,
        [day]: effort
      }
    }));
  };

  const handleToggleAllergyLive = (allergy: AllergyId) => {
    setConfig((prev) => {
      if (allergy === 'ninguna') {
        return { ...prev, allergies: ['ninguna'] };
      }
      const withoutNone = prev.allergies.filter((a) => a !== 'ninguna');
      const exists = withoutNone.includes(allergy);
      const next = exists
        ? withoutNone.filter((a) => a !== allergy)
        : [...withoutNone, allergy];
      return {
        ...prev,
        allergies: next.length === 0 ? ['ninguna'] : next
      };
    });
  };

  const handleResetAll = () => {
    setConfig(DEFAULT_USER_CONFIG);
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Sticky Header with <BrandLogo /> */}
      <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <BrandLogo onClick={() => setView('landing')} />

          <div className="flex items-center gap-2">
            {view === 'landing' && (
              <button
                type="button"
                onClick={handleQuickDemo}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 font-heading text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Zap className="h-3.5 w-3.5 text-[#EF4444]" />
                <span>Demo 1-clic</span>
              </button>
            )}

            {view === 'dashboard' && (
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-heading text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                <span className="hidden sm:inline">Inicio</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main View Content */}
      <main className="flex-1">
        {view === 'landing' && (
          <LandingView
            onStartWizard={handleStartWizard}
            onQuickDemo={handleQuickDemo}
          />
        )}

        {view === 'configurator' && (
          <ConfiguratorView
            config={config}
            onChangeConfig={setConfig}
            onFinish={handleFinishWizard}
            onBackToLanding={() => setView('landing')}
            onQuickDemo={handleQuickDemo}
          />
        )}

        {view === 'transition' && (
          <TransitionLoader onComplete={handleTransitionComplete} />
        )}

        {view === 'dashboard' && (
          <DashboardView
            config={config}
            onUpdateDayEffort={handleUpdateDayEffort}
            onToggleAllergyLive={handleToggleAllergyLive}
            onEditConfig={() => setView('configurator')}
            onResetAll={handleResetAll}
          />
        )}
      </main>
    </div>
  );
}

export default App;
