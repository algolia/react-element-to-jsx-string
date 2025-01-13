import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: false,
    setupFiles: ['tests/setupTests.ts'],
    environment: 'node',
    mockReset: true,
  },
});
