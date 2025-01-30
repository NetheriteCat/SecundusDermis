import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    // Enable source maps for CSS
    devSourcemap: true,
    
    // CSS preprocessing options
    preprocessorOptions: {
      css: {
        // Classical CSS options
        modules: false,
      }
    },
    
    // Global CSS injection point
    postcss: {
      plugins: []
    }
  },
  
  // Configure static asset handling
  assetsInclude: ['**/*.css'],
  
  // Base public path
  base: '/',
})