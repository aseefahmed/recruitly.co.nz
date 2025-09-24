import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => {
  return {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
        ? [
            (await import("@replit/vite-plugin-cartographer")).cartographer(),
            (await import("@replit/vite-plugin-dev-banner")).devBanner(),
          ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: [
        "0d290412-04ee-4e47-b03f-ca986d54fd50-00-1n11753sxwqun.picard.replit.dev",
      ], // ✅ now all Replit hosts work
      port: 5000,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
