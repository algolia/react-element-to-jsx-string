import { type UserConfig, defineConfig } from "tsdown";

const config: UserConfig = defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  sourcemap: true,
  dts: true,
  platform: "neutral",
  publint: {
    level: "error",
  },
  attw: {
    profile: "esm-only",
    level: "error",
  },
  target: ["node24", "es2020"],
});

export default config;
