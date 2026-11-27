import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Flame,
  Heart,
  ShieldAlert,
  Sparkles,
  Zap
} from 'lucide-react';
import {
  ALLERGY_OPTIONS,
  DAYS_OF_WEEK,
  EFFORT_META,
  GOAL_PRESETS,
  TASTE_OPTIONS,
  isVegetarianProfile
} from '../data/mealanceData';
import {
  AllergyId,
  DayOfWeek,
  EffortLevel,
  GoalPresetId,
  TasteId,
  UserConfig
} from '../types/mealance';

interface ConfiguratorViewProps {
  config: UserConfig;
  onChangeConfig: (updater: (prev: UserConfig) => UserConfig) => void;
  onFinish: () => void;
  onBackToLanding: () => void;
  onQuickDemo: () => void;
}

export const ConfiguratorView: React.FC<ConfiguratorViewProps> = ({
  config,
  onChangeConfig,
  onFinish,
  onBackToLanding,
  onQuickDemo
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const stepTitles: Record<1 | 2 | 3 | 4, { title: string; subtitle: string }> = {
    1: {
      title: 'Tus macros y objetivo',
      subtitle: 'Elige un perfil base o ajusta tus calorías y macronutrientes con precisión.'
    },
    2: {
      title: 'Alergias y restricciones',
      subtitle: 'Filtraremos de verdad cada ingrediente y receta para que tu menú sea 100% seguro.'
    },
    3: {
      title: 'Tus gustos de comida',
      subtitle: 'Selecciona qué te provoca comer esta semana para priorizar tus platos favoritos.'
    },
    4: {
      title: 'Nivel de esfuerzo por día',
      subtitle: 'Nuestro diferenciador clave: dime cuánto tiempo tienes cada día y nosotros cruzamos los ingredientes.'
    }
  };

  // Cálculo de gramos diarios según calorías
  const proteinGrams = Math.round((config.calories * (config.proteinPct / 100)) / 4);
  const carbsGrams = Math.round((config.calories * (config.carbsPct / 100)) / 4);
  const fatsGrams = Math.round((config.calories * (config.fatsPct / 100)) / 9);

  const handleSelectGoalPreset = (presetId: GoalPresetId) => {
    const preset = GOAL_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    onChangeConfig((prev) => ({
      ...prev,
      goalId: preset.id,
      calories: preset.calories,
      proteinPct: preset.proteinPct,
      carbsPct: preset.carbsPct,
      fatsPct: preset.fatsPct
    }));
  };

  const handleMacroSliderChange = (
    changed: 'proteinPct' | 'carbsPct' | 'fatsPct',
    newValue: number
  ) => {
    const clamped = Math.max(15, Math.min(60, newValue));
    onChangeConfig((prev) => {
      const remaining = 100 - clamped;
      if (changed === 'proteinPct') {
        const otherSum = prev.carbsPct + prev.fatsPct || 1;
        const newCarbs = Math.round((prev.carbsPct / otherSum) * remaining);
        const newFats = remaining - newCarbs;
        return { ...prev, proteinPct: clamped, carbsPct: newCarbs, fatsPct: newFats };
      }
      if (changed === 'carbsPct') {
        const otherSum = prev.proteinPct + prev.fatsPct || 1;
        const newProtein = Math.round((prev.proteinPct / otherSum) * remaining);
        const newFats = remaining - newProtein;
        return { ...prev, carbsPct: clamped, proteinPct: newProtein, fatsPct: newFats };
      }
      const otherSum = prev.proteinPct + prev.carbsPct || 1;
      const newProtein = Math.round((prev.proteinPct / otherSum) * remaining);
      const newCarbs = remaining - newProtein;
      return { ...prev, fatsPct: clamped, proteinPct: newProtein, carbsPct: newCarbs };
    });
  };

  const handleToggleAllergy = (id: AllergyId) => {
    onChangeConfig((prev) => {
      if (id === 'ninguna') {
        return { ...prev, allergies: ['ninguna'] };
      }
      const withoutNone = prev.allergies.filter((a) => a !== 'ninguna');
      const exists = withoutNone.includes(id);
      const next = exists
        ? withoutNone.filter((a) => a !== id)
        : [...withoutNone, id];
      return {
        ...prev,
        allergies: next.length === 0 ? ['ninguna'] : next
      };
    });
  };

  const handleToggleTaste = (id: TasteId) => {
    onChangeConfig((prev) => {
      const exists = prev.tastes.includes(id);
      if (exists && prev.tastes.length === 1) {
        // Mantener al menos 1 preferencia activa
        return prev;
      }
      const next = exists
        ? prev.tastes.filter((t) => t !== id)
        : [...prev.tastes, id];
      return { ...prev, tastes: next };
    });
  };

  const handleSetDayEffort = (day: DayOfWeek, effort: EffortLevel) => {
    onChangeConfig((prev) => ({
      ...prev,
      dailyEffort: {
        ...prev.dailyEffort,
        [day]: effort
      }
    }));
  };

  const applyWeekEffortPreset = (presetType: 'realista' | 'express' | 'foodie') => {
    const map: Record<'realista' | 'express' | 'foodie', Record<DayOfWeek, EffortLevel>> = {
      realista: {
        Lunes: 'Bajo',
        Martes: 'Bajo',
        Miércoles: 'Medio',
        Jueves: 'Medio',
        Viernes: 'Bajo',
        Sábado: 'Alto',
        Domingo: 'Medio'
      },
      express: {
        Lunes: 'Bajo',
        Martes: 'Bajo',
        Miércoles: 'Bajo',
        Jueves: 'Medio',
        Viernes: 'Bajo',
        Sábado: 'Medio',
        Domingo: 'Bajo'
      },
      foodie: {
        Lunes: 'Bajo',
        Martes: 'Medio',
        Miércoles: 'Medio',
        Jueves: 'Medio',
        Viernes: 'Alto',
        Sábado: 'Alto',
        Domingo: 'Alto'
      }
    };
    onChangeConfig((prev) => ({
      ...prev,
      dailyEffort: map[presetType]
    }));
  };

  const progressPercentage = (step / 4) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4 sm:px-6 sm:pt-8 animate-fade-in-up">
      {/* Top Bar: Back + Step Indicator + Fast Demo Shortcut */}
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            if (step === 1) onBackToLanding();
            else setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
          }}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{step === 1 ? 'Inicio' : 'Paso anterior'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-[#10B981]">
            Paso {step} de 4
          </span>
          <button
            type="button"
            onClick={onQuickDemo}
            className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-2.5 py-1.5 text-[11px] font-bold text-white transition hover:bg-slate-800"
            title="Saltar configuración y ver demo cargada"
          >
            <Zap className="h-3 w-3 text-[#EF4444]" />
            <span>Demo rápida</span>
          </button>
        </div>
      </div>

      {/* Interactive Progress Bar + Stepper Dots */}
      <div className="mb-6">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="mt-2.5 grid grid-cols-4 gap-2">
          {[
            { num: 1, label: '1. Macros' },
            { num: 2, label: '2. Alergias' },
            { num: 3, label: '3. Gustos' },
            { num: 4, label: '4. Esfuerzo' }
          ].map((item) => {
            const isCurrent = step === item.num;
            const isDone = step > item.num;
            return (
              <button
                key={item.num}
                type="button"
                onClick={() => setStep(item.num as 1 | 2 | 3 | 4)}
                className={`rounded-xl py-1.5 text-center text-[11px] font-bold transition ${
                  isCurrent
                    ? 'bg-emerald-50 text-[#10B981] border border-emerald-200'
                    : isDone
                    ? 'bg-white text-[#0F172A] border border-slate-200'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Header */}
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
          {stepTitles[step].title}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {stepTitles[step].subtitle}
        </p>
      </div>

      {/* ================================================= */}
      {/* PASO 1: MACROS Y OBJETIVO                         */}
      {/* ================================================= */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in-up">
          {/* 3 Goal Preset Cards */}
          <div className="grid gap-3 sm:grid-cols-3">
            {GOAL_PRESETS.map((preset) => {
              const selected = config.goalId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectGoalPreset(preset.id)}
                  className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                    selected
                      ? 'border-2 border-[#10B981] bg-emerald-50/50 shadow-sm'
                      : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          selected
                            ? 'bg-[#10B981] text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {preset.badge}
                      </span>
                      {selected && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2.5 font-heading text-base font-extrabold text-[#0F172A]">
                      {preset.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {preset.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-slate-200/70 pt-2.5 text-xs font-bold text-[#0F172A]">
                    <span>{preset.calories} kcal</span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {preset.proteinPct}P / {preset.carbsPct}C / {preset.fatsPct}G
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Calories & Macros Sliders Card */}
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-soft sm:p-6">
            {/* Calories Slider */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981]">
                    <Flame className="h-4 w-4" />
                  </div>
                  <div>
                    <label
                      htmlFor="calories-slider"
                      className="font-heading text-sm font-bold text-[#0F172A]"
                    >
                      Meta calórica diaria
                    </label>
                    <p className="text-xs text-slate-500">
                      Desliza para ajustar tus porciones semanales
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#0F172A] px-3.5 py-1.5 text-right text-white">
                  <span className="font-heading text-lg font-extrabold text-[#10B981]">
                    {config.calories}
                  </span>
                  <span className="ml-1 text-xs font-medium text-slate-300">kcal/día</span>
                </div>
              </div>

              <div className="mt-4">
                <input
                  id="calories-slider"
                  type="range"
                  min={1600}
                  max={2800}
                  step={50}
                  value={config.calories}
                  onChange={(e) =>
                    onChangeConfig((prev) => ({
                      ...prev,
                      calories: Number(e.target.value)
                    }))
                  }
                  className="mealance-slider"
                />
                <div className="mt-1.5 flex justify-between text-[11px] font-medium text-slate-400">
                  <span>1600 kcal (Ligero)</span>
                  <span>2200 kcal (Medio)</span>
                  <span>2800 kcal (Alto)</span>
                </div>
              </div>
            </div>

            {/* Macros Distribution Sliders */}
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-heading text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Distribución de Macronutrientes (100%)
                </p>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-[#10B981]">
                  Balance automático activo
                </span>
              </div>

              {/* Proteínas */}
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-bold text-[#0F172A]">
                    Proteínas{' '}
                    <span className="font-normal text-slate-500">
                      (Construcción muscular y saciedad)
                    </span>
                  </span>
                  <span className="font-heading font-extrabold text-[#10B981]">
                    {config.proteinPct}% · {proteinGrams}g
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={50}
                  step={1}
                  value={config.proteinPct}
                  onChange={(e) =>
                    handleMacroSliderChange('proteinPct', Number(e.target.value))
                  }
                  className="mealance-slider"
                />
              </div>

              {/* Carbohidratos */}
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-bold text-[#0F172A]">
                    Carbohidratos{' '}
                    <span className="font-normal text-slate-500">
                      (Energía limpia de absorción lenta)
                    </span>
                  </span>
                  <span className="font-heading font-extrabold text-amber-600">
                    {config.carbsPct}% · {carbsGrams}g
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={55}
                  step={1}
                  value={config.carbsPct}
                  onChange={(e) =>
                    handleMacroSliderChange('carbsPct', Number(e.target.value))
                  }
                  className="mealance-slider"
                />
              </div>

              {/* Grasas */}
              <div>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-bold text-[#0F172A]">
                    Grasas saludables{' '}
                    <span className="font-normal text-slate-500">
                      (Palta, aceite de oliva y semillas)
                    </span>
                  </span>
                  <span className="font-heading font-extrabold text-sky-600">
                    {config.fatsPct}% · {fatsGrams}g
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={45}
                  step={1}
                  value={config.fatsPct}
                  onChange={(e) =>
                    handleMacroSliderChange('fatsPct', Number(e.target.value))
                  }
                  className="mealance-slider"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* PASO 2: ALERGIAS Y RESTRICCIONES                  */}
      {/* ================================================= */}
      {step === 2 && (
        <div className="space-y-4 animate-fade-in-up">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ALLERGY_OPTIONS.map((item) => {
              const selected = config.allergies.includes(item.id);
              const isNone = item.id === 'ninguna';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleAllergy(item.id)}
                  className={`flex items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-all ${
                    selected
                      ? isNone
                        ? 'border-2 border-[#10B981] bg-emerald-50/60 shadow-sm'
                        : 'border-2 border-[#0F172A] bg-slate-900 text-white shadow-sm'
                      : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-heading text-sm font-extrabold ${
                          selected && !isNone ? 'text-white' : 'text-[#0F172A]'
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected && !isNone && (
                        <span className="rounded-full bg-[#EF4444] px-2 py-0.5 text-[10px] font-bold text-white">
                          Excluido
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1 text-xs ${
                        selected && !isNone ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                      selected
                        ? 'border-[#10B981] bg-[#10B981] text-white'
                        : 'border-slate-300 bg-slate-50 text-transparent'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live feedback banner */}
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs text-emerald-900">
            <ShieldAlert className="h-5 w-5 shrink-0 text-[#10B981]" />
            <div>
              <p className="font-heading font-bold">
                Filtrado inteligente activo en tiempo real
              </p>
              <p className="mt-0.5 text-emerald-700">
                {config.allergies.includes('ninguna')
                  ? 'Todas las recetas mediterráneas y frescas están habilitadas.'
                  : `Hemos bloqueado todos los platos e ingredientes que contengan: ${config.allergies
                      .map((a) => ALLERGY_OPTIONS.find((o) => o.id === a)?.label)
                      .join(', ')}.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* PASO 3: GUSTOS DE COMIDA                          */}
      {/* ================================================= */}
      {step === 3 && (
        <div className="space-y-5 animate-fade-in-up">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TASTE_OPTIONS.map((taste) => {
              const selected = config.tastes.includes(taste.id);
              return (
                <button
                  key={taste.id}
                  type="button"
                  onClick={() => handleToggleTaste(taste.id)}
                  className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                    selected
                      ? 'border-2 border-[#10B981] bg-emerald-50/60 shadow-sm'
                      : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{taste.emoji}</span>
                    <span className="font-heading text-xs font-bold text-[#0F172A] sm:text-sm">
                      {taste.label}
                    </span>
                  </div>
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      selected
                        ? 'border-[#10B981] bg-[#10B981] text-white'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
              <Heart className="h-4 w-4 text-[#EF4444]" />
              <span>Adaptación de compra circular según tus gustos:</span>
            </div>
            <p className="mt-1 text-xs text-slate-600">
              {isVegetarianProfile(config.tastes) ? (
                <>
                  🌱 Detectamos perfil <strong className="text-[#10B981]">100% Vegetariano</strong>: tu lote compartido de proteína será{' '}
                  <strong>1 Pack de Tofu Firme Orgánico (600g) + Garbanzos</strong> distribuido entre Martes, Miércoles y Sábado con 0% desperdicio.
                </>
              ) : (
                <>
                  🍗 Combinaremos tus preferencias ({config.tastes.length} seleccionadas) entrelazando{' '}
                  <strong>1 Tomate fresco</strong> (Martes + Jueves), <strong>1 Bolsa de espinaca baby</strong> (Lunes + Miércoles + Viernes) y{' '}
                  <strong>1 Pack de pechuga de pollo de 600g</strong> (Martes + Miércoles + Sábado).
                </>
              )}
            </p>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* PASO 4: NIVEL DE ESFUERZO POR DÍA                 */}
      {/* ================================================= */}
      {step === 4 && (
        <div className="space-y-4 animate-fade-in-up">
          {/* Quick Week Presets */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3">
            <span className="text-xs font-bold text-slate-500">
              Preconfiguración rápida:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => applyWeekEffortPreset('realista')}
                className="rounded-xl bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[#10B981] border border-emerald-200 hover:bg-emerald-100"
              >
                ✨ Semana realista (Recomendado)
              </button>
              <button
                type="button"
                onClick={() => applyWeekEffortPreset('express')}
                className="rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                ⚡ Semana ocupada
              </button>
              <button
                type="button"
                onClick={() => applyWeekEffortPreset('foodie')}
                className="rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                🍷 Foodie fin de semana
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 text-center">
            {(['Bajo', 'Medio', 'Alto'] as EffortLevel[]).map((level) => (
              <div
                key={level}
                className={`rounded-xl border px-2 py-1.5 text-[11px] font-bold ${EFFORT_META[level].pillClass}`}
              >
                <span className="block font-heading">{level}</span>
                <span className="font-normal opacity-90">{EFFORT_META[level].timeRange}</span>
              </div>
            ))}
          </div>

          {/* Monday to Sunday List */}
          <div className="space-y-2.5">
            {DAYS_OF_WEEK.map((day) => {
              const currentEffort = config.dailyEffort[day];
              const isTomatoDay = day === 'Martes' || day === 'Jueves';
              return (
                <div
                  key={day}
                  className={`flex flex-col gap-2.5 rounded-2xl border bg-white p-3.5 shadow-soft transition sm:flex-row sm:items-center sm:justify-between ${
                    isTomatoDay ? 'border-emerald-200/90' : 'border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center justify-between sm:justify-start sm:gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 font-heading text-xs font-bold text-white">
                        {day.slice(0, 3).toUpperCase()}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading text-sm font-extrabold text-[#0F172A]">
                            {day}
                          </span>
                          {day === 'Martes' && (
                            <span className="rounded-full bg-coral-50 px-2 py-0.5 text-[10px] font-bold text-[#EF4444] border border-coral-200">
                              🍅 Usa ½ tomate
                            </span>
                          )}
                          {day === 'Jueves' && (
                            <span className="rounded-full bg-coral-50 px-2 py-0.5 text-[10px] font-bold text-[#EF4444] border border-coral-200">
                              🍅 Completa ½ tomate
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {EFFORT_META[currentEffort].timeRange} ·{' '}
                          {EFFORT_META[currentEffort].shortDesc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3-Level Selector Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-slate-100 p-1 sm:w-64">
                    {(['Bajo', 'Medio', 'Alto'] as EffortLevel[]).map((level) => {
                      const active = currentEffort === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleSetDayEffort(day, level)}
                          className={`flex flex-col items-center justify-center rounded-lg py-1.5 text-xs font-bold transition-all ${
                            active
                              ? EFFORT_META[level].activeClass
                              : 'text-slate-600 hover:bg-white/60'
                          }`}
                        >
                          <span>{level}</span>
                          <span
                            className={`text-[9px] font-medium ${
                              active ? 'text-white/90' : 'text-slate-400'
                            }`}
                          >
                            {EFFORT_META[level].timeRange}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sticky Bottom Action Bar (Mobile-first ergonomics) */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3.5 backdrop-blur-md sm:static sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#10B981] px-6 py-4 font-heading text-base font-bold text-white shadow-emerald-glow transition hover:bg-[#059669] active:scale-[0.99]"
            >
              <span>Continuar al Paso {step + 1}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#10B981] px-6 py-4 font-heading text-base font-extrabold text-white shadow-emerald-glow transition hover:bg-[#059669] active:scale-[0.99]"
            >
              <Sparkles className="h-5 w-5" />
              <span>Generar mi Plan 0% Desperdicio</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
