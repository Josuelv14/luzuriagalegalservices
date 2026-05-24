import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
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