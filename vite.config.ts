import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Inderpreet Singh Photography',
        short_name: 'Inderpreet',
        description: 'Photography portfolio by Inderpreet Singh',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          // you can replace with your own PNGs later; SVG works in most cases
          { src: '/vite.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/vite.svg', sizes: '512x512', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        // Runtime caching strategies
        runtimeCaching: [
          // HTML pages: try network first, fall back to cache (so updates show up)
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 4,
            },
          },
          // JS/CSS: serve instantly from cache, refresh in background
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-cache',
            },
          },
          // Images from your CDNs: cache-first with sensible limits
          {
            urlPattern: /^https:\/\/(ik\.imagekit\.io|images\.unsplash\.com)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 120,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'], // keep your original setting
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      // Optional: gentle chunking to keep first-load JS small
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-fm': ['framer-motion'],
          'vendor-3d': ['three'],
        },
      },
    },
  },
});
