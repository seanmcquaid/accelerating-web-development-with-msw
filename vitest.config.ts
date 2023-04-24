import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./app/setupTests.ts"],
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
});
