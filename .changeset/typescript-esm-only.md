---
"react-element-to-jsx-string": major
---

Convert the source code from Flow to TypeScript and publish the package as an ES module only.

**Breaking changes**

- The package is published as an ES module only, and the CommonJS build is removed. CommonJS code can still `require()` it and read the default export from `.default`:

  ```js
  const reactElementToJSXString = require("react-element-to-jsx-string").default;
  ```

- Node.js 24 or later is required. In browsers, the code targets ES2020.
- Flow type definitions (`.js.flow` files) are no longer published.

**Other changes**

- TypeScript types are generated from the source and included in the package, replacing the hand-written `index.d.ts`. The `Options` type is still exported, and `inlineFunction` and `preserveFunctionLineBreak` are now typed too.
- An invalid date nested in an object or array prop is printed as `Invalid Date` instead of throwing an error.
- An object created with `Object.create({})` is no longer formatted as a plain object.
