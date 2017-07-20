/* @flow */

import formatReactElementNode from './formatReactElementNode';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

const escape = (s: string): string =>
  s.replace(/{/g, '&lbrace;').replace(/}/g, '&rbrace;');

export default (
  node: TreeNode,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  if (node.type === 'string' || node.type === 'number') {
    return node.value ? escape(node.value.toString()) : '';
  }

  if (node.type === 'ReactElement') {
    return formatReactElementNode(node, inline, lvl, options);
  }

  throw new TypeError(`Unknow format type "${node.type}"`);
};
