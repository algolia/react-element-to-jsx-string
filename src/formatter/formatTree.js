/* @flow */

import { defaultFunctionValue } from './formatPropValue';
import formatReactElementNode from './formatReactElementNode';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

export default (
  node: TreeNode,
  {
    filterProps = [],
    showDefaultProps = true,
    showFunctions = false,
    functionValue = defaultFunctionValue,
    tabStop = 2,
    useBooleanShorthandSyntax = true,
    sortProps = true,
    maxInlineAttributesLineLength,
    displayName,
  }: Options = {}
): string => {
  const options = {
    filterProps,
    showDefaultProps,
    showFunctions,
    functionValue,
    tabStop,
    useBooleanShorthandSyntax,
    sortProps,
    maxInlineAttributesLineLength,
    displayName,
  };

  return formatReactElementNode(node, false, 0, options);
};
