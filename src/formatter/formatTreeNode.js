/* @flow */

import formatReactElementNode from './formatReactElementNode';

export default (
  node: TreeNode,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  if (node.type === 'string' || node.type === 'number') {
    return node.value ? node.value.toString() : '';
  }

  if (node.type === 'ReactElement') {
    return formatReactElementNode(node, inline, lvl, options);
  }

  throw new TypeError(`Unknow format type "${node.type}"`);
};
