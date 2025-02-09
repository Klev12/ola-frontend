import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import compressionPlugin from "vite-plugin-compression";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compressionPlugin(), tailwindcss()],
  build: {
    rollupOptions: {
      treeshake: true,
    },
    cssMinify: true,
  },
});
