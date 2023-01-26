import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contribute: resolve(__dirname, "./contribute/index.html"),
        aboutme: resolve(__dirname, "./aboutme/index.html"),
        playground: resolve(__dirname, "./playground/index.html"),
      },
    },
  },
});
