/* @flow */

import formatTree from './formatTree';
import formatReactElementNode from './formatReactElementNode';

jest.mock('./formatReactElementNode', () =>
  jest.fn(() => '<MockedComponent />')
);

describe('formatTree', () => {
  it('should format the node as a root node', () => {
    const tree = {};
    const options = {};

    const result = formatTree(tree, options);

    expect(formatReactElementNode).toHaveBeenCalledWith(
      tree,
      false,
      0,
      options
    );

    expect(result).toBe('<MockedComponent />');
  });
});
