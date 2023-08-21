import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        lang: 'ja',
        name: 'Stask',
        short_name: 'Stask',
        start_url: "/app?usingPWA=true",
        background_color: '#F3F4F6',
        theme_color: '#F3F4F6',
        display: "standalone",
        icons: [
          {
            src: 'touch_icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
        ]
      }
    })
  ],
})
