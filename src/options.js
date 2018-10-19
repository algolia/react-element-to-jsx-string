/* @flow */

import * as React from 'react';

export type OptionParams = {|
  filterProps?: string[],
  showDefaultProps?: boolean,
  showFunctions?: boolean,
  functionValue?: Function,
  tabStop?: number,
  useBooleanShorthandSyntax?: boolean,
  useFragmentShortSyntax?: boolean,
  sortProps?: boolean,

  maxInlineAttributesLineLength?: number,
  displayName?: (element: React.Element<*>) => string,
|};

export type Options = {|
  filterProps: string[],
  showDefaultProps: boolean,
  showFunctions: boolean,
  functionValue?: Function,
  tabStop: number,
  useBooleanShorthandSyntax: boolean,
  useFragmentShortSyntax: boolean,
  sortProps: boolean,

  maxInlineAttributesLineLength?: number,
  displayName?: (element: React.Element<*>) => string,
|};
