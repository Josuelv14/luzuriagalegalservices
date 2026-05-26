import { createApp } from "vinxi";

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