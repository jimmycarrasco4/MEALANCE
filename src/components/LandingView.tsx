import React from 'react';
import {
  ArrowRight,
  Clock,
  Flame,
  Heart,
  Leaf,
  Recycle,
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react';

interface LandingViewProps {
  onStartWizard: () => void;
  onQuickDemo: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartWizard,
  onQuickDemo
}) => {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-16 pt-6 sm:px-6 sm:pt-10 animate-fade-in-up">
      {/* Top Pill Badge */}
      <div className="mb-6 flex justify-center sm:justify-start">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#10B981]" />
          <span>Health-Tech · Algoritmo de Compra Circular</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7 text-center sm:text-left">
          <h1 className="font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-[#0F172A] sm:text-5xl">
            Tu menú semanal exacto.{' '}
            <span className="bg-gradient-to-r from-[#10B981] to-emerald-600 bg-clip-text text-transparent">
              0% desperdicio.
            </span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            MEALANCE entrelaza tus ingredientes del domingo para que{' '}
            <strong className="font-semibold text-[#0F172A]">
              ninguna mitad de tomate o bolsa de espinaca termine en la basura
            </strong>
            , sincronizando 4 variables reales de tu vida:
          </p>

          {/* 4 Variables Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            <div className="flex items-start gap-2.5 rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-soft">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#10B981]">
                <Flame className="h-4 w-4" />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-[#0F172A] sm:text-sm">
                  1. Macros y objetivo
                </p>
                <p className="text-[11px] text-slate-500">
                  Kcal, proteína, carbos y grasas a medida
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-soft">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-coral-50 text-[#EF4444]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-[#0F172A] sm:text-sm">
                  2. Alergias reales
                </p>
                <p className="text-[11px] text-slate-500">
                  Filtrado estricto sin lácteos, gluten, etc.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-soft">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Heart className="h-4 w-4" />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-[#0F172A] sm:text-sm">
                  3. Gustos de comida
                </p>
                <p className="text-[11px] text-slate-500">
                  Ensaladas, guisos, bowls, pollo o veggie
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-3.5 shadow-soft">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#10B981] text-white">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-[#0F172A] sm:text-sm">
                  4. Esfuerzo por día
                </p>
                <p className="text-[11px] text-emerald-700 font-medium">
                  12 min el martes, 45 min el sábado
                </p>
              </div>
            </div>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onStartWizard}
              className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#10B981] px-6 py-4 font-heading text-base font-bold text-white shadow-emerald-glow transition-all hover:bg-[#059669] active:scale-[0.99] sm:w-auto"
            >
              <span>Armar mi semana (60 seg)</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onQuickDemo}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#0F172A] bg-white px-5 py-3.5 font-heading text-sm font-bold text-[#0F172A] transition-all hover:bg-slate-900 hover:text-white active:scale-[0.99] sm:w-auto sm:py-4"
            >
              <Zap className="h-4 w-4 text-[#EF4444]" />
              <span>Ver demo rápida</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            ⚡ Sin registro ni tarjeta · Pensado para probarse en vivo desde tu celular
          </p>
        </div>

        {/* Visual Showcase Card: The Tomato Zero-Waste Equation */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-soft sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral-50 text-base">
                  🍅
                </span>
                <div>
                  <p className="font-heading text-xs font-extrabold uppercase tracking-wider text-[#EF4444]">
                    Ejemplo en vivo
                  </p>
                  <p className="font-heading text-sm font-bold text-[#0F172A]">
                    Trazabilidad de 1 Tomate
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[#10B981] border border-emerald-200">
                <Recycle className="h-3.5 w-3.5" />
                0% desperdicio
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {/* Domingo */}
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3.5 py-2.5 border border-slate-200/70">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0F172A] text-[10px] font-bold text-white">
                    DOM
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">Compra exacta</p>
                    <p className="text-[11px] text-slate-500">Lista de supermercado</p>
                  </div>
                </div>
                <span className="rounded-lg bg-white px-2.5 py-1 font-heading text-xs font-extrabold text-[#0F172A] border border-slate-200">
                  1 Tomate entero
                </span>
              </div>

              {/* Martes */}
              <div className="flex items-center justify-between rounded-2xl bg-emerald-50/60 px-3.5 py-2.5 border border-emerald-200/80">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#10B981] text-[10px] font-bold text-white">
                    MAR
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">
                      Ensalada fresca proteica
                    </p>
                    <p className="text-[11px] font-medium text-emerald-700">
                      Esfuerzo Bajo · 12 min
                    </p>
                  </div>
                </div>
                <span className="rounded-lg bg-white px-2.5 py-1 font-heading text-xs font-extrabold text-[#EF4444] border border-coral-200">
                  Usa ½ tomate
                </span>
              </div>

              {/* Jueves */}
              <div className="flex items-center justify-between rounded-2xl bg-amber-50/60 px-3.5 py-2.5 border border-amber-200/80">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500 text-[10px] font-bold text-white">
                    JUE
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">
                      Guiso casero reconfortante
                    </p>
                    <p className="text-[11px] font-medium text-amber-700">
                      Esfuerzo Medio · 30 min
                    </p>
                  </div>
                </div>
                <span className="rounded-lg bg-white px-2.5 py-1 font-heading text-xs font-extrabold text-[#EF4444] border border-coral-200">
                  Usa ½ tomate
                </span>
              </div>

              {/* Sábado Result */}
              <div className="rounded-2xl bg-[#0F172A] p-3.5 text-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">
                    Sábado (Resultado semanal)
                  </span>
                  <span className="font-heading font-extrabold text-[#10B981]">
                    100% aprovechado
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-[#10B981] to-emerald-400" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Leaf className="h-3 w-3 text-[#10B981]" />
                    Aplica también a espinaca, pollo y palta
                  </span>
                  <span className="rounded bg-[#10B981]/20 px-1.5 py-0.5 font-bold text-[#10B981]">
                    0g basura
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
