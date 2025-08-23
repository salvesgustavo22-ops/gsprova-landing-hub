import { defineConfig } from "vite";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [react()],
  base: '/gsprova-landing-hub/', // ou './' se for Netlify/Vercel
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
