import react from "@vitejs/plugin-react";
import { type ViteUserConfig, defineConfig } from "vitest/config";

const config: ViteUserConfig = defineConfig({
  plugins: [react()],
  test: {
    globals: false,
    setupFiles: ["tests/setupTests.ts"],
    environment: "node",
    mockReset: true,
  },
});

export default config;
