#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const expect = require('expect');
const React = require('react');
const reactElementToJsxString = require('./../../dist/').default;

console.log(`Tested "react" version: "${React.version}"`);

const tree = React.createElement(
  'div',
  { foo: 51 },
  React.createElement('h1', {}, 'Hello world')
);

expect(reactElementToJsxString(tree)).toEqual(
  `<div foo={51}>
  <h1>
    Hello world
  </h1>
</div>`
);
