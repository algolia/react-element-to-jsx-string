# react-element-to-jsx-string

[![Version][version-svg]][package-url] [![Build Status][ci-svg]][ci-url] [![License][license-image]][license-url] [![Downloads][downloads-image]][downloads-url]

[ci-svg]: https://img.shields.io/github/actions/workflow/status/algolia/react-element-to-jsx-string/continuous-integration.yaml?style=flat-square
[ci-url]: https://github.com/algolia/react-element-to-jsx-string/actions/workflows/continuous-integration.yaml
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/react-element-to-jsx-string.svg?style=flat-square
[downloads-url]: https://npm-stat.com/charts.html?package=react-element-to-jsx-string
[version-svg]: https://img.shields.io/npm/v/react-element-to-jsx-string.svg?style=flat-square
[package-url]: https://www.npmjs.com/package/react-element-to-jsx-string

Turn a ReactElement into the corresponding JSX string.

Useful for unit testing and any other need you may think of.

Features:
- supports nesting and deep nesting like `<div a={{b: {c: {d: <div />}}}} />`
- props: supports string, number, function (inlined as `prop={function noRefCheck() {}}`), object, ReactElement (inlined), regex, booleans (with or without [shorthand syntax](https://react.dev/learn/passing-props-to-a-component)), ...
- order props alphabetically
- sort object keys in a deterministic order (`o={{a: 1, b:2}} === o={{b:2, a:1}}`)
- handle `ref` and `key` attributes, they are always on top of props
- React's documentation indent style for JSX

## Setup

```sh
npm install react-element-to-jsx-string [--save-dev]
```

## Usage

```js
import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

console.log(reactElementToJSXString(<div a="1" b="2">Hello, world!</div>));
// <div
//   a="1"
//   b="2"
// >
//   Hello, world!
// </div>
```

## API

### reactElementToJSXString(ReactElement[, options])

**options.displayName: function(ReactElement)**

  Provide a different algorithm in charge of finding the right display name (name of the underlying Class) for your element.

  Just return the name you want for the provided ReactElement, as a string.

**options.filterProps: string[] | (value: unknown, key: string) => boolean, default []**

  If an array of strings is passed, filter out any prop who's name is in
  the array. For example ['key'] will suppress the key="" prop from being added.

  If a function is passed, it will be called for each prop with two arguments,
  the prop value and key, and will filter out any that return false.

**options.showDefaultProps: boolean, default true**

  If true, default props shown.

  If false, default props are omitted unless they differ from from the default value.

**options.showFunctions: boolean, default false**

  If true, functions bodies are shown.

  If false, functions bodies are replaced with `function noRefCheck() {}`.

**options.functionValue: function, default `inlineFunction`**

  Allows you to override the default formatting of function values.

  `functionValue` receives the original function reference as input
  and should send any value as output. The value is converted to a string.

  Two formatters are exported:
  - `inlineFunction` (the default) puts the function source on one line.
  - `preserveFunctionLineBreak` keeps the function source as written.

  ```js
  import reactElementToJSXString, { preserveFunctionLineBreak } from 'react-element-to-jsx-string';

  reactElementToJSXString(element, { showFunctions: true, functionValue: preserveFunctionLineBreak });
  ```

**options.tabStop: number, default 2**

  Provide a different number of columns for indentation.

**options.useBooleanShorthandSyntax: boolean, default true**

  If true, `true` prop values use the shorthand syntax: `prop` instead of `prop={true}`.

  If false, Boolean prop values will be explicitly output like `prop={true}` and `prop={false}`

**options.maxInlineAttributesLineLength: number, default undefined**

  Allows to render multiple attributes on the same line and control the behaviour.

  You can provide the max number of characters to render inline with the tag name. If the number of characters on the line (including spacing and the tag name)
  exceeds this number, then all attributes will be rendered on a separate line. The default value of this option is `undefined`. If this option is `undefined`
  then if there is more than one attribute on an element, they will render on their own line. Note: Objects passed as attribute values are always rendered
  on multiple lines

**options.sortProps: boolean, default true**

  Either to sort or not props. If you use this lib to make some isomorphic rendering you should set it to false, otherwise this would lead to react invalid checksums as the prop order is part of react isomorphic checksum algorithm.

**options.useFragmentShortSyntax: boolean, default true**

  If true, fragment will be represented with the JSX short syntax `<>...</>` (when possible).

  If false, fragment will always be represented with the JSX explicit syntax `<React.Fragment>...</React.Fragment>`.

  According to [the specs](https://react.dev/reference/react/Fragment):
  - A keyed fragment will always use the explicit syntax: `<React.Fragment key={...}>...</React.Fragment>`
  - An empty fragment will always use the explicit syntax: `<React.Fragment />`

## Environment requirements

`react-element-to-jsx-string` is published as an ES module only, with its TypeScript types included.

- **React**: 19 or later (`react`, `react-dom` and `react-is` are peer dependencies).
- **Node.js**: 24 or later.
- **Browsers**: any browser that supports ES2020, such as Chrome and Edge 80, Firefox 74 and Safari 13.1, or later versions.
- **Bundlers** (Vite, webpack 5, Rollup, esbuild…): any version that supports the `exports` field of `package.json`.
- **TypeScript**: use `"moduleResolution": "bundler"`, `"node16"` or `"nodenext"`.

Use `import` to load it:

```js
import reactElementToJSXString from 'react-element-to-jsx-string';
```

CommonJS code can still `require()` it. The default export is then on `.default`:

```js
const reactElementToJSXString = require('react-element-to-jsx-string').default;
```

## Test

The project uses [pnpm](https://pnpm.io/) and Node.js 24 or later.

```sh
pnpm install
pnpm test             # unit tests, in watch mode
pnpm run typecheck
pnpm run lint         # oxlint (pnpm run lint:fix to fix)
pnpm run format       # oxfmt check (pnpm run format:fix to fix)
```

Smoke test: install the built package in a temporary project with a given React version, and check it works.

```sh
pnpm run build
pnpm run smoke 19.0.0  # or latest, next…
```

## Build

```sh
pnpm run build
```

## Release

Releases are made with [Changesets](https://changesets.dev).

1. In a pull request that changes the package, add a changeset: choose the version bump (`patch`, `minor` or `major`, see https://semver.org/) and describe the change for the changelog.

   ```sh
   pnpm changeset
   ```

2. Once merged on `master`, the changeset is added to a "Version Packages" pull request, which updates the version and `CHANGELOG.md`.
3. Merging the "Version Packages" pull request publishes the package to npm from GitHub Actions, and creates the git tag and the GitHub release.

## Thanks

[alexlande/react-to-jsx](https://github.com/alexlande/react-to-jsx/) was a good source of inspiration.

We built our own module because we had some needs like ordering props in alphabetical order.
