import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // ✅ ensures assets resolve properly in Vercel
  server: {
    proxy: {
      "/api": {
        target: "https://www.reddit.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove `/api`
      },
    },
  },
});

