/* @flow */

import * as React from 'react';
import formatTree from './formatter/formatTree';
import parseReactElement from './parser/parseReactElement';
import type { Options } from './options';

const reactElementToJsxString = (
  element: React.Element<any>,
  {
    filterProps = [],
    showDefaultProps = true,
    showFunctions = false,
    functionValue,
    tabStop = 2,
    useBooleanShorthandSyntax = true,
    sortProps = true,
    maxInlineAttributesLineLength,
    displayName,
  }: Options = {}
) => {
  if (!element) {
    throw new Error('react-element-to-jsx-string: Expected a ReactElement');
  }

  const options = {
    filterProps,
    showDefaultProps,
    showFunctions,
    functionValue,
    tabStop,
    useBooleanShorthandSyntax,
    sortProps,
    maxInlineAttributesLineLength,
    displayName,
  };

  return formatTree(parseReactElement(element, options), options);
};

export default reactElementToJsxString;
