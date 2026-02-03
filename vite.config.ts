import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "apple-touch-icon.png"
      ],
      manifest: {
        name: "القرآن الكريم",
        short_name: "ورتلناه ترتيلا",
        description: "تطبيق قرآن كريم للقراءة والبحث",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon2.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/icon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff2,mp3}"],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              url.origin === "https://archive.org" &&
              url.pathname.endsWith(".mp3"),
            handler: "CacheFirst",
            options: {
              cacheName: "quran-audio-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
});
