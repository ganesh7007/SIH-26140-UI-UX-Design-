import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'reicon-react': path.resolve(__dirname, './src/components/ReiconIcons.jsx')
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
