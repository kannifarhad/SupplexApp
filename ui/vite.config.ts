import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['@emotion/babel-plugin'],
    },
  })],
  // esbuild: {
  //   loader: "jsx",
  //   include: /src\/.*\.js$/, // Apply JSX loader only to JavaScript files inside src
  // },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
  define: {
    global: 'globalThis',
  },
  server: {
    open: true, // Opens the browser on start
    port: 3000, // Default Vite port
    fs: {
      strict: false, // Allow history-based routing
    },
  },
  base: "/", // Ensure base path is set correctly
  publicDir: "public", // Ensure public assets are correctly served
});