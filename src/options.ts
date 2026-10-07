import type { ReactElement } from "react";

// Any function: only its source (`fn.toString()`) is used
export type AnyFunction = (...args: never[]) => unknown;

// Declared as a method to make `propValue` bivariant (like React event
// handlers): callbacks may annotate it with a narrower type.
type FilterPropsFunction = {
  bivarianceHack(propValue: unknown, key: string): boolean;
}["bivarianceHack"];

// Options once the defaults are applied
export type Options = {
  filterProps: Array<string> | FilterPropsFunction;
  showDefaultProps: boolean;
  showFunctions: boolean;
  functionValue?: (fn: AnyFunction) => unknown;
  tabStop: number;
  useBooleanShorthandSyntax: boolean;
  useFragmentShortSyntax: boolean;
  sortProps: boolean;

  maxInlineAttributesLineLength?: number;
  displayName?: (element: ReactElement) => string;
};

// Options accepted by reactElementToJSXString
export type PublicOptions = Partial<Options>;

export const defaultOptions = {
  filterProps: [],
  showDefaultProps: true,
  showFunctions: false,
  tabStop: 2,
  useBooleanShorthandSyntax: true,
  useFragmentShortSyntax: true,
  sortProps: true,
};
