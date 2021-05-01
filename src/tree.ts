/* eslint-disable no-use-before-define */

import React from 'react';

type PropsType = { [key: string]: any };
type DefaultPropsType = { [key: string]: any };

export type StringTreeNode = {
  type: 'string',
  value: string,
};

export type NumberTreeNode = {
  type: 'number',
  value: number,
};

export type ReactElementTreeNode = {
  type: 'ReactElement',
  displayName: string,
  props: PropsType,
  defaultProps: DefaultPropsType,
  childrens: TreeNode[],
};

export type ReactFragmentTreeNode = {
  type: 'ReactFragment',
  key: React.Key | null | null,
  childrens: TreeNode[],
};

export type TreeNode =
  | StringTreeNode
  | NumberTreeNode
  | ReactElementTreeNode
  | ReactFragmentTreeNode;

export const createStringTreeNode = (value: string): StringTreeNode => ({
  type: 'string',
  value,
});

export const createNumberTreeNode = (value: number): NumberTreeNode => ({
  type: 'number',
  value,
});

export const createReactElementTreeNode = (
  displayName: string,
  props: PropsType,
  defaultProps: DefaultPropsType,
  childrens: TreeNode[]
): ReactElementTreeNode => ({
  type: 'ReactElement',
  displayName,
  props,
  defaultProps,
  childrens,
});

export const createReactFragmentTreeNode = (
  key: React.Key | null,
  childrens: TreeNode[]
): ReactFragmentTreeNode => ({
  type: 'ReactFragment',
  key,
  childrens,
});
