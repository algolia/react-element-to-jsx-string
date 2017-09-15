/* @flow */

import formatReactElementNode from './formatReactElementNode';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

const jsxStopChars = ['<', '>', '{', '}', '\n'];
const shouldBeEscaped = (s: string) =>
  jsxStopChars.some(jsxStopChar => s.includes(jsxStopChar));

const escape = (s: string) => {
  if (!shouldBeEscaped(s)) {
    return s;
  }

  return `{\`${s}\`}`;
};

export default (
  node: TreeNode,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  if (node.type === 'number') {
    return String(node.value);
  }

  if (node.type === 'string') {
    return node.value ? escape(String(node.value)) : '';
  }

  if (node.type === 'ReactElement') {
    return formatReactElementNode(node, inline, lvl, options);
  }

  throw new TypeError(`Unknow format type "${node.type}"`);
};
