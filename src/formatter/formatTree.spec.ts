import { describe, it, expect, vitest } from 'vitest';
import formatTree from './formatTree';
import formatTreeNode from './formatTreeNode';

vitest.mock('./formatTreeNode');

describe('formatTree', () => {
  it('should format the node as a root node', () => {
    vitest.mocked(formatTreeNode).mockReturnValue('<MockedComponent />');

    const tree = {};
    const options = {};

    const result = formatTree(tree, options);

    expect(formatTreeNode).toHaveBeenCalledWith(tree, false, 0, options);

    expect(result).toBe('<MockedComponent />');
  });
});
