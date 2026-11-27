import {
  AllergyId,
  DayOfWeek,
  EffortLevel,
  GoalPresetId,
  RecipeIngredient,
  RecipeOption,
  SharedIngredientId,
  ShoppingListItem,
  TasteId,
  UserConfig,
  ZeroWasteChain
} from '../types/mealance';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
];

export const SHORT_DAY_MAP: Record<DayOfWeek, string> = {
  Lunes: 'Lun',
  Martes: 'Mar',
  Miércoles: 'Mié',
  Jueves: 'Jue',
  Viernes: 'Vie',
  Sábado: 'Sáb',
  Domingo: 'Dom'
};

export interface GoalPreset {
  id: GoalPresetId;
  title: string;
  subtitle: string;
  badge: string;
  calories: number;
  proteinPct: number;
  carbsPct: number;
  fatsPct: number;
}

export const GOAL_PRESETS: GoalPreset[] = [
  {
    id: 'definicion',
    title: 'Definición / Ligero',
    subtitle: 'Déficit inteligente con alta saciedad y fibra vegetal',
    badge: 'Déficit suave',
    calories: 1750,
    proteinPct: 35,
    carbsPct: 35,
    fatsPct: 30
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Balanceado',
    subtitle: 'Energía estable todo el día sin picos de glucosa',
    badge: 'Más popular',
    calories: 2100,
    proteinPct: 30,
    carbsPct: 40,
    fatsPct: 30
  },
  {
    id: 'alto_proteina',
    title: 'Alto en Proteína',
    subtitle: 'Recuperación muscular y rendimiento deportivo',
    badge: 'Fuerza & Fitness',
    calories: 2450,
    proteinPct: 40,
    carbsPct: 35,
    fatsPct: 25
  }
];

export const ALLERGY_OPTIONS: {
  id: AllergyId;
  label: string;
  description: string;
}[] = [
  { id: 'sin_gluten', label: 'Sin gluten', description: 'Excluye trigo, cebada, cuscús y pastas tradicionales' },
  { id: 'sin_lacteos', label: 'Sin lácteos', description: 'Excluye quesos, yogur griego, leche y mantequilla' },
  { id: 'sin_frutos_secos', label: 'Sin frutos secos', description: 'Excluye nueces, almendras, maní y anacardos' },
  { id: 'sin_mariscos', label: 'Sin mariscos', description: 'Excluye langostinos, camarones y moluscos' },
  { id: 'sin_huevo', label: 'Sin huevo', description: 'Excluye huevos enteros y mayonesas tradicionales' },
  { id: 'ninguna', label: 'Ninguna', description: 'Sin restricciones alimentarias' }
];

export const TASTE_OPTIONS: {
  id: TasteId;
  label: string;
  emoji: string;
}[] = [
  { id: 'pollo', label: 'Pollo', emoji: '🍗' },
  { id: 'pescado', label: 'Pescado', emoji: '🐟' },
  { id: 'vegetariano', label: 'Vegetariano', emoji: '🌱' },
  { id: 'ensaladas', label: 'Ensaladas frescas', emoji: '🥗' },
  { id: 'guisos', label: 'Guisos caseros', emoji: '🍲' },
  { id: 'bowls_pastas', label: 'Bowls y pastas', emoji: '🥣' },
  { id: 'snacks', label: 'Snacks rápidos', emoji: '⚡' }
];

export const EFFORT_META: Record<
  EffortLevel,
  {
    label: string;
    timeRange: string;
    shortDesc: string;
    pillClass: string;
    activeClass: string;
    dotColor: string;
  }
> = {
  Bajo: {
    label: 'Bajo',
    timeRange: '10–15 min',
    shortDesc: 'Armar, saltear rápido y servir',
    pillClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    activeClass: 'bg-[#10B981] text-white border-[#10B981] shadow-sm',
    dotColor: 'bg-[#10B981]'
  },
  Medio: {
    label: 'Medio',
    timeRange: '25–35 min',
    shortDesc: 'Cocción casera de una sola olla',
    pillClass: 'bg-amber-50 text-amber-700 border-amber-200',
    activeClass: 'bg-amber-500 text-white border-amber-500 shadow-sm',
    dotColor: 'bg-amber-500'
  },
  Alto: {
    label: 'Alto',
    timeRange: '+45 min',
    shortDesc: 'Receta gourmet para disfrutar cocinando',
    pillClass: 'bg-coral-50 text-coral-600 border-coral-200',
    activeClass: 'bg-[#EF4444] text-white border-[#EF4444] shadow-sm',
    dotColor: 'bg-[#EF4444]'
  }
};

export const DEFAULT_USER_CONFIG: UserConfig = {
  goalId: 'mantenimiento',
  calories: 2100,
  proteinPct: 30,
  carbsPct: 40,
  fatsPct: 30,
  allergies: ['ninguna'],
  tastes: ['pollo', 'ensaladas', 'guisos', 'bowls_pastas'],
  dailyEffort: {
    Lunes: 'Bajo',
    Martes: 'Bajo',
    Miércoles: 'Medio',
    Jueves: 'Medio',
    Viernes: 'Bajo',
    Sábado: 'Alto',
    Domingo: 'Medio'
  }
};

export const DEMO_USER_CONFIG: UserConfig = {
  goalId: 'mantenimiento',
  calories: 2100,
  proteinPct: 32,
  carbsPct: 40,
  fatsPct: 28,
  allergies: ['sin_lacteos'],
  tastes: ['pollo', 'ensaladas', 'guisos', 'bowls_pastas', 'vegetariano'],
  dailyEffort: {
    Lunes: 'Bajo',
    Martes: 'Bajo',
    Miércoles: 'Medio',
    Jueves: 'Medio',
    Viernes: 'Bajo',
    Sábado: 'Alto',
    Domingo: 'Medio'
  }
};

/**
 * Determina si el usuario prefiere un menú 100% vegetariano
 * (marcó 'vegetariano' y no marcó 'pollo' ni 'pescado').
 */
export function isVegetarianProfile(tastes: TasteId[]): boolean {
  return tastes.includes('vegetariano') && !tastes.includes('pollo') && !tastes.includes('pescado');
}

/**
 * Catálogo maestro de recetas por día y nivel de esfuerzo.
 * Cada día mantiene sus ingredientes compartidos clave ("Zero-Waste Anchors"):
 * - Lunes: ⅓ Bolsa de espinaca + ½ Palta + ⅓ Quinoa Real
 * - Martes: ½ Tomate (Caso Estrella) + ⅓ Pack Proteína (200g)
 * - Miércoles: ⅓ Bolsa de espinaca + ⅓ Pack Proteína (200g) + ⅓ Quinoa Real
 * - Jueves: ½ Tomate (Caso Estrella) + ½ Pimiento rojo y ½ Calabacín
 * - Viernes: ⅓ Bolsa de espinaca + ½ Palta
 * - Sábado: ⅓ Pack Proteína (200g) + Hierbas y limón
 * - Domingo: ½ Pimiento rojo y ½ Calabacín + ⅓ Quinoa Real
 */
export const MASTER_RECIPES: RecipeOption[] = [
  // ==========================================
  // LUNES (Anclas: ⅓ Espinaca + ½ Palta + ⅓ Quinoa)
  // ==========================================
  {
    id: 'lun-bajo-1',
    day: 'Lunes',
    effort: 'Bajo',
    prepTimeMinutes: 12,
    title: 'Power Bowl Verde de Quinoa, Espinaca y Palta',
    subtitle: 'Bowl fresco de montaje rápido con aderezo cítrico de oliva y semillas',
    baseCalories: 560,
    baseProtein: 34,
    baseCarbs: 54,
    baseFats: 22,
    containsAllergens: [],
    tasteTags: ['ensaladas', 'bowls_pastas', 'vegetariano', 'snacks'],
    ingredients: [
      { id: 'ing-esp-lun', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (85g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pal-lun', name: 'Palta Hass madura', fractionLabel: '½ unidad', sharedGroupId: 'palta', category: 'Verduras' },
      { id: 'ing-qui-lun', name: 'Quinoa real cocida', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' },
      { id: 'ing-gar-lun', name: 'Garbanzos tostados al pimentón', fractionLabel: '½ taza (120g)', category: 'Despensa' }
    ],
    steps: [
      'Coloca la base de espinaca baby fresca y la quinoa tibia en un bowl amplio.',
      'Corta ½ palta Hass en láminas(guarda la otra mitad con su carozo para el viernes).',
      'Agrega los garbanzos especiados y aliña con aceite de oliva virgen extra y limón.'
    ],
    chefTip: 'Guardar la otra ½ palta con unas gotas de limón en envase hermético la mantiene verde hasta el viernes.',
    badgeText: 'Arranque limpio'
  },
  {
    id: 'lun-bajo-2',
    day: 'Lunes',
    effort: 'Bajo',
    prepTimeMinutes: 14,
    title: 'Ensalada Tibia de Quinoa, Huevo Poché y Palta Cremosa',
    subtitle: 'Alto aporte de colina y grasas saludables en menos de 15 minutos',
    baseCalories: 580,
    baseProtein: 36,
    baseCarbs: 50,
    baseFats: 24,
    containsAllergens: ['sin_huevo', 'sin_lacteos'],
    tasteTags: ['ensaladas', 'bowls_pastas', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-lun2', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (85g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pal-lun2', name: 'Palta Hass madura', fractionLabel: '½ unidad', sharedGroupId: 'palta', category: 'Verduras' },
      { id: 'ing-qui-lun2', name: 'Quinoa real cocida', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' },
      { id: 'ing-hue-lun2', name: 'Huevos de campo & queso feta', fractionLabel: '2 unid + 30g', category: 'Proteínas' }
    ],
    steps: [
      'Saltea ligeramente la quinoa con la espinaca baby durante 2 minutos.',
      'Corona con ½ palta en cubos, huevos poché y dados de queso feta.',
      'Termina con pimienta negra recién molida.'
    ],
    chefTip: 'La yema tibia se mezcla con la palta creando una salsa natural sin calorías vacías.'
  },
  {
    id: 'lun-medio-1',
    day: 'Lunes',
    effort: 'Medio',
    prepTimeMinutes: 28,
    title: 'Salteado Cremoso de Quinoa, Espinaca Baby y Palta Grillada',
    subtitle: 'Tipo risotto ligero hecho en sartén con ajo asado y hierbas',
    baseCalories: 590,
    baseProtein: 35,
    baseCarbs: 58,
    baseFats: 22,
    containsAllergens: [],
    tasteTags: ['bowls_pastas', 'guisos', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-lun-m', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (85g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pal-lun-m', name: 'Palta Hass madura', fractionLabel: '½ unidad', sharedGroupId: 'palta', category: 'Verduras' },
      { id: 'ing-qui-lun-m', name: 'Quinoa real en grano', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' },
      { id: 'ing-cal-lun-m', name: 'Caldo vegetal casero y semillas', fractionLabel: '250 ml + 15g', category: 'Despensa' }
    ],
    steps: [
      'Nacra la quinoa con ajo laminado en sartén profunda y añade caldo vegetal caliente.',
      'A los 18 minutos incorpora ⅓ de la bolsa de espinaca baby hasta que funda.',
      'Sirve coronando con ½ palta ligeramente dorada a la plancha.'
    ],
    chefTip: 'Usas exactamente ⅓ del paquete de quinoa y ⅓ de la bolsa de espinaca comprada el domingo.'
  },
  {
    id: 'lun-alto-1',
    day: 'Lunes',
    effort: 'Alto',
    prepTimeMinutes: 45,
    title: 'Timbal Gourmet de Quinoa Crocante, Pesto de Espinaca y Tartar de Palta',
    subtitle: 'Emplatado de restaurante con doble textura y reducción balsámica',
    baseCalories: 610,
    baseProtein: 36,
    baseCarbs: 56,
    baseFats: 25,
    containsAllergens: [],
    tasteTags: ['bowls_pastas', 'ensaladas', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-lun-a', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (85g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pal-lun-a', name: 'Palta Hass madura', fractionLabel: '½ unidad', sharedGroupId: 'palta', category: 'Verduras' },
      { id: 'ing-qui-lun-a', name: 'Quinoa real tricolor', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' },
      { id: 'ing-lim-lun-a', name: 'Aceite de oliva, limón y albahaca', fractionLabel: '2 cdas', category: 'Despensa' }
    ],
    steps: [
      'Cocina la quinoa al dente y dora una parte en horno para lograr textura crocante.',
      'Procesa ⅓ de bolsa de espinaca baby con oliva, limón y ajo para crear una emulsión verde.',
      'Monta en aro con tartar de ½ palta Hass y corona con quinoa crocante.'
    ],
    chefTip: 'Cero sobras de hierbas: la emulsión aprovecha tallos y hojas tiernas al 100%.'
  },

  // ==========================================
  // MARTES (CASO ESTRELLA: ½ Tomate + ⅓ Pack Proteína)
  // ==========================================
  {
    id: 'mar-bajo-1',
    day: 'Martes',
    effort: 'Bajo',
    prepTimeMinutes: 12,
    title: 'Ensalada fresca proteica',
    subtitle: 'Corte rápido con ½ tomate fresco de huerta, proteína dorada y vinagreta cítrica',
    baseCalories: 550,
    baseProtein: 44,
    baseCarbs: 38,
    baseFats: 21,
    containsAllergens: [],
    tasteTags: ['ensaladas', 'pollo', 'snacks', 'vegetariano'],
    ingredients: [
      {
        id: 'ing-tom-mar-b',
        name: 'Tomate',
        fractionLabel: '½ tomate',
        sharedGroupId: 'tomate',
        category: 'Verduras',
        isHighlightTomato: true
      },
      {
        id: 'ing-pro-mar-b',
        name: 'Pechuga de pollo / Proteína',
        fractionLabel: '⅓ pack (200g)',
        sharedGroupId: 'proteina_pack',
        category: 'Proteínas'
      },
      {
        id: 'ing-mix-mar-b',
        name: 'Brotes verdes y pepino crocante',
        fractionLabel: '1 taza',
        category: 'Verduras'
      },
      {
        id: 'ing-oli-mar-b',
        name: 'Aceite de oliva virgen y orégano',
        fractionLabel: '1 cda',
        category: 'Despensa'
      }
    ],
    steps: [
      'Corta exactamente ½ tomate en gajos jugosos (reserva la otra mitad para el guiso del jueves).',
      'Sella 200g (⅓ del pack) de proteína en tiras a fuego vivo durante 6 minutos con orégano.',
      'Mezcla con pepino, hojas frescas y aliña al momento.'
    ],
    chefTip: 'Caso Estrella 0% Desperdicio: el ½ tomate restante queda asignado automáticamente al Jueves.',
    badgeText: 'Caso Estrella · ½ Tomate'
  },
  {
    id: 'mar-bajo-2',
    day: 'Martes',
    effort: 'Bajo',
    prepTimeMinutes: 13,
    title: 'Ensalada fresca proteica estilo Mediterráneo con Feta',
    subtitle: 'Con ½ tomate en dados, pollo grillado, aceitunas y queso feta',
    baseCalories: 575,
    baseProtein: 46,
    baseCarbs: 35,
    baseFats: 24,
    containsAllergens: ['sin_lacteos'],
    tasteTags: ['ensaladas', 'pollo'],
    ingredients: [
      {
        id: 'ing-tom-mar-b2',
        name: 'Tomate',
        fractionLabel: '½ tomate',
        sharedGroupId: 'tomate',
        category: 'Verduras',
        isHighlightTomato: true
      },
      {
        id: 'ing-pro-mar-b2',
        name: 'Pechuga de pollo / Proteína',
        fractionLabel: '⅓ pack (200g)',
        sharedGroupId: 'proteina_pack',
        category: 'Proteínas'
      },
      {
        id: 'ing-fet-mar-b2',
        name: 'Queso feta ligero y aceitunas',
        fractionLabel: '35g',
        category: 'Proteínas'
      }
    ],
    steps: [
      'Pica ½ tomate redondo fresco y combínalo con aceitunas laminadas.',
      'Añade 200g de pechuga grillada en cubos y desmenuza el queso feta por encima.',
      'Rocía con limón fresco y orégano.'
    ],
    chefTip: 'Si activas el filtro "Sin lácteos", esta variante se reemplaza por la versión 100% libre de lácteos.',
    badgeText: 'Caso Estrella · ½ Tomate'
  },
  {
    id: 'mar-medio-1',
    day: 'Martes',
    effort: 'Medio',
    prepTimeMinutes: 28,
    title: 'Sartén Mediterránea Proteica al Tomate Fresco y Hierbas',
    subtitle: 'Cocción jugosa a fuego medio aprovechando ½ tomate y ⅓ pack de proteína',
    baseCalories: 580,
    baseProtein: 45,
    baseCarbs: 42,
    baseFats: 20,
    containsAllergens: [],
    tasteTags: ['pollo', 'guisos', 'bowls_pastas', 'vegetariano'],
    ingredients: [
      {
        id: 'ing-tom-mar-m',
        name: 'Tomate',
        fractionLabel: '½ tomate',
        sharedGroupId: 'tomate',
        category: 'Verduras',
        isHighlightTomato: true
      },
      {
        id: 'ing-pro-mar-m',
        name: 'Pechuga de pollo / Proteína',
        fractionLabel: '⅓ pack (200g)',
        sharedGroupId: 'proteina_pack',
        category: 'Proteínas'
      },
      {
        id: 'ing-pap-mar-m',
        name: 'Papas baby doradas al romero',
        fractionLabel: '150g',
        category: 'Verduras'
      }
    ],
    steps: [
      'Dora las papas baby cortadas en mitades durante 12 minutos en sartén tapada.',
      'Incorpora 200g de proteína y ½ tomate picado en cubos para desglasar los jugos.',
      'Cocina 10 minutos adicionales hasta obtener una salsa brillante natural.'
    ],
    chefTip: 'Aunque cambies el Martes a esfuerzo Medio, sigues usando exactamente ½ tomate para mantener 0% desperdicio.',
    badgeText: 'Caso Estrella · ½ Tomate'
  },
  {
    id: 'mar-alto-1',
    day: 'Martes',
    effort: 'Alto',
    prepTimeMinutes: 46,
    title: 'Suprema Rellena al Horno con Concassé de Tomate Asado',
    subtitle: 'Receta de alta cocina con costra de hierbas y ½ tomate confitado lento',
    baseCalories: 600,
    baseProtein: 47,
    baseCarbs: 44,
    baseFats: 22,
    containsAllergens: [],
    tasteTags: ['pollo', 'guisos', 'vegetariano'],
    ingredients: [
      {
        id: 'ing-tom-mar-a',
        name: 'Tomate',
        fractionLabel: '½ tomate',
        sharedGroupId: 'tomate',
        category: 'Verduras',
        isHighlightTomato: true
      },
      {
        id: 'ing-pro-mar-a',
        name: 'Pechuga de pollo / Proteína',
        fractionLabel: '⅓ pack (200g)',
        sharedGroupId: 'proteina_pack',
        category: 'Proteínas'
      },
      {
        id: 'ing-ajo-mar-a',
        name: 'Ajo confitado, tomillo y batata asada',
        fractionLabel: '140g',
        category: 'Verduras'
      }
    ],
    steps: [
      'Precalienta el horno a 200°C y confita ½ tomate en gajos con ajo y tomillo.',
      'Sella la proteína en sartén de hierro y termina la cocción en horno junto con batata en cubos.',
      'Sirve con los jugos del tomate asado por encima.'
    ],
    chefTip: 'Mantiene intacta la ecuación del tomate: ½ hoy martes + ½ el jueves = 100% aprovechado.',
    badgeText: 'Caso Estrella · ½ Tomate'
  },

  // ==========================================
  // MIÉRCOLES (Anclas: ⅓ Espinaca + ⅓ Pack Proteína + ⅓ Quinoa)
  // ==========================================
  {
    id: 'mie-bajo-1',
    day: 'Miércoles',
    effort: 'Bajo',
    prepTimeMinutes: 14,
    title: 'Salteado Express de Proteína, Espinaca Baby y Quinoa al Limón',
    subtitle: 'Wok rápido de 14 minutos rico en hierro y proteína magra',
    baseCalories: 570,
    baseProtein: 45,
    baseCarbs: 48,
    baseFats: 19,
    containsAllergens: [],
    tasteTags: ['pollo', 'bowls_pastas', 'snacks', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-mie-b', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (85g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pro-mie-b', name: 'Pechuga de pollo / Proteína', fractionLabel: '⅓ pack (200g)', sharedGroupId: 'proteina_pack', category: 'Proteínas' },
      { id: 'ing-qui-mie-b', name: 'Quinoa real cocida', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' }
    ],
    steps: [
      'Corta 200g de proteína en dados pequeños y saltea a fuego alto 6 minutos.',
      'Agrega la quinoa y ⅓ de bolsa de espinaca baby (se reduce con el calor en 60 segundos).',
      'Termina con ralladura de limón y aceite de oliva.'
    ],
    chefTip: 'Con este plato ya consumiste ⅔ de tu bolsa de espinaca y ⅔ del pack de proteína.'
  },
  {
    id: 'mie-medio-1',
    day: 'Miércoles',
    effort: 'Medio',
    prepTimeMinutes: 30,
    title: 'Bowl Caliente de Pollo al Ajo Dorado, Espinaca Salteada y Quinoa',
    subtitle: 'Equilibrio perfecto mitad de semana con salsa ligera de reducción cítrica',
    baseCalories: 595,
    baseProtein: 46,
    baseCarbs: 52,
    baseFats: 20,
    containsAllergens: [],
    tasteTags: ['pollo', 'bowls_pastas', 'guisos', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-mie-m', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (85g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pro-mie-m', name: 'Pechuga de pollo / Proteína', fractionLabel: '⅓ pack (200g)', sharedGroupId: 'proteina_pack', category: 'Proteínas' },
      { id: 'ing-qui-mie-m', name: 'Quinoa real en grano', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' },
      { id: 'ing-sem-mie-m', name: 'Ajo dorado, jengibre y semillas de sésamo', fractionLabel: '1 cda', category: 'Despensa' }
    ],
    steps: [
      'Cocina 100g de quinoa con laurel mientras doras 200g de proteína a la plancha con ajo y jengibre.',
      'En el mismo fondo de cocción, saltea ⅓ de la bolsa de espinaca baby.',
      'Sirve en bowl por capas y espolvorea semillas tostadas.'
    ],
    chefTip: 'Aprovecha la segunda tercera parte de tu bolsa de espinaca antes de que pierda frescura.'
  },
  {
    id: 'mie-alto-1',
    day: 'Miércoles',
    effort: 'Alto',
    prepTimeMinutes: 48,
    title: 'Medallones Braseados sobre Cremoso Verde de Quinoa y Espinaca',
    subtitle: 'Cocción lenta en fondo aromático con costra de hierbas',
    baseCalories: 615,
    baseProtein: 47,
    baseCarbs: 54,
    baseFats: 22,
    containsAllergens: [],
    tasteTags: ['pollo', 'guisos', 'bowls_pastas', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-mie-a', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (85g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pro-mie-a', name: 'Pechuga de pollo / Proteína', fractionLabel: '⅓ pack (200g)', sharedGroupId: 'proteina_pack', category: 'Proteínas' },
      { id: 'ing-qui-mie-a', name: 'Quinoa real en grano', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' }
    ],
    steps: [
      'Brasea 200g de proteína a fuego suave durante 25 minutos con caldo aromático.',
      'Prepara un cremoso de quinoa integrando ⅓ de bolsa de espinaca procesada fina.',
      'Emplata los medallones fileteados sobre la base esmeralda.'
    ],
    chefTip: 'Textura sedosa tipo risotto sin necesidad de crema de leche ni mantequilla.'
  },

  // ==========================================
  // JUEVES (CASO ESTRELLA: ½ Tomate + ½ Pimiento y Calabacín)
  // ==========================================
  {
    id: 'jue-medio-1',
    day: 'Jueves',
    effort: 'Medio',
    prepTimeMinutes: 30,
    title: 'Guiso casero reconfortante',
    subtitle: 'Guiso de una sola olla con el ½ tomate restante del martes, vegetales y legumbres tiernas',
    baseCalories: 585,
    baseProtein: 36,
    baseCarbs: 62,
    baseFats: 19,
    containsAllergens: [],
    tasteTags: ['guisos', 'vegetariano', 'bowls_pastas', 'pollo'],
    ingredients: [
      {
        id: 'ing-tom-jue-m',
        name: 'Tomate',
        fractionLabel: '½ tomate',
        sharedGroupId: 'tomate',
        category: 'Verduras',
        isHighlightTomato: true
      },
      {
        id: 'ing-pim-jue-m',
        name: 'Pimiento rojo y calabacín',
        fractionLabel: '½ unidad c/u',
        sharedGroupId: 'pimiento_calabacin',
        category: 'Verduras'
      },
      {
        id: 'ing-len-jue-m',
        name: 'Lentejas / Garbanzos seleccionados',
        fractionLabel: '1 taza cocida',
        category: 'Proteínas'
      },
      {
        id: 'ing-esp-jue-m',
        name: 'Pimentón dulce, comino y laurel',
        fractionLabel: 'Al gusto',
        category: 'Despensa'
      }
    ],
    steps: [
      'Sofríe a fuego medio el ½ tomate reservado del martes junto con ½ pimiento rojo y ½ calabacín en cubos.',
      'Añade las legumbres, especias mediterráneas y caldo caliente.',
      'Cocina destapado 18 minutos hasta que el guiso espese y concentre todo su sabor casero.'
    ],
    chefTip: '¡Cierre del ciclo del Tomate! Con este ½ tomate usado el jueves alcanzas el 100% de aprovechamiento.',
    badgeText: 'Caso Estrella · Completa 1 Tomate'
  },
  {
    id: 'jue-bajo-1',
    day: 'Jueves',
    effort: 'Bajo',
    prepTimeMinutes: 14,
    title: 'Sartén Rústica Express al Tomate con Calabacín y Proteína',
    subtitle: 'Versión rápida de 14 minutos que aprovecha el ½ tomate restante del martes',
    baseCalories: 560,
    baseProtein: 35,
    baseCarbs: 54,
    baseFats: 20,
    containsAllergens: [],
    tasteTags: ['guisos', 'snacks', 'vegetariano', 'ensaladas'],
    ingredients: [
      {
        id: 'ing-tom-jue-b',
        name: 'Tomate',
        fractionLabel: '½ tomate',
        sharedGroupId: 'tomate',
        category: 'Verduras',
        isHighlightTomato: true
      },
      {
        id: 'ing-pim-jue-b',
        name: 'Pimiento rojo y calabacín',
        fractionLabel: '½ unidad c/u',
        sharedGroupId: 'pimiento_calabacin',
        category: 'Verduras'
      },
      {
        id: 'ing-gar-jue-b',
        name: 'Garbanzos listos al natural',
        fractionLabel: '1 taza',
        category: 'Proteínas'
      }
    ],
    steps: [
      'Ralla o pica el ½ tomate restante del martes en sartén caliente con aceite de oliva.',
      'Saltea ½ pimiento y ½ calabacín en láminas finas durante 6 minutos.',
      'Incorpora los garbanzos para calentar 4 minutos y sirve al instante.'
    ],
    chefTip: 'Aunque tengas poco tiempo el jueves (Esfuerzo Bajo), el ½ tomate se consume al 100%.',
    badgeText: 'Caso Estrella · Completa 1 Tomate'
  },
  {
    id: 'jue-alto-1',
    day: 'Jueves',
    effort: 'Alto',
    prepTimeMinutes: 48,
    title: 'Guiso casero reconfortante a Fuego Lento con Sofrito Caramelizado',
    subtitle: 'Estofado tradicional de cocción pausada con ½ tomate maduro y hortalizas asadas',
    baseCalories: 610,
    baseProtein: 38,
    baseCarbs: 64,
    baseFats: 21,
    containsAllergens: [],
    tasteTags: ['guisos', 'vegetariano', 'bowls_pastas'],
    ingredients: [
      {
        id: 'ing-tom-jue-a',
        name: 'Tomate',
        fractionLabel: '½ tomate',
        sharedGroupId: 'tomate',
        category: 'Verduras',
        isHighlightTomato: true
      },
      {
        id: 'ing-pim-jue-a',
        name: 'Pimiento rojo y calabacín',
        fractionLabel: '½ unidad c/u',
        sharedGroupId: 'pimiento_calabacin',
        category: 'Verduras'
      },
      {
        id: 'ing-len-jue-a',
        name: 'Lentejas pardinas y fondo de hierbas',
        fractionLabel: '1 taza',
        category: 'Proteínas'
      }
    ],
    steps: [
      'Carameliza lentamente el ½ tomate junto con ½ pimiento rojo durante 20 minutos a fuego bajo.',
      'Asa el ½ calabacín para aportar notas ahumadas.',
      'Unifica con las lentejas y hierbas frescas durante 25 minutos adicionales.'
    ],
    chefTip: 'Completa el 100% del tomate comprado el domingo con sabor de cocina de abuela.',
    badgeText: 'Caso Estrella · Completa 1 Tomate'
  },

  // ==========================================
  // VIERNES (Anclas: Último ⅓ Espinaca + Última ½ Palta)
  // ==========================================
  {
    id: 'vie-bajo-1',
    day: 'Viernes',
    effort: 'Bajo',
    prepTimeMinutes: 12,
    title: 'Tacos/Wraps Frescos de Espinaca Baby, Crema de Palta y Atún/Garbanzos',
    subtitle: 'Cena de viernes en 12 minutos que liquida la bolsa de espinaca y la palta al 100%',
    baseCalories: 555,
    baseProtein: 38,
    baseCarbs: 48,
    baseFats: 22,
    containsAllergens: [],
    tasteTags: ['snacks', 'ensaladas', 'pescado', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-vie-b', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (80g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pal-vie-b', name: 'Palta Hass madura', fractionLabel: '½ unidad', sharedGroupId: 'palta', category: 'Verduras' },
      { id: 'ing-tor-vie-b', name: 'Tortillas de maíz 100% sin gluten', fractionLabel: '3 unidades', category: 'Despensa' },
      { id: 'ing-atu-vie-b', name: 'Lomos de atún al natural / Garbanzos', fractionLabel: '140g', category: 'Proteínas' }
    ],
    steps: [
      'Pisa la ½ palta restante del lunes con limón, sal marina y cilantro.',
      'Calienta las tortillas de maíz 1 minuto por lado en sartén seca.',
      'Rellena con el último ⅓ de la bolsa de espinaca baby, la proteína y la crema de palta.'
    ],
    chefTip: '¡Viernes de refri limpio! Aquí terminas al 100% la bolsa de espinaca y la palta entera.',
    badgeText: 'Cierra Espinaca y Palta 100%'
  },
  {
    id: 'vie-medio-1',
    day: 'Viernes',
    effort: 'Medio',
    prepTimeMinutes: 26,
    title: 'Filete de Pescado / Tofu Dorado con Ensalada Tibia de Espinaca y Palta',
    subtitle: 'Cena ligera de viernes con costra cítrica y grasas cardioprotectoras',
    baseCalories: 575,
    baseProtein: 42,
    baseCarbs: 42,
    baseFats: 24,
    containsAllergens: [],
    tasteTags: ['pescado', 'ensaladas', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-vie-m', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (80g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pal-vie-m', name: 'Palta Hass madura', fractionLabel: '½ unidad', sharedGroupId: 'palta', category: 'Verduras' },
      { id: 'ing-pes-vie-m', name: 'Filete de pescado blanco / Tofu grill', fractionLabel: '200g', category: 'Proteínas' }
    ],
    steps: [
      'Dora el filete en sartén antiadherente 4 minutos por lado con limón y eneldo.',
      'Prepara la guarnición con el último ⅓ de bolsa de espinaca baby y la ½ palta restante.',
      'Sirve con unas gotas de aceite de oliva virgen extra.'
    ],
    chefTip: 'Cero hojas marchitas en tu refrigerador al llegar al fin de semana.'
  },
  {
    id: 'vie-alto-1',
    day: 'Viernes',
    effort: 'Alto',
    prepTimeMinutes: 45,
    title: 'Salmón / Tofu Glaseado al Horno sobre Colchón de Espinaca y Mousse de Palta',
    subtitle: 'Viernes gourmet con glaseado cítrico artesanal y texturas contrastantes',
    baseCalories: 615,
    baseProtein: 44,
    baseCarbs: 46,
    baseFats: 26,
    containsAllergens: [],
    tasteTags: ['pescado', 'bowls_pastas', 'vegetariano'],
    ingredients: [
      { id: 'ing-esp-vie-a', name: 'Espinaca baby fresca', fractionLabel: '⅓ bolsa (80g)', sharedGroupId: 'espinaca', category: 'Verduras' },
      { id: 'ing-pal-vie-a', name: 'Palta Hass madura', fractionLabel: '½ unidad', sharedGroupId: 'palta', category: 'Verduras' },
      { id: 'ing-sal-vie-a', name: 'Filete fresco / Tofu marinado', fractionLabel: '210g', category: 'Proteínas' }
    ],
    steps: [
      'Marinar la proteína en cítricos y jengibre durante 15 minutos y hornear a 190°C.',
      'Emulsionar la ½ palta restante hasta lograr una mousse aireada.',
      'Servir sobre el último ⅓ de espinaca baby salteada al instante.'
    ],
    chefTip: 'El 100% de la espinaca (Lun + Mié + Vie) y el 100% de la palta (Lun + Vie) han sido consumidos.'
  },

  // ==========================================
  // SÁBADO (Anclas: Último ⅓ Pack Proteína = 100% del pack antes del fin del sábado)
  // ==========================================
  {
    id: 'sab-alto-1',
    day: 'Sábado',
    effort: 'Alto',
    prepTimeMinutes: 45,
    title: 'Pollo / Tofu al Horno con Papas Rústicas, Limón Asado y Romero Fresco',
    subtitle: 'Plato estrella de sábado para disfrutar cocinando y cerrar el pack de proteína al 100%',
    baseCalories: 620,
    baseProtein: 46,
    baseCarbs: 55,
    baseFats: 22,
    containsAllergens: [],
    tasteTags: ['pollo', 'guisos', 'vegetariano'],
    ingredients: [
      { id: 'ing-pro-sab-a', name: 'Pechuga de pollo / Proteína', fractionLabel: '⅓ pack (200g)', sharedGroupId: 'proteina_pack', category: 'Proteínas' },
      { id: 'ing-pap-sab-a', name: 'Papas rústicas en gajos', fractionLabel: '180g', category: 'Verduras' },
      { id: 'ing-rom-sab-a', name: 'Limón asado, ajo y romero fresco', fractionLabel: '1 unidad', category: 'Despensa' }
    ],
    steps: [
      'Corta las papas en gajos con piel y hornea a 200°C con romero y aceite de oliva.',
      'Incorpora los últimos 200g (⅓ del pack) de proteína marinada en limón y ajo asado.',
      'Dora hasta lograr una piel crujiente por fuera y jugosa por dentro.'
    ],
    chefTip: '¡Hito de Sábado alcanzado! El 100% del tomate, espinaca, palta y pack de proteína ya fue aprovechado.',
    badgeText: '100% Pack Proteína Usado'
  },
  {
    id: 'sab-medio-1',
    day: 'Sábado',
    effort: 'Medio',
    prepTimeMinutes: 30,
    title: 'Brochetas Doradas de Sábado con Vegetales Grillados al Limón',
    subtitle: 'Cocción en plancha de 30 minutos usando el último tercio del pack de proteína',
    baseCalories: 585,
    baseProtein: 45,
    baseCarbs: 48,
    baseFats: 21,
    containsAllergens: [],
    tasteTags: ['pollo', 'ensaladas', 'vegetariano'],
    ingredients: [
      { id: 'ing-pro-sab-m', name: 'Pechuga de pollo / Proteína', fractionLabel: '⅓ pack (200g)', sharedGroupId: 'proteina_pack', category: 'Proteínas' },
      { id: 'ing-pap-sab-m', name: 'Papas doradas en sartén', fractionLabel: '160g', category: 'Verduras' },
      { id: 'ing-lim-sab-m', name: 'Aliño de limón, ajo y perejil', fractionLabel: '2 cdas', category: 'Despensa' }
    ],
    steps: [
      'Corta los últimos 200g del pack de proteína en cubos parejos.',
      'Grilla en plancha bien caliente junto con papas laminadas.',
      'Pincela con limón, ajo y perejil fresco al retirar.'
    ],
    chefTip: 'Completa los 600g del pack de proteína (200g Mar + 200g Mié + 200g Sáb).'
  },
  {
    id: 'sab-bajo-1',
    day: 'Sábado',
    effort: 'Bajo',
    prepTimeMinutes: 15,
    title: 'Fajitas Express de Sábado al Limón y Hierbas en Sartén',
    subtitle: 'Sábado sin complicaciones en 15 minutos con 0% desperdicio',
    baseCalories: 560,
    baseProtein: 44,
    baseCarbs: 46,
    baseFats: 20,
    containsAllergens: [],
    tasteTags: ['pollo', 'snacks', 'vegetariano'],
    ingredients: [
      { id: 'ing-pro-sab-b', name: 'Pechuga de pollo / Proteína', fractionLabel: '⅓ pack (200g)', sharedGroupId: 'proteina_pack', category: 'Proteínas' },
      { id: 'ing-tor-sab-b', name: 'Tortillas de maíz tostadas', fractionLabel: '3 unidades', category: 'Despensa' },
      { id: 'ing-lim-sab-b', name: 'Limón, comino y cilantro fresco', fractionLabel: 'Al gusto', category: 'Despensa' }
    ],
    steps: [
      'Filetea los últimos 200g del pack de proteína en tiras finas.',
      'Saltea 8 minutos a fuego vivo con limón y comino.',
      'Sirve sobre tortillas de maíz tibias.'
    ],
    chefTip: 'En solo 15 minutos completas el 100% del pack de proteína de la semana.'
  },

  // ==========================================
  // DOMINGO (Anclas: Último ½ Pimiento y Calabacín + Último ⅓ Quinoa)
  // ==========================================
  {
    id: 'dom-medio-1',
    day: 'Domingo',
    effort: 'Medio',
    prepTimeMinutes: 28,
    title: 'Buddha Bowl de Domingo con Quinoa y Vegetales Asados al Horno',
    subtitle: 'Cierra la semana con refrigerador 100% vacío antes de la nueva compra',
    baseCalories: 580,
    baseProtein: 34,
    baseCarbs: 60,
    baseFats: 21,
    containsAllergens: [],
    tasteTags: ['bowls_pastas', 'vegetariano', 'ensaladas'],
    ingredients: [
      { id: 'ing-pim-dom-m', name: 'Pimiento rojo y calabacín', fractionLabel: '½ unidad c/u', sharedGroupId: 'pimiento_calabacin', category: 'Verduras' },
      { id: 'ing-qui-dom-m', name: 'Quinoa real en grano', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' },
      { id: 'ing-gar-dom-m', name: 'Garbanzos crocantes y semillas', fractionLabel: '120g', category: 'Proteínas' }
    ],
    steps: [
      'Corta el ½ pimiento rojo y el ½ calabacín restantes del jueves en bastones y dora 15 minutos.',
      'Cocina los últimos 100g (⅓ paquete) de quinoa real.',
      'Combina en un bowl con garbanzos especiados y aceite de oliva.'
    ],
    chefTip: 'Domingo con 0 gramos de verdura olvidada en el cajón del refrigerador.',
    badgeText: 'Cierre Semanal 0% Desperdicio'
  },
  {
    id: 'dom-bajo-1',
    day: 'Domingo',
    effort: 'Bajo',
    prepTimeMinutes: 14,
    title: 'Salteado Rápido de Domingo: Quinoa, Calabacín y Pimiento Rojo',
    subtitle: 'En 14 minutos aprovechas hasta el último gramo de la semana',
    baseCalories: 555,
    baseProtein: 32,
    baseCarbs: 58,
    baseFats: 20,
    containsAllergens: [],
    tasteTags: ['bowls_pastas', 'snacks', 'vegetariano'],
    ingredients: [
      { id: 'ing-pim-dom-b', name: 'Pimiento rojo y calabacín', fractionLabel: '½ unidad c/u', sharedGroupId: 'pimiento_calabacin', category: 'Verduras' },
      { id: 'ing-qui-dom-b', name: 'Quinoa real cocida', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' },
      { id: 'ing-gar-dom-b', name: 'Semillas de calabaza y garbanzos', fractionLabel: '110g', category: 'Proteínas' }
    ],
    steps: [
      'Saltea a fuego alto el ½ pimiento y ½ calabacín restantes en dados pequeños (7 min).',
      'Incorpora el último tercio de quinoa y los garbanzos.',
      'Sirve caliente con hierbas aromáticas.'
    ],
    chefTip: 'Deja tu cocina limpia y sin sobras en menos de 15 minutos.'
  },
  {
    id: 'dom-alto-1',
    day: 'Domingo',
    effort: 'Alto',
    prepTimeMinutes: 46,
    title: 'Pimiento y Calabacín Rellenos de Quinoa Especiada Gratinados al Horno',
    subtitle: 'Almuerzo dominical reconfortante con aprovechamiento 100% integral',
    baseCalories: 605,
    baseProtein: 36,
    baseCarbs: 62,
    baseFats: 22,
    containsAllergens: [],
    tasteTags: ['guisos', 'bowls_pastas', 'vegetariano'],
    ingredients: [
      { id: 'ing-pim-dom-a', name: 'Pimiento rojo y calabacín', fractionLabel: '½ unidad c/u', sharedGroupId: 'pimiento_calabacin', category: 'Verduras' },
      { id: 'ing-qui-dom-a', name: 'Quinoa real en grano', fractionLabel: '⅓ paquete (100g)', sharedGroupId: 'quinoa_grano', category: 'Despensa' },
      { id: 'ing-len-dom-a', name: 'Proteína vegetal / Pollo picado y hierbas', fractionLabel: '130g', category: 'Proteínas' }
    ],
    steps: [
      'Ahueca el ½ pimiento rojo y el ½ calabacín restantes del jueves.',
      'Rellena con el último tercio de quinoa cocida con la pulpa del calabacín y especias.',
      'Hornea 28 minutos a 190°C hasta que estén tiernos y dorados.'
    ],
    chefTip: 'Incluso la pulpa interior del calabacín se integra en el relleno: 0% desperdicio real.'
  }
];

/**
 * Adapta dinámicamente los textos y nombres de proteína si el usuario es vegetariano
 * o tiene alergias específicas, y escala las calorías/macros al objetivo diario.
 */
export interface AdaptedDayMeal {
  day: DayOfWeek;
  recipe: RecipeOption;
  scaledCalories: number;
  scaledProtein: number;
  scaledCarbs: number;
  scaledFats: number;
  activeAllergySafeLabels: string[];
  availableVariantsCount: number;
}

const ALLERGY_SAFE_BADGE_MAP: Record<Exclude<AllergyId, 'ninguna'>, string> = {
  sin_gluten: 'Sin gluten',
  sin_lacteos: 'Sin lácteos',
  sin_frutos_secos: 'Sin frutos secos',
  sin_mariscos: 'Sin mariscos',
  sin_huevo: 'Sin huevo'
};

export function getCompatibleRecipesForDay(
  day: DayOfWeek,
  effort: EffortLevel,
  allergies: AllergyId[]
): RecipeOption[] {
  const activeAllergies = allergies.filter((a): a is Exclude<AllergyId, 'ninguna'> => a !== 'ninguna');

  const candidates = MASTER_RECIPES.filter(
    (r) =>
      r.day === day &&
      r.effort === effort &&
      !r.containsAllergens.some((allergen) => activeAllergies.includes(allergen))
  );

  if (candidates.length > 0) {
    return candidates;
  }

  // Fallback seguro libre de alérgenos para ese día
  return MASTER_RECIPES.filter(
    (r) =>
      r.day === day &&
      !r.containsAllergens.some((allergen) => activeAllergies.includes(allergen))
  );
}

export function buildWeeklyMenu(
  config: UserConfig,
  variantOffsets: Partial<Record<DayOfWeek, number>> = {}
): AdaptedDayMeal[] {
  const vegOnly = isVegetarianProfile(config.tastes);
  const activeAllergies = config.allergies.filter(
    (a): a is Exclude<AllergyId, 'ninguna'> => a !== 'ninguna'
  );

  // El plato principal representa ~35% de la ingesta calórica diaria (o mostramos macros escalados del plato principal y el cumplimiento global del día)
  const scaleFactor = config.calories / 2100;

  return DAYS_OF_WEEK.map((day) => {
    const effort = config.dailyEffort[day];
    const compatible = getCompatibleRecipesForDay(day, effort, config.allergies);

    // Ordenar por afinidad de gustos manteniendo las recetas estrella primero si empatan
    const sorted = [...compatible].sort((a, b) => {
      const aTasteScore = a.tasteTags.filter((t) => config.tastes.includes(t)).length;
      const bTasteScore = b.tasteTags.filter((t) => config.tastes.includes(t)).length;
      return bTasteScore - aTasteScore;
    });

    const offset = variantOffsets[day] ?? 0;
    const chosen = sorted[offset % sorted.length] || sorted[0];

    // Adaptar nombre de proteína si el perfil es 100% vegetariano
    const proteinItemName = vegOnly ? 'Tofu firme orgánico (Pack)' : 'Pechuga de pollo de corral';
    const adaptedTitle = vegOnly
      ? chosen.title.replace('Pollo / Tofu', 'Tofu Firme').replace('Pollo', 'Tofu Dorado')
      : chosen.title.replace('Pollo / Tofu', 'Pollo de Corral').replace('Pescado / Tofu', 'Pescado Fresco');

    const adaptedIngredients: RecipeIngredient[] = chosen.ingredients.map((ing) => {
      if (ing.sharedGroupId === 'proteina_pack') {
        return {
          ...ing,
          name: proteinItemName
        };
      }
      return ing;
    });

    const adaptedRecipe: RecipeOption = {
      ...chosen,
      title: adaptedTitle,
      ingredients: adaptedIngredients
    };

    const scaledCalories = Math.round(chosen.baseCalories * scaleFactor);
    const scaledProtein = Math.round(
      (chosen.baseProtein * scaleFactor * (config.proteinPct / 30) + chosen.baseProtein * scaleFactor) / 2
    );
    const scaledCarbs = Math.round(
      (chosen.baseCarbs * scaleFactor * (config.carbsPct / 40) + chosen.baseCarbs * scaleFactor) / 2
    );
    const scaledFats = Math.round(
      (chosen.baseFats * scaleFactor * (config.fatsPct / 30) + chosen.baseFats * scaleFactor) / 2
    );

    const activeAllergySafeLabels = activeAllergies.map((a) => ALLERGY_SAFE_BADGE_MAP[a]);
    if (vegOnly) {
      activeAllergySafeLabels.unshift('100% Vegetariano');
    }

    return {
      day,
      recipe: adaptedRecipe,
      scaledCalories,
      scaledProtein,
      scaledCarbs,
      scaledFats,
      activeAllergySafeLabels,
      availableVariantsCount: sorted.length
    };
  });
}

/**
 * Construye las cadenas de trazabilidad para la Pestaña B: Mapa "Desperdicio Cero".
 * Incluye obligatoriamente en la parte superior el Caso Estrella del Tomate:
 * - Domingo (Compra): 1 Tomate
 * - Martes (Esfuerzo Bajo): ½ tomate -> Ensalada fresca proteica
 * - Jueves (Esfuerzo Medio): ½ tomate -> Guiso casero reconfortante
 * - Sábado (Resultado): 100% aprovechado · 0% desperdicio
 */
export function buildZeroWasteChains(
  config: UserConfig,
  weeklyMenu: AdaptedDayMeal[]
): ZeroWasteChain[] {
  const vegOnly = isVegetarianProfile(config.tastes);
  const mealByDay = Object.fromEntries(weeklyMenu.map((m) => [m.day, m])) as Record<
    DayOfWeek,
    AdaptedDayMeal
  >;

  return [
    {
      id: 'tomate',
      purchaseItemName: '1 Tomate',
      purchaseQuantityLabel: '1 unidad fresca redonda (220g)',
      category: 'Verduras',
      isFeaturedTomato: true,
      accentColor: 'coral',
      savingNote: 'Cero mitades olvidadas u oxidadas en la puerta del refrigerador.',
      usages: [
        {
          day: 'Martes',
          shortDay: 'Mar',
          effort: mealByDay.Martes.recipe.effort,
          prepMinutes: mealByDay.Martes.recipe.prepTimeMinutes,
          fractionUsed: '½ tomate',
          percentageUsed: 50,
          recipeTitle: mealByDay.Martes.recipe.title
        },
        {
          day: 'Jueves',
          shortDay: 'Jue',
          effort: mealByDay.Jueves.recipe.effort,
          prepMinutes: mealByDay.Jueves.recipe.prepTimeMinutes,
          fractionUsed: '½ tomate',
          percentageUsed: 50,
          recipeTitle: mealByDay.Jueves.recipe.title
        }
      ]
    },
    {
      id: 'espinaca',
      purchaseItemName: '1 Bolsa de espinaca baby',
      purchaseQuantityLabel: 'Bolsa familiar de 250g',
      category: 'Verduras',
      accentColor: 'emerald',
      savingNote: 'Las hojas verdes son el ítem #1 que más se pudre en casa. Aquí se usa en 3 días exactos.',
      usages: [
        {
          day: 'Lunes',
          shortDay: 'Lun',
          effort: mealByDay.Lunes.recipe.effort,
          prepMinutes: mealByDay.Lunes.recipe.prepTimeMinutes,
          fractionUsed: '⅓ bolsa (85g)',
          percentageUsed: 33,
          recipeTitle: mealByDay.Lunes.recipe.title
        },
        {
          day: 'Miércoles',
          shortDay: 'Mié',
          effort: mealByDay.Miércoles.recipe.effort,
          prepMinutes: mealByDay.Miércoles.recipe.prepTimeMinutes,
          fractionUsed: '⅓ bolsa (85g)',
          percentageUsed: 33,
          recipeTitle: mealByDay.Miércoles.recipe.title
        },
        {
          day: 'Viernes',
          shortDay: 'Vie',
          effort: mealByDay.Viernes.recipe.effort,
          prepMinutes: mealByDay.Viernes.recipe.prepTimeMinutes,
          fractionUsed: '⅓ bolsa (80g)',
          percentageUsed: 34,
          recipeTitle: mealByDay.Viernes.recipe.title
        }
      ]
    },
    {
      id: 'proteina_pack',
      purchaseItemName: vegOnly
        ? '1 Pack de tofu firme orgánico'
        : '1 Pack de pechuga de pollo',
      purchaseQuantityLabel: 'Bandeja fresca de 600g (3 porciones de 200g)',
      category: 'Proteínas',
      accentColor: 'amber',
      savingNote: 'Dividido en 3 comidas de 200g sin congelar sobras sueltas.',
      usages: [
        {
          day: 'Martes',
          shortDay: 'Mar',
          effort: mealByDay.Martes.recipe.effort,
          prepMinutes: mealByDay.Martes.recipe.prepTimeMinutes,
          fractionUsed: '⅓ pack (200g)',
          percentageUsed: 33,
          recipeTitle: mealByDay.Martes.recipe.title
        },
        {
          day: 'Miércoles',
          shortDay: 'Mié',
          effort: mealByDay.Miércoles.recipe.effort,
          prepMinutes: mealByDay.Miércoles.recipe.prepTimeMinutes,
          fractionUsed: '⅓ pack (200g)',
          percentageUsed: 33,
          recipeTitle: mealByDay.Miércoles.recipe.title
        },
        {
          day: 'Sábado',
          shortDay: 'Sáb',
          effort: mealByDay.Sábado.recipe.effort,
          prepMinutes: mealByDay.Sábado.recipe.prepTimeMinutes,
          fractionUsed: '⅓ pack (200g)',
          percentageUsed: 34,
          recipeTitle: mealByDay.Sábado.recipe.title
        }
      ]
    },
    {
      id: 'palta',
      purchaseItemName: '1 Palta / Aguacate Hass',
      purchaseQuantityLabel: '1 unidad grande en punto justo',
      category: 'Verduras',
      accentColor: 'emerald',
      savingNote: 'Evita que la segunda mitad se ponga negra asignándola a tu cena rápida del viernes.',
      usages: [
        {
          day: 'Lunes',
          shortDay: 'Lun',
          effort: mealByDay.Lunes.recipe.effort,
          prepMinutes: mealByDay.Lunes.recipe.prepTimeMinutes,
          fractionUsed: '½ palta',
          percentageUsed: 50,
          recipeTitle: mealByDay.Lunes.recipe.title
        },
        {
          day: 'Viernes',
          shortDay: 'Vie',
          effort: mealByDay.Viernes.recipe.effort,
          prepMinutes: mealByDay.Viernes.recipe.prepTimeMinutes,
          fractionUsed: '½ palta',
          percentageUsed: 50,
          recipeTitle: mealByDay.Viernes.recipe.title
        }
      ]
    },
    {
      id: 'pimiento_calabacin',
      purchaseItemName: '1 Pimiento rojo + 1 Calabacín',
      purchaseQuantityLabel: '2 hortalizas medianas frescas',
      category: 'Verduras',
      accentColor: 'sky',
      savingNote: 'Compras solo 1 unidad de cada uno y las compartes entre el guiso del jueves y el bowl del domingo.',
      usages: [
        {
          day: 'Jueves',
          shortDay: 'Jue',
          effort: mealByDay.Jueves.recipe.effort,
          prepMinutes: mealByDay.Jueves.recipe.prepTimeMinutes,
          fractionUsed: '½ unidad c/u',
          percentageUsed: 50,
          recipeTitle: mealByDay.Jueves.recipe.title
        },
        {
          day: 'Domingo',
          shortDay: 'Dom',
          effort: mealByDay.Domingo.recipe.effort,
          prepMinutes: mealByDay.Domingo.recipe.prepTimeMinutes,
          fractionUsed: '½ unidad c/u',
          percentageUsed: 50,
          recipeTitle: mealByDay.Domingo.recipe.title
        }
      ]
    }
  ];
}

/**
 * Construye la Lista de Compras exacta del Domingo agrupada por categoría:
 * Verduras, Proteínas, Despensa.
 */
export function buildShoppingList(config: UserConfig): ShoppingListItem[] {
  const vegOnly = isVegetarianProfile(config.tastes);

  return [
    // VERDURAS
    {
      id: 'shop-tomate',
      name: '1 Tomate redondo de huerta',
      quantityLabel: '1 unidad (220g)',
      category: 'Verduras',
      usageSummary: 'Mar (½) + Jue (½) · 100% usado',
      daysUsed: ['Martes', 'Jueves'],
      sharedGroupId: 'tomate',
      isFeaturedTomato: true
    },
    {
      id: 'shop-espinaca',
      name: '1 Bolsa de espinaca baby fresca',
      quantityLabel: '1 bolsa (250g)',
      category: 'Verduras',
      usageSummary: 'Lun (⅓) + Mié (⅓) + Vie (⅓) · 100% usado',
      daysUsed: ['Lunes', 'Miércoles', 'Viernes'],
      sharedGroupId: 'espinaca'
    },
    {
      id: 'shop-palta',
      name: '1 Palta / Aguacate Hass grande',
      quantityLabel: '1 unidad',
      category: 'Verduras',
      usageSummary: 'Lun (½) + Vie (½) · 100% usado',
      daysUsed: ['Lunes', 'Viernes'],
      sharedGroupId: 'palta'
    },
    {
      id: 'shop-pimiento-calabacin',
      name: '1 Pimiento morrón rojo + 1 Calabacín',
      quantityLabel: '1 unid c/u',
      category: 'Verduras',
      usageSummary: 'Jue (½) + Dom (½) · 100% usado',
      daysUsed: ['Jueves', 'Domingo'],
      sharedGroupId: 'pimiento_calabacin'
    },
    {
      id: 'shop-papas-limon',
      name: 'Papas rústicas baby y 2 limones sutiles',
      quantityLabel: '180g + 2 unid',
      category: 'Verduras',
      usageSummary: 'Mar + Vie + Sáb · 100% usado',
      daysUsed: ['Martes', 'Viernes', 'Sábado']
    },

    // PROTEÍNAS
    {
      id: 'shop-proteina-pack',
      name: vegOnly
        ? '1 Pack de tofu firme orgánico'
        : '1 Pack de pechuga de pollo de corral',
      quantityLabel: '600g exactos',
      category: 'Proteínas',
      usageSummary: 'Mar (200g) + Mié (200g) + Sáb (200g) · 100% usado',
      daysUsed: ['Martes', 'Miércoles', 'Sábado'],
      sharedGroupId: 'proteina_pack'
    },
    {
      id: 'shop-legumbres',
      name: '1 Frasco de garbanzos y lentejas cocidas al natural',
      quantityLabel: '400g escurridos',
      category: 'Proteínas',
      usageSummary: 'Lun (⅓) + Jue (⅓) + Dom (⅓) · 100% usado',
      daysUsed: ['Lunes', 'Jueves', 'Domingo']
    },
    {
      id: 'shop-proteina-viernes',
      name: vegOnly
        ? '1 Porción de edamames / garbanzos crocantes'
        : '1 Lata de lomos de atún al natural / Filete fresco',
      quantityLabel: '140g – 180g',
      category: 'Proteínas',
      usageSummary: 'Vie (100%) · 100% usado',
      daysUsed: ['Viernes']
    },

    // DESPENSA
    {
      id: 'shop-quinoa',
      name: '1 Paquete de Quinoa Real (sin gluten)',
      quantityLabel: '300g en seco',
      category: 'Despensa',
      usageSummary: 'Lun (100g) + Mié (100g) + Dom (100g) · 100% usado',
      daysUsed: ['Lunes', 'Miércoles', 'Domingo'],
      sharedGroupId: 'quinoa_grano'
    },
    {
      id: 'shop-tortillas',
      name: '1 Pack pequeño de tortillas de maíz horneadas',
      quantityLabel: '6 unidades',
      category: 'Despensa',
      usageSummary: 'Vie (3 unid) + Sáb/Snack (3 unid) · 100% usado',
      daysUsed: ['Viernes', 'Sábado']
    },
    {
      id: 'shop-condimentos',
      name: 'Aceite de oliva virgen extra, ajo, pimentón y orégano',
      quantityLabel: 'Básicos de despensa',
      category: 'Despensa',
      usageSummary: 'Lun a Dom · Uso diario medido',
      daysUsed: DAYS_OF_WEEK
    }
  ];
}
