// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
  //   plugins: [react()],
  // })
// import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default {
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mern-crud-auth-server-ten.vercel.app/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // build: {
  //   rollupOptions: {
  //     external: ['zod'], 
  //   },
  //   outDir: 'dist', 
  // },
  // base: '/',
};

// import reactRefresh from '@vitejs/plugin-react-refresh';

// // https://vitejs.dev/config/
// export default {
//   plugins: [reactRefresh()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:4000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
//   build: {
//     rollupOptions: {
//       external: ['zod'], 
//     },
//     outDir: 'dist', 
//   },
//   base: '/',
// };