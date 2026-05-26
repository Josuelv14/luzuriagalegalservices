import { defineConfig } from "@tanstack/start/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  server: {
    preset: "vercel",
  },
  tsr: {
    appDirectory: "./src",
    routesDirectory: "./src/routes",
    generatedRouteTree: "./src/routeTree.gen.ts",
  },
  routers: {
    client: {
      entry: "./src/client.tsx",
    },
    ssr: {
      entry: "./src/ssr.tsx",
    },
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [tsconfigPaths()],
  },
});