import * as React from 'react';
export type Options = {
  filterProps: string[];
  showDefaultProps: boolean;
  showFunctions: boolean;
  functionValue: (...args: Array<any>) => any;
  tabStop: number;
  useBooleanShorthandSyntax: boolean;
  useFragmentShortSyntax: boolean;
  sortProps: boolean;
  maxInlineAttributesLineLength?: number;
  displayName?: (element: React.ReactElement<any>) => string;
};
