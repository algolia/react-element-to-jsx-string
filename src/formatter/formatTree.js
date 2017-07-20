/* @flow */

import formatReactElementNode from './formatReactElementNode';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

export default (node: TreeNode, options: Options): string =>
  formatReactElementNode(node, false, 0, options);
