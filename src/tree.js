/* @flow */
/* eslint-disable no-use-before-define */

type PropsType = { [key: string]: any };
type DefaultPropsType = { [key: string]: any };

export type TreeNode = {|
  type: 'ReactElement' | 'string' | 'number',

  value?: string | number,

  displayName?: string,
  props?: PropsType,
  defaultProps?: DefaultPropsType,
  childrens?: TreeNode[],
|};

export const createStringTreeNode = (value: string): TreeNode => ({
  type: 'string',
  value,
});

export const createNumberTreeNode = (value: number): TreeNode => ({
  type: 'number',
  value,
});

export const createReactElementTreeNode = (
  displayName: string,
  props: PropsType,
  defaultProps: DefaultPropsType,
  childrens: TreeNode[] = []
): TreeNode => ({
  type: 'ReactElement',
  displayName,
  props,
  defaultProps,
  childrens,
});
