import react from '@vitejs/plugin-react'
import { createHash } from 'crypto'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/todos/',
  plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
        generateScopedName(name: string, filename: string, css: string) {
          const file = path.basename(filename, path.extname(filename))
          const component = file.replace(/\.module$/, '')
          const hash = createHash('md5')
            .update(css)
            .digest('base64')
            .replace(/[^a-z0-9]/gi, '')
            .slice(0, 5)
          return `${component}__${name}___${hash}`
        }
      }
    }
})
