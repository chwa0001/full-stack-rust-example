import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: "manifest.json",
    outDir:'../../backend/build',
    emptyOutDir:true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('commonjsHelpers')) return 'commonjsHelpers'
          if (id.includes('node_modules')) {
            if (id.includes('node_modules/@mui/'))return id.toString().split('node_modules/')[1].split('/').slice(0, 2).join('-');
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      }
    },
    chunkSizeWarningLimit: 500
  },
  root: './src',
  resolve:{
    extensions: ['.js','.ts','.tsx'],
  }
})
