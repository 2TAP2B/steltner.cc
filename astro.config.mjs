import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

const build = {
  baseURL: '/',
  outDir: './dist',
  siteURL: 'https://www.steltner.cc/'
}

const env = process.env.NODE_ENV

switch (env) {
  case 'pages':
    build.baseURL = '/astro-landing-page/'
    build.outDir = './docs'
    build.siteURL = 'https://ttntm.github.io/astro-landing-page/'
    break

  case 'production':
    build.siteURL = 'https://www.steltner.cc/'
    break

  default:
    break
}

// https://astro.build/config
export default defineConfig({
  site: build.siteURL,
  base: build.baseURL,
  outDir: build.outDir,
  output: 'hybrid', // Enable server-side rendering for API routes
  adapter: vercel(),
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ]
})
