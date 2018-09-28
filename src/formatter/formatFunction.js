import type { Options } from './../options';

function noRefCheck() {}

const defaultFunctionValue = (fn: any): any => fn.toString();

export default (fn: Function, options: Options): string => {
  const { functionValue = defaultFunctionValue, showFunctions } = options;
  if (!showFunctions && functionValue === defaultFunctionValue) {
    return functionValue(noRefCheck);
  }

  return functionValue(fn);
};
