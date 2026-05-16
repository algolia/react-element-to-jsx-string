const { resolve } = require('path');
const { writeFileSync, unlinkSync } = require('fs');
const { spawnSync } = require('child_process');
const { tmpdir } = require('os');

// escape from Jest's environment, and from this folder.
// This ensures that we are loading the distribution files
// from a completely separate location, as one will when using
// this module as a dependency either via import() or require().
const cjsMod = resolve(__dirname, '../dist/cjs/index.js');
const esmMod = resolve(__dirname, '../dist/esm/index.js');
const testCode = `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjsDist = require(${JSON.stringify(cjsMod)});
const esmDist = await import(${JSON.stringify(esmMod)});
import assert from 'assert';

for (const [name, value] of Object.entries(cjsDist)) {
  assert.equal(typeof esmDist[name], typeof value, 'esm has ' + name);
}
for (const [name, value] of Object.entries(esmDist)) {
  assert.equal(typeof cjsDist[name], typeof value, 'cjs has ' + name);
}
assert.equal(typeof cjsDist.default, 'function', 'cjs default function');
assert.equal(typeof esmDist.default, 'function', 'cjs default function');

console.log('ok');
`;
const testFile = resolve(tmpdir(), 'reactElementToJSXString.test.mjs');

describe('cjs and esm distributions', () => {
  it('writes the test file', () => writeFileSync(testFile, testCode));

  it('exports matching cjs and esm', () => {
    const result = spawnSync(process.execPath, [testFile], {
      encoding: 'utf8',
    });
    expect(result.error).toBe(undefined);
    expect(result.stderr).toEqual('');
    expect(result.stdout).toEqual('ok\n');
  });

  it('cleans up', () => unlinkSync(testFile));
});
