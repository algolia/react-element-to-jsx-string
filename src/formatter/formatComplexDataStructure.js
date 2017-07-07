/* @flow */

import collapse from 'collapse-white-space';
import isPlainObject from 'is-plain-object';
import { isValidElement } from 'react';
import stringify from 'stringify-object';
import sortobject from 'sortobject';
import traverse from 'traverse';
import parseReactElement from './../parser/parseReactElement';
// import formatPropValue from './formatPropValue';
import formatReactElementNode from './formatReactElementNode';
import spacer from './spacer';
import type { Options } from './../options';

function noRefCheck() {}

export default (
  obj: Object | Array<any>,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  if (Object.keys(obj).length > 0 || obj.length > 0) {
    // eslint-disable-next-line array-callback-return
    obj = traverse(obj).map(function(value) {
      if (isValidElement(value) || this.isLeaf) {
        // this.update(formatPropValue(value, inline, lvl));
        this.update(value);
      }
    });

    obj = sortobject(obj);
  }

  const stringified = stringify(obj, {
    // singleQuotes: true,
    transform: (currentObj, prop, originalResult) => {
      const currentValue = currentObj[prop];
      if (currentValue && isValidElement(currentValue)) {
        return formatReactElementNode(
          parseReactElement(currentValue, options),
          true,
          lvl,
          options
        );
      }

      if (typeof currentValue === 'function') {
        return noRefCheck;
      }

      return originalResult;
    },
  });

  if (inline) {
    return collapse(stringified)
      .replace(/{ /g, '{')
      .replace(/ }/g, '}')
      .replace(/\[ /g, '[')
      .replace(/ ]/g, ']');
  }

  // Replace tabs with spaces, and add necessary indentation in front of each new line
  return stringified
    .replace(/\t/g, spacer(1, options.tabStop))
    .replace(/\n([^$])/g, `\n${spacer(lvl + 1, options.tabStop)}$1`);
};
