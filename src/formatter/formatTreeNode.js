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
  const { tabStop } = options;

  if (node.type === 'number') {
    return node.value.toString();
  }

  if (node.type === 'string') {
    let str;
    try {
      if (inline) {
        str = `{\`${JSON.stringify(JSON.parse(node.value))}\`}`;
      } else {
        str = `{\`${JSON.stringify(JSON.parse(node.value), null, tabStop)}\`}`;
      }
    } catch (error) {
      str = node.value ? escape(node.value.toString()) : '';
    }

    return str;
  }

  if (node.type === 'ReactElement') {
    return formatReactElementNode(node, inline, lvl, options);
  }

  throw new TypeError(`Unknow format type "${node.type}"`);
};
