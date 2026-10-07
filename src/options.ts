import type { ReactElement } from "react";

// Any function: only its source (`fn.toString()`) is used
export type AnyFunction = (...args: never[]) => unknown;

export type Options = {
  filterProps: Array<string> | ((propValue: unknown, key: string) => boolean);
  showDefaultProps: boolean;
  showFunctions: boolean;
  functionValue?: (fn: AnyFunction) => string;
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
