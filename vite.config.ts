import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        name: "Inderpreet Singh Photography",
        short_name: "Inderpreet",
        description: "Photography portfolio by Inderpreet Singh",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        start_url: "/",
        // NOTE: iOS doesn't accept SVG app icons; PNG is safest.
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          // optional maskable
          { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // Let workbox pre-cache typical file types from your build
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
        runtimeCaching: [
          // JS & CSS → fast, then refresh in background
          {
            urlPattern: /\.(?:js|css)$/i,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "static-cache" },
          },
          // ImageKit CDN
          {
            urlPattern: /^https:\/\/ik\.imagekit\.io\/.*$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "imagekit-cache",
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          // Unsplash (if any remain)
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "unsplash-cache",
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
        navigateFallback: "/index.html",
      },
    }),
  ],
  optimizeDeps: {
    // keep if you intentionally exclude lucide-react
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-fm": ["framer-motion"],
          "vendor-3d": ["three"],
        },
      },
    },
  },
});
