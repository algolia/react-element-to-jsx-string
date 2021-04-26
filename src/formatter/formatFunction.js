import type { Options } from './../options';
import spacer from './spacer';

function noRefCheck() {}

export const inlineFunction = (fn: any): string =>
  fn
    .toString()
    .split('\n')
    .map(line => line.trim())
    .join('');

export const preserveFunctionLineBreak = (fn: any): string => fn.toString();

export default (
  fn: Function,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  const { functionValue, showFunctions } = options;
  const functionFn =
    functionValue || (inline ? inlineFunction : preserveFunctionLineBreak);
  const shouldShowFunction = showFunctions || functionValue;

  return String(functionFn(shouldShowFunction ? fn : noRefCheck))
    .split('\n')
    .map(ln => spacer(lvl, options.tabStop) + ln)
    .join('\n')
    .trim();
};
