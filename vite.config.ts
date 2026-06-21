import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import {fileURLToPath, URL} from 'node:url'
import electron from 'vite-plugin-electron/simple'

export default defineConfig(({mode}) => {
  return {
    base: mode === 'electron' ? './' : '/',
    plugins: [
      vue(),
      tailwindcss(),
      ...(mode === 'electron'
          ? [
            electron({
              main: {
                entry: 'electron/main.ts',
              },
              preload: {
                input: 'electron/preload.ts',
              },
              renderer: {},
            }),
          ] : []
      ),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2020',
      rolldownOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/vue') || id.includes('node_modules/pinia')) {
              return 'vendor'
            }
            return undefined
          },
        },
      },
    },
  }
})
