/* @flow */

import React from 'react';
import formatPropValue from './formatPropValue';
import parseReactElement from './../parser/parseReactElement';
import formatTreeNode from './formatTreeNode';
import formatComplexDataStructure from './formatComplexDataStructure';

jest.mock('./../parser/parseReactElement');
jest.mock('./formatTreeNode', () =>
  jest.fn().mockReturnValue('<MockedFormatTreeNodeResult />')
);
jest.mock('./formatComplexDataStructure', () =>
  jest.fn().mockReturnValue('*Mocked formatComplexDataStructure result*')
);

describe('formatPropValue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should format an integer prop value', () => {
    expect(formatPropValue(42, 'foo', false, 0, {})).toBe('{42}');
  });

  it('should escape double quote on prop value of string type', () => {
    expect(formatPropValue('Hello "Jonh"!', 'foo', false, 0, {})).toBe(
      '"Hello &quot;Jonh&quot;!"'
    );
  });

  it('should format a symbol prop value', () => {
    expect(formatPropValue(Symbol('Foo'), 'foo', false, 0, {})).toBe(
      "{Symbol('Foo')}"
    );

    // eslint-disable-next-line symbol-description
    expect(formatPropValue(Symbol(), 'foo', false, 0, {})).toBe('{Symbol()}');
  });

  it('should replace a function prop value by a an empty generic function by default', () => {
    const doThings = a => a * 2;

    expect(formatPropValue(doThings, 'foo', false, 0, {})).toBe(
      '{function noRefCheck() {}}'
    );
  });

  it('should show the function prop value implementation if "showFunctions" option is true', () => {
    const doThings = a => a * 2;

    expect(
      formatPropValue(doThings, 'foo', false, 0, { showFunctions: true })
    ).toBe('{function doThings(a) {return a * 2;}}');
  });

  it('should format the function prop value with the "functionValue" option', () => {
    const doThings = a => a * 2;

    const functionValue = fn => {
      expect(fn).toBe(doThings);

      return 'function Myfunction() {}';
    };

    expect(
      formatPropValue(doThings, 'foo', false, 0, {
        functionValue,
        showFunctions: true,
      })
    ).toBe('{function Myfunction() {}}');

    expect(
      formatPropValue(doThings, 'foo', false, 0, {
        functionValue,
        showFunctions: false,
      })
    ).toBe('{function Myfunction() {}}');
  });

  it('should parse and format a react element prop value', () => {
    expect(formatPropValue(<div />, 'foo', false, 0, {})).toBe(
      '{<MockedFormatTreeNodeResult />}'
    );

    expect(parseReactElement).toHaveBeenCalledTimes(1);
    expect(formatTreeNode).toHaveBeenCalledTimes(1);
  });

  it('should format a date prop value', () => {
    expect(
      formatPropValue(new Date('2017-01-01T11:00:00.000Z'), 'foo', false, 0, {})
    ).toBe('{new Date("2017-01-01T11:00:00.000Z")}');
  });

  it('should format an invalid date prop value', () => {
    expect(formatPropValue(new Date(NaN), 'foo', false, 0, {})).toBe(
      '{new Date(NaN)}'
    );
  });

  it('should format an object prop value', () => {
    expect(formatPropValue({ foo: 42 }, 'foo', false, 0, {})).toBe(
      '{*Mocked formatComplexDataStructure result*}'
    );

    expect(formatComplexDataStructure).toHaveBeenCalledTimes(1);
  });

  it('should format an array prop value', () => {
    expect(formatPropValue(['a', 'b', 'c'], 'foo', false, 0, {})).toBe(
      '{*Mocked formatComplexDataStructure result*}'
    );

    expect(formatComplexDataStructure).toHaveBeenCalledTimes(1);
  });

  it('should format a boolean prop value', () => {
    expect(formatPropValue(true, 'foo', false, 0, {})).toBe('{true}');
    expect(formatPropValue(false, 'foo', false, 0, {})).toBe('{false}');
  });

  it('should format null prop value', () => {
    expect(formatPropValue(null, 'foo', false, 0, {})).toBe('{null}');
  });

  it('should format undefined prop value', () => {
    expect(formatPropValue(undefined, 'foo', false, 0, {})).toBe('{undefined}');
  });

  it('should call the ".toString()" method on object instance prop value', () => {
    expect(formatPropValue(new Set(['a', 'b', 42]), 'foo', false, 0, {})).toBe(
      '{[object Set]}'
    );

    expect(formatPropValue(new Map(), 'foo', false, 0, {})).toBe(
      '{[object Map]}'
    );
  });
});
