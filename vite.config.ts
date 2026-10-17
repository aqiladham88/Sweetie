import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ── GitHub Pages ──────────────────────────────
  // Set `base` to your repo name so assets load correctly.
  // Change '/Sweetie/' if your repo has a different name.
  // Remove or set to '/' if using a custom domain.
  base: '/Sweetie/',
})
