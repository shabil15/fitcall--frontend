import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()


export default defineConfig({
  plugins: [react()], 
  server:{
    port:4000,
    
    proxy: {
      '/api':{
        target:"http://localhost:3000/",
        changeOrigin:true,
      }
    }
  }
})


