#!/bin/bash

# Place a package.json so Node know that the dist/esm is ESM.
echo '{ "type": "module" }' > dist/esm/package.json

# Copy the types in there so TS knows it's ESM as well.
cp index.d.ts dist/esm/index.d.ts
