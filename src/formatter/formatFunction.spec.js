/* @flow */

import formatFunction from './formatFunction';

jest.mock('./formatReactElementNode.js', () => node =>
  `<${node.displayName} />`
);

describe('formatFunction', () => {
  it('should replace a function with noRefCheck', () => {
    expect(
      formatFunction(function hello() {
        return 1;
      }, {})
    ).toEqual('function noRefCheck() {}');
  });

  it('should format a function', () => {
    expect(
      formatFunction(
        function hello() {
          return 1;
        },
        { showFunctions: true }
      )
    ).toEqual('function hello() {return 1;}');
  });

  it('should format a function without name', () => {
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
});
