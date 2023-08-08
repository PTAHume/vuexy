import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default () => {
  return defineConfig({
    base:'/',
    plugins: [react()],
    define: {
      global: 'globalThis'
    },
    server: {
      port: 3000,
      proxy: 'https://pixinvent.com/',
      cors: {
        origin: ['http://localhost:3000', 'https://ptahume.github.io'],
        methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
      },
      '/api': {
        target: 'https://api.dealmanager.co.uk',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['node_modules', './src/assets']
        }
      },
      postcss: {
        plugins: [require('postcss-rtl')()]
      }
    },
    resolve: {
      alias: [
        {
          find: /^~.+/,
          replacement: val => {
            return val.replace(/^~/, '') 
          }
        },
        { find: '@src', replacement: path.resolve(__dirname, 'src') },
        { find: '@store', replacement: path.resolve(__dirname, 'src/redux') },
        { find: '@configs', replacement: path.resolve(__dirname, 'src/configs') },
        { find: '@styles', replacement: path.resolve(__dirname, 'src/@core/scss') },
        { find: '@utils', replacement: path.resolve(__dirname, 'src/utility/Utils') },
        { find: '@hooks', replacement: path.resolve(__dirname, 'src/utility/hooks') },
        { find: '@assets', replacement: path.resolve(__dirname, 'src/@core/assets') },
        { find: '@layouts', replacement: path.resolve(__dirname, 'src/@core/layouts') },
        { find: '@components', replacement: path.resolve(__dirname, 'src/@core/components') },
        { find: '@sanctum', replacement: path.resolve(__dirname, 'src/@core/auth/sanctum')}
      ]
    }
  })
}
