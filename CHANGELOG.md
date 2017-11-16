<a name="13.1.0"></a>
# [13.1.0](https://github.com/algolia/react-element-to-jsx-string/compare/v13.0.0...v13.1.0) (2017-11-15)


### Bug Fixes

* **formatting:** Date/RegExp values output by formatComplexDataStructure ([#250](https://github.com/algolia/react-element-to-jsx-string/issues/250)) ([0387b72](https://github.com/algolia/react-element-to-jsx-string/commit/0387b72))
* **react:** Fix warning about access to PropTypes using React 15.5+ (fixes [#213](https://github.com/algolia/react-element-to-jsx-string/issues/213)) ([2dcfd10](https://github.com/algolia/react-element-to-jsx-string/commit/2dcfd10))
* **test:** Fix usage of yarn instead of npm in test script ([0db5aa4](https://github.com/algolia/react-element-to-jsx-string/commit/0db5aa4))



<a name="13.0.0"></a>
# [13.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v12.0.0...v13.0.0) (2017-10-09)


### Bug Fixes

* **deps:** update dependency stringify-object to v3.2.1 ([539ea56](https://github.com/algolia/react-element-to-jsx-string/commit/539ea56))
* **formatting:** symbol description are now quoted ([2747f1b](https://github.com/algolia/react-element-to-jsx-string/commit/2747f1b)), closes [#134](https://github.com/algolia/react-element-to-jsx-string/issues/134)
* **formatting:** trailing space ([2a07d5e](https://github.com/algolia/react-element-to-jsx-string/commit/2a07d5e)), closes [#135](https://github.com/algolia/react-element-to-jsx-string/issues/135)


### BREAKING CHANGES

* **formatting:** Trailing are now preserved. In some rare case, `react-element-to-jsx-string` failed to respect the JSX specs for the trailing space. Event is the space were in the final output. There were silentrly ignored by JSX parser. This commit fix this bug by protecting the trailing space in the output.

If we take the JSX:
```jsx
<div>
  foo <strong>bar</strong> baz
</div>
```

Before it was converted to (the trailing space are replace by `*` for the readability):
```html
<div>
  foo*
  <strong>
    bar
  </strong>
  *baz
</div>
```

Now there are preserved:
```html
<div>
  foo{' '}
  <strong>
    bar
  </strong>
  {' '}baz
</div>
```
* **formatting:** Symbol description are now correctly quoted. This change the output if you use Symbol in your code



<a name="12.0.0"></a>
# [12.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v11.0.1...v12.0.0) (2017-08-03)


### Bug Fixes

* **flow:** export flow definitions in the released bundle and fix the npm ignore too restrictive ([#115](https://github.com/algolia/react-element-to-jsx-string/issues/115)) ([c4f91b9](https://github.com/algolia/react-element-to-jsx-string/commit/c4f91b9))
* **formatting:** Children with multiline string are now correctly indented ([d18809e](https://github.com/algolia/react-element-to-jsx-string/commit/d18809e))
* **formatting:** Fix JSX delimiters escaping in string ([6e0eea3](https://github.com/algolia/react-element-to-jsx-string/commit/6e0eea3))
* **release:** revert change made by error in commit 86697517 ([903fd5c](https://github.com/algolia/react-element-to-jsx-string/commit/903fd5c))
* **travis:** manually install yarn on Travis CI ([b8a4c1a](https://github.com/algolia/react-element-to-jsx-string/commit/b8a4c1a))


### BREAKING CHANGES

* **formatting:** Improve string escaping of string that contains JSX delimiters (`{`,`}`,`<`,`>`)

Before:
```
console.log(reactElementToJsxString(<div>{`Mustache :{`}</div>);

// <div>Mustache :&lbrace;</div>
```

Now:
```
console.log(reactElementToJsxString(<div>{`Mustache :{`}</div>);

// <div>{`Mustache :{`}</div>
```



<a name="11.0.1"></a>
## [11.0.1](https://github.com/algolia/react-element-to-jsx-string/compare/v11.0.0...v11.0.1) (2017-07-21)


### Bug Fixes

* **formatting:** fix an edge case where number and string childrens are not correctly merged ([47572e0](https://github.com/algolia/react-element-to-jsx-string/commit/47572e0))



<a name="11.0.0"></a>
# [11.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v10.1.0...v11.0.0) (2017-07-20)

### Bug Fixes

* **release:** Missing `mversion` package in dev dependencies ([0f82ee7](https://github.com/algolia/react-element-to-jsx-string/commit/0f82ee7))
* **escaping:** Complete lib refactor to handle more escaping cases ([9f3c671](https://github.com/algolia/react-element-to-jsx-string/commit/9f3c671))

### BREAKING CHANGES

* Fix escaping issue with quotes (in props value or in children of type string)
* Handle props value of `Date` type: `<div foo={new Date("2017-01-01T11:00:00.000Z")} />`
* Escape brace chars (`{}`) in a children string: `<script type="application/json+ld">&lbrace; hello: 'world' &rbrace;</script>`



<a name="10.1.0"></a>
# [10.1.0](https://github.com/algolia/react-element-to-jsx-string/compare/v10.0.1...v10.1.0) (2017-06-13)


### Features

* **sortProps:** add option to remove sorting of props ([66e8307](https://github.com/algolia/react-element-to-jsx-string/commit/66e8307))



<a name="10.0.1"></a>
## [10.0.1](https://github.com/algolia/react-element-to-jsx-string/compare/v10.0.0...v10.0.1) (2017-06-12)



<a name="10.0.0"></a>
# [10.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v9.0.0...v10.0.0) (2017-06-07)



<a name="9.0.0"></a>
# [9.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v8.0.0...v9.0.0) (2017-06-07)


### Bug Fixes

* **quotes:** fixes #82 #81 #80 ([3d96ddc](https://github.com/algolia/react-element-to-jsx-string/commit/3d96ddc)), closes [#82](https://github.com/algolia/react-element-to-jsx-string/issues/82) [#81](https://github.com/algolia/react-element-to-jsx-string/issues/81) [#80](https://github.com/algolia/react-element-to-jsx-string/issues/80)



<a name="8.0.0"></a>
# [8.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v7.0.0...v8.0.0) (2017-05-24)



<a name="7.0.0"></a>
# [7.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v6.4.0...v7.0.0) (2017-05-14)



<a name="6.4.0"></a>
# [6.4.0](https://github.com/algolia/react-element-to-jsx-string/compare/v6.3.0...v6.4.0) (2017-04-24)


### Features

* **functionValue:** format functions output the way you want ([460e0cc](https://github.com/algolia/react-element-to-jsx-string/commit/460e0cc))
* **React:** support 15.5+ ([1a99024](https://github.com/algolia/react-element-to-jsx-string/commit/1a99024))



<a name="6.3.0"></a>
# [6.3.0](https://github.com/algolia/react-element-to-jsx-string/compare/v6.2.0...v6.3.0) (2017-03-06)



<a name="6.2.0"></a>
# [6.2.0](https://github.com/algolia/react-element-to-jsx-string/compare/v6.0.0...v6.2.0) (2017-02-27)


### Features

* **inline attributes:** Allow formatting attribute on the same line ([da72176](https://github.com/algolia/react-element-to-jsx-string/commit/da72176))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v5.0.7...v6.0.0) (2017-01-03)


### Chores

* **build:** switch to stringify-object[@3](https://github.com/3) ([e9a5c7f](https://github.com/algolia/react-element-to-jsx-string/commit/e9a5c7f))


### BREAKING CHANGES

* build: You need an ES2015 env to use
react-element-to-jsx-string now

You can use the Babel polyfill to do so.



<a name="5.0.7"></a>
## [5.0.7](https://github.com/algolia/react-element-to-jsx-string/compare/v5.0.6...v5.0.7) (2017-01-03)


### Bug Fixes

* **build:** revert to stringify-object[@2](https://github.com/2) ([58542bc](https://github.com/algolia/react-element-to-jsx-string/commit/58542bc)), closes [#71](https://github.com/algolia/react-element-to-jsx-string/issues/71)



<a name="5.0.6"></a>
## [5.0.6](https://github.com/algolia/react-element-to-jsx-string/compare/v5.0.5...v5.0.6) (2017-01-02)



<a name="5.0.5"></a>
## [5.0.5](https://github.com/algolia/react-element-to-jsx-string/compare/v5.0.4...v5.0.5) (2017-01-02)



<a name="5.0.4"></a>
## [5.0.4](https://github.com/algolia/react-element-to-jsx-string/compare/v5.0.3...v5.0.4) (2016-12-08)



<a name="5.0.3"></a>
## [5.0.3](https://github.com/algolia/react-element-to-jsx-string/compare/v5.0.2...v5.0.3) (2016-12-08)



<a name="5.0.2"></a>
## [5.0.2](https://github.com/algolia/react-element-to-jsx-string/compare/v5.0.1...v5.0.2) (2016-11-17)



<a name="5.0.1"></a>
## [5.0.1](https://github.com/algolia/react-element-to-jsx-string/compare/v5.0.0...v5.0.1) (2016-11-16)


### Bug Fixes

* **deps:** remove direct dep on react-addons-test-utils ([06d2588](https://github.com/algolia/react-element-to-jsx-string/commit/06d2588)), closes [#56](https://github.com/algolia/react-element-to-jsx-string/issues/56)



<a name="5.0.0"></a>
# [5.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v4.2.0...v5.0.0) (2016-10-24)


### Features

* **pretty:** prettify objects, arrays, nested ([864b9db](https://github.com/algolia/react-element-to-jsx-string/commit/864b9db))


### BREAKING CHANGES

* pretty: objects and arrays are now prettified by default following #50
If this is a concern to you, open a PR that adds an option to inline parts or the whole output like before



<a name="4.2.0"></a>
# [4.2.0](https://github.com/algolia/react-element-to-jsx-string/compare/v4.1.0...v4.2.0) (2016-09-21)



<a name="4.1.0"></a>
# [4.1.0](https://github.com/algolia/react-element-to-jsx-string/compare/v4.0.0...v4.1.0) (2016-08-30)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v3.2.0...v4.0.0) (2016-08-04)



<a name="3.2.0"></a>
# [3.2.0](https://github.com/algolia/react-element-to-jsx-string/compare/v3.1.2...v3.2.0) (2016-07-15)



<a name="3.1.2"></a>
## [3.1.2](https://github.com/algolia/react-element-to-jsx-string/compare/v3.1.1...v3.1.2) (2016-07-12)



<a name="3.1.1"></a>
## [3.1.1](https://github.com/algolia/react-element-to-jsx-string/compare/v3.1.0...v3.1.1) (2016-07-12)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/algolia/react-element-to-jsx-string/compare/v3.0.0...v3.1.0) (2016-06-28)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v2.6.1...v3.0.0) (2016-05-25)



<a name="2.6.1"></a>
## [2.6.1](https://github.com/algolia/react-element-to-jsx-string/compare/v2.6.0...v2.6.1) (2016-04-15)


### Bug Fixes

* **deps:** allow react 0.14 ([7347b71](https://github.com/algolia/react-element-to-jsx-string/commit/7347b71)), closes [#24](https://github.com/algolia/react-element-to-jsx-string/issues/24)



<a name="2.6.0"></a>
# [2.6.0](https://github.com/algolia/react-element-to-jsx-string/compare/2.5.0...v2.6.0) (2016-04-15)


### Features

* **React:** React v15 compat ([37ee7b5](https://github.com/algolia/react-element-to-jsx-string/commit/37ee7b5))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/algolia/react-element-to-jsx-string/compare/2.3.0...2.4.0) (2016-02-02)



<a name="2.3.0"></a>
# [2.3.0](https://github.com/algolia/react-element-to-jsx-string/compare/v2.2.0...2.3.0) (2016-02-02)


### Features

* **deps:** upgrade all deps ([f3e368d](https://github.com/algolia/react-element-to-jsx-string/commit/f3e368d))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/algolia/react-element-to-jsx-string/compare/v2.1.5...v2.2.0) (2016-01-14)



<a name="2.1.5"></a>
## [2.1.5](https://github.com/algolia/react-element-to-jsx-string/compare/v2.1.4...v2.1.5) (2016-01-05)



<a name="2.1.4"></a>
## [2.1.4](https://github.com/algolia/react-element-to-jsx-string/compare/v2.1.3...v2.1.4) (2015-12-10)


### Bug Fixes

* **stateless comps:** add No Display Name as default component name ([dc0f65c](https://github.com/algolia/react-element-to-jsx-string/commit/dc0f65c)), closes [#11](https://github.com/algolia/react-element-to-jsx-string/issues/11)



<a name="2.1.3"></a>
## [2.1.3](https://github.com/algolia/react-element-to-jsx-string/compare/v2.1.0...v2.1.3) (2015-11-30)


### Bug Fixes

* handle <div>{123}</div> ([609ac78](https://github.com/algolia/react-element-to-jsx-string/commit/609ac78)), closes [#8](https://github.com/algolia/react-element-to-jsx-string/issues/8)
* **lodash:** just use plain lodash and import ([062b3fe](https://github.com/algolia/react-element-to-jsx-string/commit/062b3fe))
* **whitespace:** handle {true} {false} ([eaca1a2](https://github.com/algolia/react-element-to-jsx-string/commit/eaca1a2)), closes [#6](https://github.com/algolia/react-element-to-jsx-string/issues/6) [#7](https://github.com/algolia/react-element-to-jsx-string/issues/7)
* **whitespace:** stop rendering it differently in SOME cases ([128aa95](https://github.com/algolia/react-element-to-jsx-string/commit/128aa95))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/algolia/react-element-to-jsx-string/compare/v2.0.5...v2.1.0) (2015-10-25)


### Features

* handle key="" ([da85281](https://github.com/algolia/react-element-to-jsx-string/commit/da85281))
* handle ref="manual-ref" ([5b18191](https://github.com/algolia/react-element-to-jsx-string/commit/5b18191))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/algolia/react-element-to-jsx-string/compare/v2.0.4...v2.0.5) (2015-10-21)


### Bug Fixes

* merge plain strings props replacements ([7c2bf27](https://github.com/algolia/react-element-to-jsx-string/commit/7c2bf27))



<a name="2.0.4"></a>
## [2.0.4](https://github.com/algolia/react-element-to-jsx-string/compare/v2.0.3...v2.0.4) (2015-10-16)


### Bug Fixes

* **tagName:** fixed an edge-case with decorated component name ([9169ac7](https://github.com/algolia/react-element-to-jsx-string/commit/9169ac7))



<a name="2.0.3"></a>
## [2.0.3](https://github.com/algolia/react-element-to-jsx-string/compare/v2.0.2...v2.0.3) (2015-10-16)


### Bug Fixes

* handle arrays the right way ([597a910](https://github.com/algolia/react-element-to-jsx-string/commit/597a910))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/algolia/react-element-to-jsx-string/compare/v2.0.1...v2.0.2) (2015-10-16)


### Bug Fixes

* **children:** ensure the array of children is well handled ([36b462a](https://github.com/algolia/react-element-to-jsx-string/commit/36b462a))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/algolia/react-element-to-jsx-string/compare/v2.0.0...v2.0.1) (2015-10-16)


### Bug Fixes

* handle empty objects ([fe052bd](https://github.com/algolia/react-element-to-jsx-string/commit/fe052bd))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/algolia/react-element-to-jsx-string/compare/v1.1.2...v2.0.0) (2015-10-16)


### Features

* **deep:** handle deeply set functions ([ad21917](https://github.com/algolia/react-element-to-jsx-string/commit/ad21917))
* **deep:** handle deeply set React elements ([a06f329](https://github.com/algolia/react-element-to-jsx-string/commit/a06f329))


### BREAKING CHANGES

* deep: functions are now stringified to `function noRefCheck()
{}` instead of `function () {code;}`. For various reasons AND to be
specific about the fact that we do not represent the function in a
realistic way.



<a name="1.1.2"></a>
## [1.1.2](https://github.com/algolia/react-element-to-jsx-string/compare/v1.1.1...v1.1.2) (2015-10-16)


### Bug Fixes

* handle null and undefined prop values ([9a57a10](https://github.com/algolia/react-element-to-jsx-string/commit/9a57a10)), closes [#1](https://github.com/algolia/react-element-to-jsx-string/issues/1)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/algolia/react-element-to-jsx-string/compare/v1.1.0...v1.1.1) (2015-10-15)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/algolia/react-element-to-jsx-string/compare/3e2e7b8...v1.1.0) (2015-10-15)


### Bug Fixes

* **whitespace:** remove unwanted whitespace in output ([3e2e7b8](https://github.com/algolia/react-element-to-jsx-string/commit/3e2e7b8))


### Features

* sort object keys in a deterministic way ([c1ce8a6](https://github.com/algolia/react-element-to-jsx-string/commit/c1ce8a6))
