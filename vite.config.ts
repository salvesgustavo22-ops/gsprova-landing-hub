import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Create separate chunks for better caching and performance budget
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
          supabase: ['@supabase/supabase-js']
        },
        // Add content hash to filenames for better cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (assetInfo.name && /\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name]-[hash].[ext]';
          }
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    },
    // Enable source maps for development only
    sourcemap: mode === 'development',
    // Performance budget and optimization
    chunkSizeWarningLimit: 180, // 180 KB limit per chunk
    target: 'esnext',
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    } : undefined,
  },
  // Performance optimization for development
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      'lucide-react'
    ],
  },
}));
