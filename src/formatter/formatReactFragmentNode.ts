import type { Key } from "react";
import type { Options } from "../options";
import type {
  ReactElementTreeNode,
  ReactFragmentTreeNode,
  TreeNode,
} from "../tree";
import formatReactElementNode from "./formatReactElementNode";

const REACT_FRAGMENT_TAG_NAME_SHORT_SYNTAX = "";
const REACT_FRAGMENT_TAG_NAME_EXPLICIT_SYNTAX = "React.Fragment";

const toReactElementTreeNode = (
  displayName: string,
  key: Key | null | undefined,
  children: TreeNode[],
): ReactElementTreeNode => {
  let props = {};
  if (key) {
    props = {
      key,
    };
  }

  return {
    type: "ReactElement",
    displayName,
    props,
    defaultProps: {},
    children,
  };
};

const isKeyedFragment = ({ key }: ReactFragmentTreeNode) => Boolean(key);
const hasNoChildren = ({ children }: ReactFragmentTreeNode) =>
  children.length === 0;

export default (
  node: ReactFragmentTreeNode,
  inline: boolean,
  lvl: number,
  options: Options,
): string => {
  const { type, key, children } = node;

  if (type !== "ReactFragment") {
    throw new Error(
      `The "formatReactFragmentNode" function could only format node of type "ReactFragment". Given: ${type}`,
    );
  }

  const { useFragmentShortSyntax } = options;

  let displayName: string;
  if (useFragmentShortSyntax) {
    if (hasNoChildren(node) || isKeyedFragment(node)) {
      displayName = REACT_FRAGMENT_TAG_NAME_EXPLICIT_SYNTAX;
    } else {
      displayName = REACT_FRAGMENT_TAG_NAME_SHORT_SYNTAX;
    }
  } else {
    displayName = REACT_FRAGMENT_TAG_NAME_EXPLICIT_SYNTAX;
  }

  return formatReactElementNode(
    toReactElementTreeNode(displayName, key, children),
    inline,
    lvl,
    options,
  );
};
