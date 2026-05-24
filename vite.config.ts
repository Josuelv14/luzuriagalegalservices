import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    deployment: {
      preset: "vercel",
    },
    server: {
      preset: "vercel",
    },
  },
  vite: {
    build: {
      outDir: "dist",
    },
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