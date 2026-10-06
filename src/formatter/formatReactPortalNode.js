/* @flow */

import type { Key } from 'react';
import formatReactElementNode from './formatReactElementNode';
import type { Options } from './../options';
import type {
  ReactElementTreeNode,
  ReactPortalTreeNode,
  TreeNode,
} from './../tree';
import spacer from './spacer';

const toReactElementTreeNode = (
  displayName: string,
  key: ?Key,
  childrens: TreeNode[]
): ReactElementTreeNode => {
  let props = {};
  if (key) {
    props = { key };
  }

  return {
    type: 'ReactElement',
    displayName,
    props,
    defaultProps: {},
    childrens,
  };
};

export default (
  node: ReactPortalTreeNode,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  const { type, containerSelector, childrens } = node;

  if (type !== 'ReactPortal') {
    throw new Error(
      `The "formatReactPortalNode" function could only format node of type "ReactPortal". Given: ${type}`
    );
  }

  return `
      {ReactDOM.createPortal(${
        childrens.length
          ? `\n${spacer(lvl + 1, options.tabStop)}${formatReactElementNode(
              toReactElementTreeNode('', undefined, childrens),
              inline,
              lvl + 1,
              options
            )}\n`
          : 'null'
      }, document.querySelector(\`${containerSelector}\`))}
  `.trim();
};
