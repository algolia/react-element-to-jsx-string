/* @flow */

import {
  createStringTreeNode,
  createNumberTreeNode,
  createReactElementTreeNode,
} from './tree';

describe('createStringTreeNode', () => {
  it('generate a string typed node payload', () => {
    expect(createStringTreeNode('foo')).toEqual({
      type: 'string',
      value: 'foo',
    });
  });
});

describe('createNumberTreeNode', () => {
  it('generate a number typed node payload', () => {
    expect(createNumberTreeNode(42)).toEqual({
      type: 'number',
      value: 42,
    });
  });
});

describe('createReactElementTreeNode', () => {
  it('generate a react element typed node payload', () => {
    expect(
      createReactElementTreeNode('MyComponent', { foo: 42 }, { bar: 51 }, [
        'abc',
      ])
    ).toEqual({
      type: 'ReactElement',
      displayName: 'MyComponent',
      props: { foo: 42 },
      defaultProps: { bar: 51 },
      childrens: ['abc'],
    });
  });
});
