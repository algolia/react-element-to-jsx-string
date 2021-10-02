import type { Options } from './../options';

function noRefCheck() {}

type FunctionType = (...args: Array<any>) => any;

export const inlineFunction = (fn: FunctionType): string =>
  fn
    .toString()
    .split('\n')
    .map((line) => line.trim())
    .join('');

export const preserveFunctionLineBreak = (fn: FunctionType): string =>
  fn.toString();

const defaultFunctionValue = inlineFunction;

export default (fn: FunctionType, options: Options): string => {
  const { functionValue = defaultFunctionValue, showFunctions } = options;

  if (!showFunctions && functionValue === defaultFunctionValue) {
    return functionValue(noRefCheck);
  }

  return functionValue(fn);
};
