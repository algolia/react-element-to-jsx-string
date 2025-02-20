import type { ReactNode } from 'react';
import formatTree from './formatter/formatTree';
import parseReactElement from './parser/parseReactElement';
import { defaultOptions, type Options } from './options';

const reactElementToJsxString = (
  element: ReactNode,
  {
    filterProps = [],
    showDefaultProps = true,
    showFunctions = false,
    functionValue,
    tabStop = defaultOptions.tabStop,
    useBooleanShorthandSyntax = true,
    useFragmentShortSyntax = true,
    sortProps = true,
    maxInlineAttributesLineLength,
    displayName,
  }: Partial<Options> = {}
): string => {
  if (!element) {
    return '';
  }

  const options: Options = {
    filterProps,
    showDefaultProps,
    showFunctions,
    functionValue,
    tabStop,
    useBooleanShorthandSyntax,
    useFragmentShortSyntax,
    sortProps,
    maxInlineAttributesLineLength,
    displayName,
  };

  return formatTree(parseReactElement(element, options), options);
};

export default reactElementToJsxString;

export {
  inlineFunction,
  preserveFunctionLineBreak,
} from './formatter/formatFunction';
