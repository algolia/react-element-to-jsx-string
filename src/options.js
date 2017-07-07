/* @flow */

export type Options = {|
  filterProps: string[],
  showDefaultProps: boolean,
  showFunctions: boolean,
  functionValue: Function,
  tabStop: number,
  useBooleanShorthandSyntax: boolean,
  sortProps: boolean,

  maxInlineAttributesLineLength?: number,
  displayName?: (element: Element<*>) => string,
|};
