import { isValidElement } from 'react';
import formatComplexDataStructure from './formatComplexDataStructure';
import formatFunction from './formatFunction';
import formatTreeNode from './formatTreeNode';
import { isPlainObject } from './isPlainObject';
import type { Options } from '../options';
import parseReactElement from '../parser/parseReactElement';

const escape = (s: string): string => s.replace(/"/g, '&quot;');

const formatPropValue = (
  propValue: unknown,
  inline: boolean,
  lvl: number,
  options: Partial<Options>
): string => {
  if (typeof propValue === 'number') {
    return `{${String(propValue)}}`;
  }

  if (typeof propValue === 'string') {
    return `"${escape(propValue)}"`;
  }

  if (typeof propValue === 'symbol') {
    const symbolDescription = propValue
      .valueOf()
      .toString()
      .replace(/Symbol\((.*)\)/, '$1');

    if (!symbolDescription) {
      return `{Symbol()}`;
    }

    return `{Symbol('${symbolDescription}')}`;
  }

  if (typeof propValue === 'function') {
    return `{${formatFunction(propValue, options)}}`;
  }

  if (isValidElement(propValue)) {
    return `{${formatTreeNode(
      parseReactElement(propValue, options),
      true,
      lvl,
      options
    )}}`;
  }

  if (propValue instanceof Date) {
    if (Number.isNaN(propValue.valueOf())) {
      return `{new Date(NaN)}`;
    }

    return `{new Date("${propValue.toISOString()}")}`;
  }

  if (isPlainObject(propValue)) {
    return `{${formatComplexDataStructure(propValue, inline, lvl, options)}}`;
  }

  if (Array.isArray(propValue)) {
    return `{${formatComplexDataStructure(propValue, inline, lvl, options)}}`;
  }

  return `{${String(propValue)}}`;
};

export default formatPropValue;
