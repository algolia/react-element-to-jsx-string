// Run by run.js in a temporary project where the packed package is installed.

import assert from "node:assert/strict";

import React from "react";
import reactElementToJsxString from "react-element-to-jsx-string";

console.log(`Tested "react" version: "${React.version}"`);

const tree = React.createElement(
  "div",
  { foo: 51 },
  React.createElement("h1", {}, "Hello world"),
);

const expected = `<div foo={51}>
  <h1>
    Hello world
  </h1>
</div>`;

assert.equal(reactElementToJsxString(tree), expected);

console.log("Smoke test passed");
