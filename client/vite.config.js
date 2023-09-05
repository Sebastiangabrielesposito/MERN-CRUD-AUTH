
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

