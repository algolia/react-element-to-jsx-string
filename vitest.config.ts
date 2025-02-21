import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: false,
    setupFiles: ["tests/setupTests.ts"],
    environment: "node",
    mockReset: true,
  },
});
