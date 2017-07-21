/* @flow */

import type { TreeNode } from './../tree';

const areMergeable = (nodeA: TreeNode, nodeB: TreeNode): boolean =>
  (nodeA.type === 'string' || nodeA.type === 'number') &&
  (nodeB.type === 'string' || nodeB.type === 'number');

export default (
  previousNodes: TreeNode[],
  currentNode: TreeNode
): TreeNode[] => {
  const lastNode = previousNodes[previousNodes.length - 1];

  if (lastNode && areMergeable(lastNode, currentNode)) {
    lastNode.value = String(lastNode.value) + String(currentNode.value);
  } else {
    previousNodes.push(currentNode);
  }

  return previousNodes;
};
