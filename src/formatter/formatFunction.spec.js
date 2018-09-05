/* @flow */

import formatFunction from './formatFunction';

jest.mock('./formatReactElementNode.js', () => node =>
  `<${node.displayName} />`
);

describe('formatFunction', () => {
  it('should replace a function with noRefCheck without showFunctions option', () => {
    expect(
      formatFunction(function hello() {
        return 1;
      }, {})
    ).toEqual('function noRefCheck() {}');
  });

  it('should replace a function with noRefCheck if showFunctions is false', () => {
    expect(
      formatFunction(
        function hello() {
          return 1;
        },
        { showFunctions: false }
      )
    ).toEqual('function noRefCheck() {}');
  });

  it('should format a function if showFunctions is true', () => {
    expect(
      formatFunction(
        function hello() {
          return 1;
        },
        { showFunctions: true }
      )
    ).toEqual('function hello() {return 1;}');
  });

  it('should format a function without name if showFunctions is true', () => {
    expect(
      formatFunction(
        function() {
          return 1;
        },
        { showFunctions: true }
      )
    ).toEqual('function () {return 1;}');
  });

  it('should use the functionValue option', () => {
    expect(
      formatFunction(
        function hello() {
          return 1;
        },
        { functionValue: () => '<Test />' }
      )
    ).toEqual('<Test />');
  });

  it('should use the functionValue option even if showFunctions is true', () => {
    expect(
      formatFunction(
        function hello() {
          return 1;
        },
        { showFunctions: true, functionValue: () => '<Test />' }
      )
    ).toEqual('<Test />');
  });

  it('should use the functionValue option even if showFunctions is false', () => {
    expect(
      formatFunction(
        function hello() {
          return 1;
        },
        { showFunctions: false, functionValue: () => '<Test />' }
      )
    ).toEqual('<Test />');
  });
});
