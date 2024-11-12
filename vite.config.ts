import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import compressionPlugin from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compressionPlugin()],
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },
});
