/* @flow */

import formatTreeNode from './formatTreeNode';

describe('formatTreeNode', () => {
  it('should escape JSX entity on string node', () => {
    expect(
      formatTreeNode({ type: 'string', value: '{ foo: "bar" }' }, true, 0, {})
    ).toBe('&lbrace; foo: "bar" &rbrace;');
  });
});
