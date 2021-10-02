import * as React from 'react';

export default function sortObject(value: any): any {
  // return non-object value as is
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // return date, regexp and react element values as is
  if (
    value instanceof Date ||
    value instanceof RegExp ||
    React.isValidElement(value)
  ) {
    return value;
  }

  // make a copy of array with each item passed through sortObject()
  if (Array.isArray(value)) {
    return value.map(sortObject);
  }

  // make a copy of object with key sorted
  return Object.keys(value)
    .sort()
    .reduce((result, key) => {
      if (key === '_owner') {
        return result;
      }

      if (key === 'current') {
        // @ts-expect-error: flow to TS
        result[key] = '[Circular]'; // eslint-disable-line no-param-reassign
      } else {
        // @ts-expect-error: flow to TS
        result[key] = sortObject(value[key]); // eslint-disable-line no-param-reassign
      }

      return result;
    }, {});
}
