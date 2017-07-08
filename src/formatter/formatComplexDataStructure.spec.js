/* @flow */

import React from 'react';
import formatComplexDataStructure from './formatComplexDataStructure';

jest.mock('./formatReactElementNode.js', () => node =>
  `<${node.displayName} />`
);

const createFakeReactElement = (tagName = 'Foo') =>
  React.createElement(tagName, {}, null);
const options = { tabStop: 2 };

describe('formatComplexDataStructure', () => {
  it('should format an object', () => {
    const fixture = { a: 1, b: { c: 'ccc' } };

    expect(formatComplexDataStructure(fixture, false, 0, options)).toEqual(
      `{
    a: 1,
    b: {
      c: 'ccc'
    }
  }`
    );
  });

  it('should format inline an object', () => {
    const fixture = { a: 1, b: { c: 'ccc' } };

    expect(formatComplexDataStructure(fixture, true, 0, options)).toEqual(
      "{a: 1, b: {c: 'ccc'}}"
    );
  });

  it('should format an array', () => {
    const fixture = [1, '2', true, false, null];

    expect(formatComplexDataStructure(fixture, false, 0, options)).toEqual(
      `[
    1,
    '2',
    true,
    false,
    null
  ]`
    );
  });

  it('should format inline an array ', () => {
    const fixture = [1, '2', true, false, null];

    expect(formatComplexDataStructure(fixture, true, 0, options)).toEqual(
      "[1, '2', true, false, null]"
    );
  });

  it('should format an object that contains a react element', () => {
    const fixture = { a: createFakeReactElement('BarBar') };

    expect(formatComplexDataStructure(fixture, false, 0, options)).toEqual(
      `{
    a: <BarBar />
  }`
    );
  });
});
