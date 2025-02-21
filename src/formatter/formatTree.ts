import type { Options } from "../options";
import type { TreeNode } from "../tree";
import formatTreeNode from "./formatTreeNode";

export default (node: TreeNode, options: Options): string =>
  formatTreeNode(node, false, 0, options);
