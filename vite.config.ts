import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const {BASE_URL} = process.env;

export default defineConfig({
  plugins: [react()],
  server:{
    port:4000,
    proxy: {
      '/api':{
        target:BASE_URL,
        changeOrigin:true,
      }
    }
  }
})
