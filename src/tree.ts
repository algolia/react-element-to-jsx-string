/* eslint-disable no-use-before-define */

import type { Key } from "react";

type PropsType = Record<string, unknown>;
type DefaultPropsType = Record<string, unknown>;

export type StringTreeNode = {
  type: "string";
  value: string;
};

export type NumberTreeNode = {
  type: "number";
  value: number;
};

export type ReactElementTreeNode = {
  type: "ReactElement";
  displayName: string;
  props: PropsType;
  defaultProps: DefaultPropsType;
  children: Array<TreeNode>;
};

export type ReactFragmentTreeNode = {
  type: "ReactFragment";
  key?: Key | null | undefined;
  children: Array<TreeNode>;
};

export type TreeNode =
  | StringTreeNode
  | NumberTreeNode
  | ReactElementTreeNode
  | ReactFragmentTreeNode;

export const createStringTreeNode = (value: string): StringTreeNode => ({
  type: "string",
  value,
});

export const createNumberTreeNode = (value: number): NumberTreeNode => ({
  type: "number",
  value,
});

export const createReactElementTreeNode = (
  displayName: string,
  props: PropsType,
  defaultProps: DefaultPropsType,
  children: Array<TreeNode>,
): ReactElementTreeNode => ({
  type: "ReactElement",
  displayName,
  props,
  defaultProps,
  children,
});

export const createReactFragmentTreeNode = (
  key: Key | null | undefined,
  children: Array<TreeNode>,
): ReactFragmentTreeNode => ({
  type: "ReactFragment",
  key,
  children,
});
