import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Binds to all available network interfaces
    port: 5173,        // Ensure the port matches your desired port (5173 in this case)
  },
})

