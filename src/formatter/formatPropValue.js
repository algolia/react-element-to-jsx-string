/* @flow */

import isPlainObject from 'is-plain-object';
import { isValidElement } from 'react';
import formatComplexDataStructure from './formatComplexDataStructure';
import formatTreeNode from './formatTreeNode';
import type { Options } from './../options';
import parseReactElement from './../parser/parseReactElement';

const noRefCheck = () => {};
const escape = (s: string): string => s.replace(/"/g, '&quot;');

export const defaultFunctionValue = (fn: any): any => fn;

const formatPropValue = (
  propValue: any,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  if (typeof propValue === 'number') {
    return `{${String(propValue)}}`;
  }

  if (typeof propValue === 'string') {
    return `"${escape(propValue)}"`;
  }

  if (typeof propValue === 'symbol') {
    return `{${propValue.toString()}}`;
  }

  if (typeof propValue === 'function') {
    const { functionValue, showFunctions } = options;
    if (!showFunctions && functionValue === defaultFunctionValue) {
      return `{${functionValue(noRefCheck)}}`;
    }

    return `{${functionValue(propValue)}}`;
  }

  if (isValidElement(propValue)) {
    return `{${formatTreeNode(parseReactElement(propValue, options), true, lvl, options)}}`;
  }

  if (isPlainObject(propValue) || Array.isArray(propValue)) {
    return `{${formatComplexDataStructure(propValue, inline, lvl, options)}}`;
  }

  return `{${propValue}}`;
};

export default formatPropValue;
