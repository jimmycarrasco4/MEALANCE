# MEALANCE · Menús Inteligentes · Desperdicio Cero

Aplicación web interactiva **mobile-first** (React + Vite + TypeScript + Tailwind CSS + Lucide React) para armar menús semanales personalizados optimizando compras con **0% desperdicio**.

## 🚀 Cómo ejecutar el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para despliegue estático (Vercel / Netlify / GitHub Pages)
npm run build
```

## ✨ Características implementadas

1. **Identidad Visual Health-Tech:**
   - Paleta oficial: Verde Esmeralda Tech (`#10B981`), Azul Pizarra Profundo (`#0F172A`), Coral Tomate (`#EF4444`), fondos `#FFFFFF` y `#F8FAFC` con bordes `#E2E8F0`.
   - Tipografía Google Fonts: `Plus Jakarta Sans` (Bold/ExtraBold) para títulos y métricas + `Inter` para lectura y etiquetas.
   - Componente `<BrandLogo />` con carga automática de `/logo.png` (si lo colocas en `public/logo.png`) y fallback instantáneo a ícono SVG minimalista + marca **MEALANCE**.

2. **Flujo completo de 60 segundos:**
   - **Vista 1 (Landing):** Propuesta de valor con las 4 variables, ejemplo visual del ciclo del tomate y 2 accesos: *"Armar mi semana (60 seg)"* y *"Ver demo rápida"*.
   - **Vista 2 (Configurador en 4 pasos):**
     1. Macros y objetivo (3 tarjetas rápidas + sliders interactivos de kcal y distribución P/C/G).
     2. Alergias y restricciones (filtrado real de recetas).
     3. Gustos de comida (con soporte inteligente para perfil omnívoro o 100% vegetariano).
     4. Nivel de esfuerzo por día (Lunes a Domingo: `Bajo` 10–15 min, `Medio` 25–35 min, `Alto` +45 min).
   - **Transición (1.5s):** Animación con mensajes rotativos (*"Ajustando tus macros..."*, *"Filtrando alergias..."*, *"Entrelazando ingredientes para 0% desperdicio..."*).
   - **Vista 3 (Dashboard con 3 pestañas):**
     - **Mi Menú Semanal:** Cambio de nivel de esfuerzo en vivo por día y resaltado interactivo de ingredientes compartidos entre días.
     - **Mapa "Desperdicio Cero":** Caso estrella destacado de **1 Tomate** (Domingo compra → Martes ½ tomate en *Ensalada fresca proteica* → Jueves ½ tomate en *Guiso casero reconfortante* → Sábado `100% aprovechado · 0% desperdicio`) + 4 cadenas circulares adicionales.
     - **Lista de Compras (Domingo):** Agrupada por *Verduras*, *Proteínas* y *Despensa*, con checkboxes interactivos, días exactos de consumo y copiado al portapapeles con toast de confirmación.
