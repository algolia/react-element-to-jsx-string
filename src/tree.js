/* @flow */

export type TreeNode = {|
  type: 'ReactElement' | 'string' | 'number',

  value?: string | number,

  displayName?: string,
  props?: { [key: string]: TreeNode },
  defaultProps?: { [key: string]: TreeNode },
  childrens?: TreeNode[],
|};
