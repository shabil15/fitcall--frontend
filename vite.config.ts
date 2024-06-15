import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const {VITE_BASE_URL} = process.env;

export default defineConfig({
  plugins: [react()], 
  server:{
    port:4000,
    
    proxy: {
      '/api':{
        target:VITE_BASE_URL,
        changeOrigin:true,
      }
    }
  }
})
