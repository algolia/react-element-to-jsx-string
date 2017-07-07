/* @flow */

import sortobject from 'sortobject';
import stringify from 'stringify-object';
import React, { Element, isValidElement } from 'react';
import traverse from 'traverse';
import spacer from './spacer';
import formatTreeNode from './formatTreeNode';
import formatPropValue, { defaultFunctionValue } from './formatPropValue';
import formatComplexDataStructure from './formatComplexDataStructure';
import type { Options } from './../options';
import parseReactElement from './../parser/parseReactElement';
import type { TreeNode } from './../tree';

export default (
  propName: string,
  hasValue: boolean,
  value: any,
  hasDefaultValue: boolean,
  defaultValue: any,
  inline: boolean,
  lvl: number,
  options: Options
): {
  attributeFormattedInline: string,
  attributeFormattedMultiline: string,
  isMultilineAttribute: boolean,
} => {
  if (!hasValue && !hasDefaultValue) {
    throw new Error(
      `The prop "${propName}" has no value and no default: could not be formatted`
    );
  }

  const usedValue = hasValue ? value : defaultValue;

  const { useBooleanShorthandSyntax } = options;
  const formattedPropValue = formatPropValue(usedValue, inline, lvl, options);

  let attributeFormattedInline = ' ';
  let attributeFormattedMultiline = `\n${spacer(lvl + 1, options.tabStop)}`;
  const isMultilineAttribute = formattedPropValue.indexOf('\n') > -1;

  if (
    useBooleanShorthandSyntax &&
    formattedPropValue === '{false}' &&
    !hasDefaultValue
  ) {
    // If a boolean is false an is not different from it's default, we do not render the attribute
    attributeFormattedInline = '';
    attributeFormattedMultiline = '';
  } else if (useBooleanShorthandSyntax && formattedPropValue === '{true}') {
    attributeFormattedInline += `${propName}`;
    attributeFormattedMultiline += `${propName}`;
  } else {
    attributeFormattedInline += `${propName}=${formattedPropValue}`;
    attributeFormattedMultiline += `${propName}=${formattedPropValue}`;
  }

  return {
    attributeFormattedInline,
    attributeFormattedMultiline,
    isMultilineAttribute,
  };
};
