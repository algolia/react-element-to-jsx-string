/* @flow */

import formatFunction from './formatFunction';

jest.mock('./formatReactElementNode.js', () => node =>
  `<${node.displayName} />`
);

function hello() {
  return 1;
}

describe('formatFunction', () => {
  it('should replace a function with noRefCheck without showFunctions option', () => {
    expect(formatFunction(hello, true, 0, {})).toEqual(
      'function noRefCheck() {}'
    );
  });

  it('should replace a function with noRefCheck if showFunctions is false', () => {
    expect(formatFunction(hello, true, 0, { showFunctions: false })).toEqual(
      'function noRefCheck() {}'
    );
  });

  it('should format a function if showFunctions is true', () => {
    expect(formatFunction(hello, true, 0, { showFunctions: true })).toEqual(
      'function hello() {return 1;}'
    );
  });

  it('should format a function without name if showFunctions is true', () => {
    expect(formatFunction(() => 1, true, 0, { showFunctions: true })).toEqual(
      'function () {return 1;}'
    );
  });

  it('should use the functionValue option', () => {
    expect(
      formatFunction(hello, true, 0, { functionValue: () => '<Test />' })
    ).toEqual('<Test />');
  });

  it('should use the functionValue option even if showFunctions is true', () => {
    expect(
      formatFunction(hello, true, 0, {
        showFunctions: true,
        functionValue: () => '<Test />',
      })
    ).toEqual('<Test />');
  });

  it('should use the functionValue option even if showFunctions is false', () => {
    expect(
      formatFunction(hello, true, 0, {
        showFunctions: false,
        functionValue: () => '<Test />',
      })
    ).toEqual('<Test />');
  });

  it('should format multi-line function', () => {
    expect(
      formatFunction(hello, false, 0, { showFunctions: true, tabStop: 2 })
    ).toEqual('function hello() {\n  return 1;\n}');
  });

  it('should format multi-line function with indentation', () => {
    expect(
      formatFunction(hello, false, 1, { showFunctions: true, tabStop: 2 })
    ).toEqual('function hello() {\n    return 1;\n  }');
  });
});
