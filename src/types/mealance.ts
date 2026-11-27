export type EffortLevel = 'Bajo' | 'Medio' | 'Alto';

export type DayOfWeek =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'
  | 'Domingo';

export type AllergyId =
  | 'sin_gluten'
  | 'sin_lacteos'
  | 'sin_frutos_secos'
  | 'sin_mariscos'
  | 'sin_huevo'
  | 'ninguna';

export type TasteId =
  | 'pollo'
  | 'pescado'
  | 'vegetariano'
  | 'ensaladas'
  | 'guisos'
  | 'bowls_pastas'
  | 'snacks';

export type GoalPresetId = 'definicion' | 'mantenimiento' | 'alto_proteina';

export type SharedIngredientId =
  | 'tomate'
  | 'espinaca'
  | 'proteina_pack'
  | 'palta'
  | 'pimiento_calabacin'
  | 'quinoa_grano';

export type ShoppingCategory = 'Verduras' | 'Proteínas' | 'Despensa';

export interface RecipeIngredient {
  id: string;
  name: string;
  fractionLabel: string; // ej. "½ tomate", "⅓ bolsa (85g)"
  sharedGroupId?: SharedIngredientId;
  category: ShoppingCategory;
  isHighlightTomato?: boolean;
}

export interface RecipeOption {
  id: string;
  day: DayOfWeek;
  effort: EffortLevel;
  prepTimeMinutes: number;
  title: string;
  subtitle: string;
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFats: number;
  /**
   * Alergias que esta receta CONTIENE de forma nativa si no se adapta.
   * Las recetas en nuestro motor tienen variantes o son libres de estos alérgenos
   * para poder filtrar de verdad.
   */
  containsAllergens: Exclude<AllergyId, 'ninguna'>[];
  tasteTags: TasteId[];
  ingredients: RecipeIngredient[];
  steps: string[];
  chefTip: string;
  badgeText?: string;
}

export interface UserConfig {
  goalId: GoalPresetId;
  calories: number;
  proteinPct: number;
  carbsPct: number;
  fatsPct: number;
  allergies: AllergyId[];
  tastes: TasteId[];
  dailyEffort: Record<DayOfWeek, EffortLevel>;
}

export interface ZeroWasteUsageNode {
  day: DayOfWeek;
  shortDay: string;
  effort: EffortLevel;
  prepMinutes: number;
  fractionUsed: string;
  percentageUsed: number;
  recipeTitle: string;
}

export interface ZeroWasteChain {
  id: SharedIngredientId;
  purchaseItemName: string;
  purchaseQuantityLabel: string;
  category: ShoppingCategory;
  isFeaturedTomato?: boolean;
  accentColor: 'coral' | 'emerald' | 'amber' | 'sky';
  usages: ZeroWasteUsageNode[];
  savingNote: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantityLabel: string;
  category: ShoppingCategory;
  usageSummary: string; // ej: "Mar (½) + Jue (½) · 100% usado"
  daysUsed: DayOfWeek[];
  sharedGroupId?: SharedIngredientId;
  isFeaturedTomato?: boolean;
}
