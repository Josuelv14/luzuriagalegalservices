import { createApp } from "vinxi";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "node:url";

export default createApp({
  tanstackStart: {
    deployment: {
      preset: "vercel",
    },
  },
  vite: {
    build: {
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [tsconfigPaths()],
    environments: {
      server: {
        build: {
          rollupOptions: {
            input: {
              server: './src/start.ts',
            },
            output: {
              entryFileNames: 'server.js',
            },
          },
        },
      },
    },
  },
});