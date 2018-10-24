/* @flow */

import spacer from './spacer';
import formatTreeNode from './formatTreeNode';
import type { Options } from './../options';
import type { ReactFunctionTreeNode } from './../tree';

export default (
  node: ReactFunctionTreeNode,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  const { tabStop } = options;
  const { type, childrens } = node;

  if (type !== 'ReactFunction') {
    throw new Error(
      `The "formatReactFunctionNode" function could only format node of type "ReactFunction". Given:  ${
        type
      }`
    );
  }

  const functionRender = formatTreeNode(childrens, false, lvl + 1, options);

  const out = `{() => (
${spacer(lvl + 1, tabStop)}${functionRender}
${spacer(lvl, tabStop)})}`;

  return `${out}`;
};
