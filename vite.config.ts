import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ruta relativa para que funcione automáticamente en GitHub Pages (/MEALANCE/) y en local
  base: './',
  server: {
    host: true,
    port: 5173
  }
});
