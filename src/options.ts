import type { ReactElement } from "react";

export type Options = {
  filterProps: Array<string> | ((propValue: unknown, key: string) => boolean);
  showDefaultProps: boolean;
  showFunctions: boolean;
  functionValue?: (...args: Array<any>) => any;
  tabStop: number;
  useBooleanShorthandSyntax: boolean;
  useFragmentShortSyntax: boolean;
  sortProps: boolean;

  maxInlineAttributesLineLength?: number;
  displayName?: (element: ReactElement) => string;
};

export const defaultOptions = {
  filterProps: [],
  showDefaultProps: true,
  showFunctions: false,
  tabStop: 2,
  useBooleanShorthandSyntax: true,
  useFragmentShortSyntax: true,
  sortProps: true,
};
