import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ supaya import "@/..." bisa jalan
    },
  },
  server: {
    proxy: {
      // ✅ Semua request frontend ke /api diteruskan ke backend Express kamu di Vercel
      "/api": {
        target: "https://digital-library-backend-md45.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
