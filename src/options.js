/* @flow */

import * as React from 'react';

export type Options = {|
  filterProps: string[],
  showDefaultProps: boolean,
  showFunctions: boolean | ((fn: Function, prop: string) => boolean),
  functionValue: (fn: Function, prop: string) => Function | string,
  tabStop: number,
  useBooleanShorthandSyntax: boolean,
  useFragmentShortSyntax: boolean,
  sortProps: boolean,

  maxInlineAttributesLineLength?: number,
  displayName?: (element: React.Element<*>) => string,
|};
