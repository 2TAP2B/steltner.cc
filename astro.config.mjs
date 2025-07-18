import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.steltner.cc/',
  base: '/',
  outDir: './dist',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ]
})
