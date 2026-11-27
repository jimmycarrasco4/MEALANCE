import React, { useMemo, useState } from 'react';
import {
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Flame,
  Leaf,
  Recycle,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import {
  ALLERGY_OPTIONS,
  DAYS_OF_WEEK,
  EFFORT_META,
  SHORT_DAY_MAP,
  buildShoppingList,
  buildWeeklyMenu,
  buildZeroWasteChains
} from '../data/mealanceData';
import {
  AllergyId,
  DayOfWeek,
  EffortLevel,
  SharedIngredientId,
  ShoppingCategory,
  UserConfig
} from '../types/mealance';

interface DashboardViewProps {
  config: UserConfig;
  onUpdateDayEffort: (day: DayOfWeek, effort: EffortLevel) => void;
  onToggleAllergyLive: (allergy: AllergyId) => void;
  onEditConfig: () => void;
  onResetAll: () => void;
}

type DashboardTab = 'menu' | 'zerowaste' | 'shopping';

const SHARED_INGREDIENT_LABELS: Record<
  SharedIngredientId,
  { name: string; emoji: string; totalPurchased: string }
> = {
  tomate: {
    name: 'Tomate',
    emoji: '🍅',
    totalPurchased: '1 Tomate entero (Mar ½ + Jue ½)'
  },
  espinaca: {
    name: 'Espinaca baby fresca',
    emoji: '🥬',
    totalPurchased: '1 Bolsa de 250g (Lun ⅓ + Mié ⅓ + Vie ⅓)'
  },
  proteina_pack: {
    name: 'Pack Proteína Principal',
    emoji: '🍗',
    totalPurchased: '1 Pack de 600g (Mar 200g + Mié 200g + Sáb 200g)'
  },
  palta: {
    name: 'Palta / Aguacate Hass',
    emoji: '🥑',
    totalPurchased: '1 Palta grande (Lun ½ + Vie ½)'
  },
  pimiento_calabacin: {
    name: 'Pimiento rojo y calabacín',
    emoji: '🫑',
    totalPurchased: '1 unidad c/u (Jue ½ + Dom ½)'
  },
  quinoa_grano: {
    name: 'Quinoa real en grano',
    emoji: '🌾',
    totalPurchased: '1 Paquete de 300g (Lun 100g + Mié 100g + Dom 100g)'
  }
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  config,
  onUpdateDayEffort,
  onToggleAllergyLive,
  onEditConfig,
  onResetAll
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('menu');
  const [selectedDayFilter, setSelectedDayFilter] = useState<DayOfWeek | 'TODOS'>('TODOS');
  const [highlightedSharedId, setHighlightedSharedId] = useState<SharedIngredientId | null>('tomate');
  const [expandedStepsDays, setExpandedStepsDays] = useState<Record<string, boolean>>({
    Martes: true
  });
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [effortSwapNotice, setEffortSwapNotice] = useState<{
    day: DayOfWeek;
    effort: EffortLevel;
  } | null>(null);

  const weeklyMenu = useMemo(() => buildWeeklyMenu(config), [config]);
  const zeroWasteChains = useMemo(
    () => buildZeroWasteChains(config, weeklyMenu),
    [config, weeklyMenu]
  );
  const shoppingList = useMemo(() => buildShoppingList(config), [config]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Días que utilizan el ingrediente compartido actualmente seleccionado
  const daysUsingHighlightedIngredient = useMemo(() => {
    if (!highlightedSharedId) return [];
    return weeklyMenu
      .filter((item) =>
        item.recipe.ingredients.some((ing) => ing.sharedGroupId === highlightedSharedId)
      )
      .map((item) => {
        const ing = item.recipe.ingredients.find(
          (i) => i.sharedGroupId === highlightedSharedId
        );
        return {
          day: item.day,
          shortDay: SHORT_DAY_MAP[item.day],
          fraction: ing?.fractionLabel ?? '',
          recipeTitle: item.recipe.title
        };
      });
  }, [highlightedSharedId, weeklyMenu]);

  const handleDayEffortChange = (day: DayOfWeek, newEffort: EffortLevel) => {
    onUpdateDayEffort(day, newEffort);
    setEffortSwapNotice({ day, effort: newEffort });
    showToast(
      `${day} actualizado a Esfuerzo ${newEffort} manteniendo 0% desperdicio`
    );
    setTimeout(() => {
      setEffortSwapNotice((prev) => (prev?.day === day ? null : prev));
    }, 2200);
  };

  const handleToggleShoppingCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyShoppingList = async () => {
    const categories: ShoppingCategory[] = ['Verduras', 'Proteínas', 'Despensa'];
    const lines: string[] = [
      '🛒 LISTA DE COMPRAS MEALANCE (DOMINGO · 0% DESPERDICIO)',
      `Meta diaria: ${config.calories} kcal (${config.proteinPct}% P / ${config.carbsPct}% C / ${config.fatsPct}% G)`,
      ''
    ];

    categories.forEach((cat) => {
      lines.push(`▪ ${cat.toUpperCase()}:`);
      shoppingList
        .filter((item) => item.category === cat)
        .forEach((item) => {
          const check = checkedItems[item.id] ? '[x]' : '[ ]';
          lines.push(`  ${check} ${item.name} (${item.quantityLabel}) — ${item.usageSummary}`);
        });
      lines.push('');
    });

    lines.push('✅ 100% de ingredientes entrelazados de Lunes a Domingo.');
    const textToCopy = lines.join('\n');

    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('¡Lista de compras copiada al portapapeles!');
    } catch {
      showToast('Lista preparada y copiada para tus notas.');
    }
  };

  const displayedMeals =
    selectedDayFilter === 'TODOS'
      ? weeklyMenu
      : weeklyMenu.filter((m) => m.day === selectedDayFilter);

  const featuredTomatoChain = zeroWasteChains.find((c) => c.isFeaturedTomato);
  const additionalChains = zeroWasteChains.filter((c) => !c.isFeaturedTomato);

  const checkedCount = shoppingList.filter((i) => checkedItems[i.id]).length;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-4 sm:px-6 sm:pt-6 animate-fade-in-up">
      {/* Floating Toast Confirmation */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-[#0F172A] px-4 py-3 text-xs font-bold text-white shadow-xl border border-emerald-500/40 animate-fade-in-up">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* TOP SUMMARY: 3 KEY METRICS                                   */}
      {/* ============================================================ */}
      <div className="mb-4 grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Metric 1: Cumplimiento de Macros */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-soft sm:p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 sm:text-xs">
              Cumplimiento Macros
            </span>
            <Flame className="h-4 w-4 text-[#10B981]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-heading text-xl font-extrabold text-[#0F172A] sm:text-3xl">
              98%
            </span>
            <span className="hidden text-[11px] font-semibold text-[#10B981] sm:inline">
              Exacto
            </span>
          </div>
          <p className="mt-0.5 truncate text-[10px] text-slate-500 sm:text-xs">
            {config.calories} kcal · {config.proteinPct}P/{config.carbsPct}C/{config.fatsPct}G
          </p>
        </div>

        {/* Metric 2: Desperdicio Estimado */}
        <div className="rounded-2xl border-2 border-[#10B981] bg-emerald-50/70 p-3 shadow-soft sm:p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 sm:text-xs">
              Desperdicio Estimado
            </span>
            <Recycle className="h-4 w-4 text-[#10B981]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-heading text-xl font-extrabold text-[#10B981] sm:text-3xl">
              0%
            </span>
            <span className="rounded-full bg-[#10B981] px-1.5 py-0.5 text-[9px] font-bold uppercase text-white sm:text-[10px]">
              0g basura
            </span>
          </div>
          <p className="mt-0.5 truncate text-[10px] font-medium text-emerald-700 sm:text-xs">
            Sin sobras el sábado
          </p>
        </div>

        {/* Metric 3: Ingredientes Aprovechados */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-soft sm:p-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 sm:text-xs">
              Aprovechados
            </span>
            <Leaf className="h-4 w-4 text-[#10B981]" />
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="font-heading text-xl font-extrabold text-[#0F172A] sm:text-3xl">
              100%
            </span>
          </div>
          <p className="mt-0.5 truncate text-[10px] text-slate-500 sm:text-xs">
            11/11 compras cerradas
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ACTIVE PROFILE & QUICK ALLERGY PITCH BAR                     */}
      {/* ============================================================ */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 shadow-soft">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
            Filtro alergias en vivo:
          </span>
          {ALLERGY_OPTIONS.filter((a) => a.id !== 'ninguna').map((allergy) => {
            const isActive = config.allergies.includes(allergy.id);
            return (
              <button
                key={allergy.id}
                type="button"
                onClick={() => {
                  onToggleAllergyLive(allergy.id);
                  showToast(
                    isActive
                      ? `Restricción "${allergy.label}" desactivada`
                      : `Filtrando recetas: "${allergy.label}" activado`
                  );
                }}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold transition ${
                  isActive
                    ? 'bg-[#0F172A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isActive ? `✓ ${allergy.label}` : allergy.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onEditConfig}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-[#0F172A] hover:bg-slate-100"
        >
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#10B981]" />
          <span>Ajustar 4 pasos</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 3 MAIN TABS NAVIGATION                                       */}
      {/* ============================================================ */}
      <div className="mb-6 grid grid-cols-3 gap-1.5 rounded-2xl border border-[#E2E8F0] bg-white p-1.5 shadow-soft">
        <button
          type="button"
          onClick={() => setActiveTab('menu')}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 font-heading text-xs font-extrabold transition-all sm:text-sm ${
            activeTab === 'menu'
              ? 'bg-[#0F172A] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="h-4 w-4 shrink-0 text-[#10B981]" />
          <span className="truncate">Mi Menú Semanal</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('zerowaste')}
          className={`relative flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 font-heading text-xs font-extrabold transition-all sm:text-sm ${
            activeTab === 'zerowaste'
              ? 'bg-[#10B981] text-white shadow-emerald-glow'
              : 'text-slate-600 hover:bg-emerald-50/60'
          }`}
        >
          <Recycle className="h-4 w-4 shrink-0" />
          <span className="truncate">Mapa Desperdicio 0</span>
          <span
            className={`hidden rounded-full px-1.5 py-0.2 text-[9px] font-extrabold uppercase sm:inline ${
              activeTab === 'zerowaste'
                ? 'bg-white text-[#10B981]'
                : 'bg-coral-100 text-[#EF4444]'
            }`}
          >
            Estrella
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shopping')}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 px-2 font-heading text-xs font-extrabold transition-all sm:text-sm ${
            activeTab === 'shopping'
              ? 'bg-[#0F172A] text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="h-4 w-4 shrink-0 text-[#10B981]" />
          <span className="truncate">Lista Compras</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* PESTAÑA A: MI MENÚ SEMANAL                                   */}
      {/* ============================================================ */}
      {activeTab === 'menu' && (
        <div className="space-y-5 animate-fade-in-up">
          {/* Interactive Shared Ingredient Tracer Bar */}
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50/90 via-white to-coral-50/40 p-4 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#10B981]" />
                  <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                    Conexión de Ingredientes Compartidos
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-600">
                  Toca un ingrediente en cualquier plato (o aquí abajo) para iluminar en qué días se comparte al 100%:
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('zerowaste')}
                className="inline-flex items-center gap-1 self-start rounded-xl bg-[#0F172A] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800 sm:self-auto"
              >
                <Recycle className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Ver Mapa Desperdicio Cero</span>
              </button>
            </div>

            {/* Quick Ingredient Chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(Object.keys(SHARED_INGREDIENT_LABELS) as SharedIngredientId[]).map(
                (sharedId) => {
                  const meta = SHARED_INGREDIENT_LABELS[sharedId];
                  const isSelected = highlightedSharedId === sharedId;
                  const isTomato = sharedId === 'tomate';
                  return (
                    <button
                      key={sharedId}
                      type="button"
                      onClick={() =>
                        setHighlightedSharedId((prev) =>
                          prev === sharedId ? null : sharedId
                        )
                      }
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                        isSelected
                          ? isTomato
                            ? 'border-[#EF4444] bg-[#EF4444] text-white shadow-sm'
                            : 'border-[#10B981] bg-[#10B981] text-white shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{meta.emoji}</span>
                      <span>{meta.name}</span>
                    </button>
                  );
                }
              )}
            </div>

            {/* Active Ingredient Breakdown Pill */}
            {highlightedSharedId && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/95 p-3 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-lg">
                    {SHARED_INGREDIENT_LABELS[highlightedSharedId].emoji}
                  </span>
                  <div>
                    <span className="font-heading font-extrabold text-[#0F172A]">
                      {SHARED_INGREDIENT_LABELS[highlightedSharedId].totalPurchased}
                    </span>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {daysUsingHighlightedIngredient.map((node, index) => (
                        <React.Fragment key={node.day}>
                          <button
                            type="button"
                            onClick={() => setSelectedDayFilter(node.day)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                          >
                            <span>{node.day}:</span>
                            <span className="text-[#EF4444]">{node.fraction}</span>
                          </button>
                          {index < daysUsingHighlightedIngredient.length - 1 && (
                            <span className="text-xs font-bold text-slate-400">+</span>
                          )}
                        </React.Fragment>
                      ))}
                      <span className="rounded-lg bg-[#10B981] px-2 py-0.5 text-[11px] font-extrabold text-white">
                        = 100% aprovechado
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Day Filter Selector (Todos | Lun a Dom) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedDayFilter('TODOS')}
              className={`shrink-0 rounded-xl px-3.5 py-2 font-heading text-xs font-extrabold transition ${
                selectedDayFilter === 'TODOS'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-[#E2E8F0] hover:bg-slate-100'
              }`}
            >
              Semana completa (7 días)
            </button>
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = selectedDayFilter === day;
              const sharesHighlighted = daysUsingHighlightedIngredient.some(
                (d) => d.day === day
              );
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    setSelectedDayFilter((prev) => (prev === day ? 'TODOS' : day))
                  }
                  className={`relative shrink-0 rounded-xl px-3.5 py-2 font-heading text-xs font-bold transition ${
                    isSelected
                      ? 'bg-[#10B981] text-white shadow-sm'
                      : sharesHighlighted
                      ? 'bg-emerald-50 text-emerald-900 border-2 border-[#10B981]'
                      : 'bg-white text-slate-600 border border-[#E2E8F0] hover:bg-slate-100'
                  }`}
                >
                  <span>{SHORT_DAY_MAP[day]}</span>
                  {sharesHighlighted && !isSelected && (
                    <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-[#EF4444]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Stacked Weekly Meal Cards */}
          <div className="space-y-4">
            {displayedMeals.map((item) => {
              const {
                day,
                recipe,
                scaledCalories,
                scaledProtein,
                scaledCarbs,
                scaledFats,
                activeAllergySafeLabels
              } = item;

              const currentEffort = config.dailyEffort[day];
              const hasHighlightedIngredient =
                highlightedSharedId !== null &&
                recipe.ingredients.some((i) => i.sharedGroupId === highlightedSharedId);
              const isRecentlySwapped = effortSwapNotice?.day === day;
              const isExpanded = !!expandedStepsDays[day];

              return (
                <div
                  key={day}
                  className={`rounded-3xl border bg-white p-5 shadow-soft transition-all duration-300 sm:p-6 ${
                    hasHighlightedIngredient
                      ? highlightedSharedId === 'tomate'
                        ? 'border-2 border-[#EF4444] ring-4 ring-coral-500/10'
                        : 'border-2 border-[#10B981] ring-4 ring-emerald-500/10'
                      : 'border-[#E2E8F0]'
                  }`}
                >
                  {/* Card Top Header: Day + Effort Live Switcher */}
                  <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-xl bg-[#0F172A] px-3 py-1 font-heading text-xs font-extrabold uppercase tracking-wider text-white">
                        {day}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-bold ${EFFORT_META[currentEffort].pillClass}`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${EFFORT_META[currentEffort].dotColor}`}
                        />
                        <span>Esfuerzo {currentEffort}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                        <span>{recipe.prepTimeMinutes} min</span>
                      </span>

                      {recipe.badgeText && (
                        <span className="inline-flex items-center gap-1 rounded-xl bg-coral-50 px-2.5 py-1 text-[11px] font-extrabold text-[#EF4444] border border-coral-200">
                          🍅 {recipe.badgeText}
                        </span>
                      )}
                    </div>

                    {/* Interactive Live Effort Switcher directly inside the Menu Card */}
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className="text-[11px] font-semibold text-slate-400">
                        Cambiar esfuerzo:
                      </span>
                      <div className="inline-flex rounded-xl bg-slate-100 p-1">
                        {(['Bajo', 'Medio', 'Alto'] as EffortLevel[]).map((lvl) => {
                          const active = currentEffort === lvl;
                          return (
                            <button
                              key={lvl}
                              type="button"
                              onClick={() => handleDayEffortChange(day, lvl)}
                              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                                active
                                  ? EFFORT_META[lvl].activeClass
                                  : 'text-slate-600 hover:bg-white/70'
                              }`}
                            >
                              {lvl}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Recipe Title & Allergy Safe Badges */}
                  <div className="mt-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-heading text-lg font-extrabold text-[#0F172A] sm:text-xl">
                        {recipe.title}
                      </h3>
                      {isRecentlySwapped && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 animate-fade-in-up">
                          <RefreshCw className="h-3 w-3" />
                          Receta adaptada al instante
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      {recipe.subtitle}
                    </p>

                    {activeAllergySafeLabels.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {activeAllergySafeLabels.map((lbl) => (
                          <span
                            key={lbl}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-[#10B981] border border-emerald-200/80"
                          >
                            <Check className="h-3 w-3" />
                            {lbl}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Macros Summary Row */}
                  <div className="mt-4 grid grid-cols-4 gap-2 rounded-2xl bg-slate-50 p-3 border border-slate-200/60">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase text-slate-400">
                        Calorías
                      </span>
                      <span className="font-heading text-sm font-extrabold text-[#0F172A] sm:text-base">
                        {scaledCalories} kcal
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase text-slate-400">
                        Proteína
                      </span>
                      <span className="font-heading text-sm font-extrabold text-[#10B981] sm:text-base">
                        {scaledProtein}g
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase text-slate-400">
                        Carbos
                      </span>
                      <span className="font-heading text-sm font-extrabold text-amber-600 sm:text-base">
                        {scaledCarbs}g
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase text-slate-400">
                        Grasas
                      </span>
                      <span className="font-heading text-sm font-extrabold text-sky-600 sm:text-base">
                        {scaledFats}g
                      </span>
                    </div>
                  </div>

                  {/* Interactive Key Ingredients Tags */}
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Ingredientes exactos (Toca para ver conexión semanal)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.ingredients.map((ing) => {
                        const isShared = !!ing.sharedGroupId;
                        const isThisHighlighted =
                          isShared && ing.sharedGroupId === highlightedSharedId;
                        const isTomato = ing.sharedGroupId === 'tomate';

                        // Buscar en qué otros días se usa este mismo ingrediente
                        const otherDays = isShared
                          ? weeklyMenu
                              .filter(
                                (m) =>
                                  m.day !== day &&
                                  m.recipe.ingredients.some(
                                    (otherIng) =>
                                      otherIng.sharedGroupId === ing.sharedGroupId
                                  )
                              )
                              .map((m) => SHORT_DAY_MAP[m.day])
                          : [];

                        return (
                          <button
                            key={ing.id}
                            type="button"
                            onClick={() => {
                              if (ing.sharedGroupId) {
                                setHighlightedSharedId((prev) =>
                                  prev === ing.sharedGroupId
                                    ? null
                                    : ing.sharedGroupId!
                                );
                              }
                            }}
                            className={`group flex items-center gap-2 rounded-xl border px-3 py-1.5 text-left text-xs transition-all ${
                              isThisHighlighted
                                ? isTomato
                                  ? 'border-[#EF4444] bg-[#EF4444] text-white shadow-sm scale-[1.02]'
                                  : 'border-[#10B981] bg-[#10B981] text-white shadow-sm scale-[1.02]'
                                : isShared
                                ? 'border-emerald-200 bg-emerald-50/50 text-[#0F172A] hover:border-[#10B981]'
                                : 'border-slate-200 bg-white text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-1.5 font-bold">
                                {isTomato && <span>🍅</span>}
                                <span>{ing.name}:</span>
                                <span
                                  className={
                                    isThisHighlighted
                                      ? 'underline decoration-white/80'
                                      : isTomato
                                      ? 'text-[#EF4444]'
                                      : 'text-[#10B981]'
                                  }
                                >
                                  {ing.fractionLabel}
                                </span>
                              </div>
                              {isShared && otherDays.length > 0 && (
                                <span
                                  className={`block text-[10px] font-medium ${
                                    isThisHighlighted
                                      ? 'text-white/90'
                                      : 'text-slate-500'
                                  }`}
                                >
                                  🔗 Compartido con {otherDays.join(' y ')}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Collapsible Preparation Steps & Chef Zero-Waste Tip */}
                  <div className="mt-4 border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedStepsDays((prev) => ({
                          ...prev,
                          [day]: !prev[day]
                        }))
                      }
                      className="flex w-full items-center justify-between text-xs font-bold text-slate-600 hover:text-[#0F172A]"
                    >
                      <span>
                        {isExpanded
                          ? 'Ocultar preparación rápida'
                          : `Ver preparación en ${recipe.steps.length} pasos rápidos y tip 0% desperdicio`}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2.5 rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-700 animate-fade-in-up">
                        <ol className="list-decimal space-y-1.5 pl-4">
                          {recipe.steps.map((stepText, i) => (
                            <li key={i} className="leading-relaxed">
                              {stepText}
                            </li>
                          ))}
                        </ol>
                        <div className="mt-2 flex items-start gap-2 rounded-xl bg-emerald-50 p-2.5 text-[11px] font-medium text-emerald-900 border border-emerald-200/70">
                          <Leaf className="h-4 w-4 shrink-0 text-[#10B981]" />
                          <span>
                            <strong>Tip Zero-Waste:</strong> {recipe.chefTip}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PESTAÑA B: MAPA "DESPERDICIO CERO" (PANTALLA ESTRELLA)       */}
      {/* ============================================================ */}
      {activeTab === 'zerowaste' && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Header Explanation */}
          <div className="rounded-3xl bg-[#0F172A] p-5 text-white shadow-soft sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/20 px-3 py-1 text-xs font-bold text-[#10B981]">
                  <Recycle className="h-3.5 w-3.5" />
                  Arquitectura de Compra Circular
                </span>
                <h2 className="mt-2 font-heading text-xl font-extrabold sm:text-2xl">
                  Mapa &ldquo;Desperdicio Cero&rdquo;: Del Domingo al Sábado
                </h2>
                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  Observa cómo cada ingrediente fresco comprado el domingo se divide matemáticamente entre tus días de menor y mayor tiempo disponible para llegar al sábado con <strong className="text-[#10B981]">0% desperdicio</strong>.
                </p>
              </div>
              <div className="shrink-0 rounded-2xl bg-slate-800/90 p-3.5 text-center border border-slate-700">
                <span className="block font-heading text-2xl font-extrabold text-[#10B981]">
                  100%
                </span>
                <span className="text-[11px] text-slate-300">
                  Consumido antes del Sábado
                </span>
              </div>
            </div>
          </div>

          {/* CASO DESTACADO OBLIGATORIO EN LA PARTE SUPERIOR: 1 TOMATE */}
          {featuredTomatoChain && (
            <div className="relative overflow-hidden rounded-3xl border-2 border-[#EF4444] bg-white p-5 shadow-coral-glow sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-50 text-2xl border border-coral-200">
                    🍅
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#EF4444] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                        Caso Destacado · Trazabilidad Exacta
                      </span>
                    </div>
                    <h3 className="mt-1 font-heading text-lg font-extrabold text-[#0F172A] sm:text-xl">
                      Ciclo Semanal de 1 Tomate Fresco
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 font-heading text-xs font-extrabold text-[#10B981] border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4" />
                  0% desperdicio
                </span>
              </div>

              {/* 4-Step Visual Flow: Domingo -> Martes -> Jueves -> Sábado */}
              <div className="mt-5 grid gap-3.5 sm:grid-cols-4">
                {/* 1. Domingo (Compra) */}
                <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-[#0F172A] px-2.5 py-1 font-heading text-[11px] font-extrabold text-white">
                        Domingo (Compra)
                      </span>
                      <ShoppingBag className="h-4 w-4 text-slate-500" />
                    </div>
                    <p className="mt-3 font-heading text-lg font-extrabold text-[#0F172A]">
                      1 Tomate
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Unidad entera de huerta comprada en tu lista exacta.
                    </p>
                  </div>
                  <div className="mt-3 border-t border-slate-200/80 pt-2 text-[11px] font-bold text-slate-600">
                    Stock disponible: 100%
                  </div>
                </div>

                {/* 2. Martes (Esfuerzo Bajo) */}
                <button
                  type="button"
                  onClick={() => {
                    setHighlightedSharedId('tomate');
                    setSelectedDayFilter('Martes');
                    setActiveTab('menu');
                  }}
                  className="group flex flex-col justify-between rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-4 text-left transition hover:border-[#10B981]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-[#10B981] px-2.5 py-1 font-heading text-[11px] font-extrabold text-white">
                        Martes (Esfuerzo {featuredTomatoChain.usages[0].effort})
                      </span>
                      <span className="font-heading text-xs font-extrabold text-[#EF4444]">
                        -50%
                      </span>
                    </div>
                    <p className="mt-3 font-heading text-lg font-extrabold text-[#EF4444]">
                      ½ tomate
                    </p>
                    <p className="mt-1 font-heading text-xs font-bold text-[#0F172A] group-hover:text-[#10B981]">
                      → {featuredTomatoChain.usages[0].recipeTitle}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Preparación rápida en {featuredTomatoChain.usages[0].prepMinutes} min
                    </p>
                  </div>
                  <div className="mt-3 border-t border-emerald-200/70 pt-2 text-[11px] font-bold text-emerald-800">
                    Queda ½ tomate reservado →
                  </div>
                </button>

                {/* 3. Jueves (Esfuerzo Medio) */}
                <button
                  type="button"
                  onClick={() => {
                    setHighlightedSharedId('tomate');
                    setSelectedDayFilter('Jueves');
                    setActiveTab('menu');
                  }}
                  className="group flex flex-col justify-between rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-4 text-left transition hover:border-amber-500"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-amber-500 px-2.5 py-1 font-heading text-[11px] font-extrabold text-white">
                        Jueves (Esfuerzo {featuredTomatoChain.usages[1].effort})
                      </span>
                      <span className="font-heading text-xs font-extrabold text-[#EF4444]">
                        -50%
                      </span>
                    </div>
                    <p className="mt-3 font-heading text-lg font-extrabold text-[#EF4444]">
                      ½ tomate
                    </p>
                    <p className="mt-1 font-heading text-xs font-bold text-[#0F172A] group-hover:text-amber-700">
                      → {featuredTomatoChain.usages[1].recipeTitle}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Cocción casera en {featuredTomatoChain.usages[1].prepMinutes} min
                    </p>
                  </div>
                  <div className="mt-3 border-t border-amber-200/70 pt-2 text-[11px] font-bold text-amber-800">
                    Completa la unidad entera →
                  </div>
                </button>

                {/* 4. Sábado (Resultado) */}
                <div className="flex flex-col justify-between rounded-2xl bg-[#0F172A] p-4 text-white">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-[#10B981] px-2.5 py-1 font-heading text-[11px] font-extrabold text-white">
                        Sábado (Resultado)
                      </span>
                      <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                    </div>
                    <p className="mt-3 font-heading text-base font-extrabold text-white">
                      100% aprovechado
                    </p>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-full rounded-full bg-[#10B981]" />
                    </div>
                    <div className="mt-2.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/20 px-2.5 py-1 text-[11px] font-extrabold text-[#10B981] border border-[#10B981]/40">
                        ✓ 0% desperdicio
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 border-t border-slate-800 pt-2 text-[11px] text-slate-400">
                    0g de tomate oxidado en el refri
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADDITIONAL 4 ZERO-WASTE INGREDIENT CARDS */}
          <div>
            <h3 className="mb-3 font-heading text-base font-extrabold text-[#0F172A] sm:text-lg">
              Más ingredientes entrelazados al 100% en tu semana
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {additionalChains.map((chain) => {
                const emoji = SHARED_INGREDIENT_LABELS[chain.id]?.emoji ?? '🥗';
                return (
                  <div
                    key={chain.id}
                    className="flex flex-col justify-between rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-soft"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-xl border border-emerald-200/60">
                            {emoji}
                          </span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Domingo (Compra)
                            </span>
                            <h4 className="font-heading text-base font-extrabold text-[#0F172A]">
                              {chain.purchaseItemName}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {chain.purchaseQuantityLabel}
                            </p>
                          </div>
                        </div>

                        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-[#10B981] border border-emerald-200">
                          0% desperdicio
                        </span>
                      </div>

                      {/* Usage Timeline Nodes */}
                      <div className="mt-3.5 space-y-2">
                        {chain.usages.map((usage) => (
                          <button
                            key={usage.day}
                            type="button"
                            onClick={() => {
                              setHighlightedSharedId(chain.id);
                              setSelectedDayFilter(usage.day);
                              setActiveTab('menu');
                            }}
                            className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2.5 text-left transition hover:border-[#10B981] hover:bg-emerald-50/40"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-extrabold text-white ${
                                  usage.effort === 'Bajo'
                                    ? 'bg-[#10B981]'
                                    : usage.effort === 'Medio'
                                    ? 'bg-amber-500'
                                    : 'bg-[#EF4444]'
                                }`}
                              >
                                {usage.day}
                              </span>
                              <div className="min-w-0">
                                <p className="truncate font-heading text-xs font-bold text-[#0F172A]">
                                  {usage.recipeTitle}
                                </p>
                                <p className="text-[10px] text-slate-500">
                                  Esfuerzo {usage.effort} · {usage.prepMinutes} min
                                </p>
                              </div>
                            </div>
                            <span className="ml-2 shrink-0 rounded-lg bg-white px-2.5 py-1 font-heading text-xs font-extrabold text-[#10B981] border border-emerald-200">
                              {usage.fractionUsed}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Saturday Result Progress Bar */}
                    <div className="mt-4 rounded-2xl bg-slate-900 p-3.5 text-white">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">
                          Sábado (Resultado)
                        </span>
                        <span className="font-heading font-extrabold text-[#10B981]">
                          100% aprovechado
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-full rounded-full bg-gradient-to-r from-[#10B981] to-emerald-400" />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-400">
                        {chain.savingNote}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PESTAÑA C: LISTA DE COMPRAS (DOMINGO)                        */}
      {/* ============================================================ */}
      {activeTab === 'shopping' && (
        <div className="space-y-5 animate-fade-in-up">
          {/* Shopping Header Card */}
          <div className="flex flex-col gap-3 rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-extrabold text-[#10B981] border border-emerald-200">
                  Compra Dominical Exacta
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {checkedCount} de {shoppingList.length} listos
                </span>
              </div>
              <h2 className="mt-1 font-heading text-xl font-extrabold text-[#0F172A]">
                Tu Lista de Compras (0% Sobras)
              </h2>
              <p className="text-xs text-slate-500">
                Cada ítem tiene asignados los días exactos en que se consumirá al 100%.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyShoppingList}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#10B981] px-4 py-2.5 font-heading text-xs font-extrabold text-white shadow-emerald-glow transition hover:bg-[#059669]"
              >
                <Copy className="h-4 w-4" />
                <span>Copiar lista de compras</span>
              </button>

              <button
                type="button"
                onClick={onResetAll}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-heading text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reiniciar configuración</span>
              </button>
            </div>
          </div>

          {/* Grouped Categories: Verduras, Proteínas, Despensa */}
          {(['Verduras', 'Proteínas', 'Despensa'] as ShoppingCategory[]).map(
            (category) => {
              const items = shoppingList.filter((i) => i.category === category);
              return (
                <div
                  key={category}
                  className="rounded-3xl border border-[#E2E8F0] bg-white p-5 shadow-soft"
                >
                  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <h3 className="font-heading text-base font-extrabold text-[#0F172A]">
                      {category === 'Verduras' && '🥦 Verduras y Frescos'}
                      {category === 'Proteínas' && '🍗 Proteínas'}
                      {category === 'Despensa' && '🌾 Despensa y Básicos'}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                      {items.length} ítems
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {items.map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleToggleShoppingCheck(item.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleToggleShoppingCheck(item.id);
                            }
                          }}
                          className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all ${
                            isChecked
                              ? 'border-slate-200 bg-slate-50/70 opacity-65'
                              : item.isFeaturedTomato
                              ? 'border-coral-200 bg-coral-50/30 hover:border-[#EF4444]'
                              : 'border-slate-200/80 bg-white hover:border-[#10B981]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition ${
                                isChecked
                                  ? 'border-[#10B981] bg-[#10B981] text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="h-3.5 w-3.5" />}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`font-heading text-sm font-extrabold ${
                                    isChecked
                                      ? 'line-through text-slate-400'
                                      : 'text-[#0F172A]'
                                  }`}
                                >
                                  {item.name}
                                </span>
                                <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                                  {item.quantityLabel}
                                </span>
                              </div>
                              <p
                                className={`mt-1 text-xs font-semibold ${
                                  isChecked
                                    ? 'text-slate-400'
                                    : item.isFeaturedTomato
                                    ? 'text-[#EF4444]'
                                    : 'text-[#10B981]'
                                }`}
                              >
                                {item.usageSummary}
                              </p>
                            </div>
                          </div>

                          <span className="hidden shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-[#10B981] border border-emerald-200 sm:inline-block">
                            100% usado
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};
