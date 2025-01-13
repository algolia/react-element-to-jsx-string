import formatTreeNode from './formatTreeNode';
import type { Options } from '../options';
import type { TreeNode } from '../tree';

export default (node: TreeNode, options: Partial<Options>): string =>
  formatTreeNode(node, false, 0, options);
