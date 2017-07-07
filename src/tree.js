/* @flow */

export type TreeNode = {|
  displayName?: string,
  type: 'ReactElement' | 'Object' | 'Array' | 'string' | 'number',

  value?: string | number,

  props?: { [key: string]: TreeNode },
  defaultProps?: { [key: string]: TreeNode },
  childrens?: TreeNode[],
|};
