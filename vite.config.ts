import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Works around a Rollup tree-shaking crash ("Cannot add property 0,
    // object is not extensible") triggered by frozen-array literals in one
    // of the new charting/calendar dependencies (recharts/react-big-calendar
    // dependency graph). See https://github.com/rollup/rollup/issues (getLiteralValueAtPath).
    rollupOptions: {
      treeshake: false,
    },
  },
})
