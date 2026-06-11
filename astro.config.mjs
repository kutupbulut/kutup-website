// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://kutup.dev',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      // Emits hreflang alternates; URL prefixes map to src/i18n locales.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', tr: 'tr' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
