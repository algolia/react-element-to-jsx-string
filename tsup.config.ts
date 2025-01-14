import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  metafile: true,
  target: ['node20', 'es2015'],
});
