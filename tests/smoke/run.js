#!/usr/bin/env node

const execFileSync = require('child_process').execFileSync;
const path = require('path');

execFileSync(path.join(__dirname, 'prepare.js'), [process.argv[2]], {
  cwd: __dirname,
  stdio: 'inherit',
});

execFileSync(path.join(__dirname, 'smoke.js'), {
  cwd: __dirname,
  stdio: 'inherit',
});
