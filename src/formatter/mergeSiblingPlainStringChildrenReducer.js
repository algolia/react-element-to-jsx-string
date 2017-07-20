/* @flow */

import type { TreeNode } from './../tree';

export default (
  previousNodes: TreeNode[],
  currentNode: TreeNode
): TreeNode[] => {
  const lastNode = previousNodes[previousNodes.length - 1];
  const newNode = { ...currentNode };

  if (newNode.type === 'number') {
    newNode.type = 'string';
    newNode.value = String(newNode.value);
  }

  if (
    lastNode &&
    lastNode.type === 'string' &&
    typeof lastNode.value === 'string' &&
    newNode.type === 'string'
  ) {
    lastNode.value += newNode.value || '';
  } else {
    previousNodes.push(newNode);
  }

  return previousNodes;
};
