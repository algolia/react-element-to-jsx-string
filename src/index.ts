import type { ReactNode } from "react";

import formatTree from "./formatter/formatTree";
import { type Options, type PublicOptions, defaultOptions } from "./options";
import parseReactElement from "./parser/parseReactElement";

const reactElementToJsxString = (
  element: ReactNode,
  publicOptions: PublicOptions = {},
): string => {
  const {
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
  } = publicOptions;

  if (!element) {
    return "";
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

export type { PublicOptions as Options };

export {
  inlineFunction,
  preserveFunctionLineBreak,
} from "./formatter/formatFunction";
