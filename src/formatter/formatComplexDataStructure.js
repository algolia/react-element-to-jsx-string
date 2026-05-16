/* @flow */

import { isValidElement } from 'react';
import { prettyPrint } from '@base2/pretty-print-object';
import sortObject from './sortObject';
import parseReactElement from './../parser/parseReactElement';
import formatTreeNode from './formatTreeNode';
import formatFunction from './formatFunction';
import spacer from './spacer';
import type { Options } from './../options';

const escapeStringForSingleQuotedLiteral = (s: string): string =>
  // Avoid regex literals with control characters to keep ESLint happy.
  s
    .replace(/\\/g, '\\\\') // Keep backslashes literal (avoid \1-style escapes)
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t')
    .split(String.fromCharCode(8))
    .join('\\b')
    .split(String.fromCharCode(12))
    .join('\\f');

export default (
  value: Object | Array<any>,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  const normalizedValue = sortObject(value);

  const stringifiedValue = prettyPrint(normalizedValue, {
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

      if (typeof currentValue === 'string') {
        // pretty-print-object can output strings without escaping backslashes
        // enough for JS string literal correctness, e.g. "\1" vs "\\1".
        // We always output a valid single-quoted JS literal here.
        return `'${escapeStringForSingleQuotedLiteral(currentValue)}'`;
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
