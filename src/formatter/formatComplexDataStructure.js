/* @flow */

import { isValidElement } from 'react';
import { prettyPrint } from '@base2/pretty-print-object';
import sortObject from './sortObject';
import parseReactElement from './../parser/parseReactElement';
import formatTreeNode from './formatTreeNode';
import formatFunction from './formatFunction';
import spacer from './spacer';
import type { Options } from './../options';

export default (
  value: Object | Array<any>,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  const normalizedValue = sortObject(value);

  const stringifiedValue = prettyPrint(normalizedValue, {
    // `prettyPrint` first calls `filter`, then stringifies the value
    // and only after that calls `transform` (with stringified value as 3rd argument - `originalResult`)
    // since we don't care about `originalResult` for valid React elements and functions
    // we can "skip" stringifying step by filtering out all of the keys using custom `filter`
    // this acts as a perf optimization since React elements can hold fiber data and it can be a deeply nested structure
    filter: currentValue =>
      !isValidElement(currentValue) && typeof currentValue !== 'function',
    transform: (currentObj, prop, originalResult) => {
      const currentValue = currentObj[prop];

      if (currentValue && isValidElement(currentValue)) {
        return formatTreeNode(
          parseReactElement(currentValue, options),
          true,
          lvl,
          options
        );
      }

      if (typeof currentValue === 'function') {
        return formatFunction(currentValue, options);
      }

      return originalResult;
    },
  });

  if (inline) {
    return stringifiedValue
      .replace(/\s+/g, ' ')
      .replace(/{ /g, '{')
      .replace(/ }/g, '}')
      .replace(/\[ /g, '[')
      .replace(/ ]/g, ']');
  }

  // Replace tabs with spaces, and add necessary indentation in front of each new line
  return stringifiedValue
    .replace(/\t/g, spacer(1, options.tabStop))
    .replace(/\n([^$])/g, `\n${spacer(lvl + 1, options.tabStop)}$1`);
};
