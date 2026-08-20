// Vite-configuratie: React-plugin + Tailwind v4 plugin (geen losse postcss.config nodig)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // vast poortnummer, handig tijdens development naast de backend op :3001
    port: 5173,
  },
})
