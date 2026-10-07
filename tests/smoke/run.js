#!/usr/bin/env node

// Install the packed package in a temporary project, with the requested React
// version, and check that consumers can use it.

import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const reactVersion = process.argv[2];
if (!reactVersion) {
  throw new Error("React version is missing: '$ pnpm run smoke 19.0.0'");
}

const rootDir = join(import.meta.dirname, "../..");
if (!existsSync(join(rootDir, "dist/index.mjs"))) {
  throw new Error("The package is not built: run 'pnpm run build' first");
}

const appDir = mkdtempSync(
  join(tmpdir(), "react-element-to-jsx-string-smoke-"),
);

try {
  const [{ filename }] = JSON.parse(
    execFileSync("npm", ["pack", "--json", "--pack-destination", appDir], {
      cwd: rootDir,
      encoding: "utf8",
    }),
  );

  writeFileSync(
    join(appDir, "package.json"),
    JSON.stringify({ name: "smoke", private: true, type: "module" }),
  );

  // --legacy-peer-deps: a prerelease ("next") does not satisfy the "^19.0.0" peer range
  execFileSync(
    "npm",
    [
      "install",
      "--no-audit",
      "--no-fund",
      "--legacy-peer-deps",
      `./${filename}`,
      `react@${reactVersion}`,
      `react-dom@${reactVersion}`,
      `react-is@${reactVersion}`,
    ],
    { cwd: appDir, stdio: "inherit" },
  );

  copyFileSync(join(import.meta.dirname, "smoke.js"), join(appDir, "smoke.js"));
  execFileSync("node", ["smoke.js"], { cwd: appDir, stdio: "inherit" });
} finally {
  rmSync(appDir, { recursive: true, force: true });
}
