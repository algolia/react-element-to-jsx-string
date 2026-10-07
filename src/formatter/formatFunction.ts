import type { AnyFunction, Options } from "../options";

function noRefCheck() {}

export const isFunction = (value: unknown): value is AnyFunction =>
  typeof value === "function";

export const inlineFunction = (fn: AnyFunction): string =>
  fn
    .toString()
    .split("\n")
    .map((line) => line.trim())
    .join("");

export const preserveFunctionLineBreak = (fn: AnyFunction): string =>
  fn.toString();

const defaultFunctionValue = inlineFunction;

export default (fn: AnyFunction, options: Options): string => {
  const { functionValue = defaultFunctionValue, showFunctions } = options;

  if (!showFunctions && functionValue === defaultFunctionValue) {
    return functionValue(noRefCheck);
  }

  return functionValue(fn);
};
