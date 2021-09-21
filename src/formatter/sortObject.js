/* @flow */

export default function sortObject(value: any, seen = new Set()): any {
  // return non-object value as is
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // return date and regexp values as is
  if (value instanceof Date || value instanceof RegExp) {
    return value;
  }

  if (seen.has(value)) return '[Circular]';
  seen.add(value);

  // make a copy of array with each item passed through sortObject()
  if (Array.isArray(value)) {
    return value.map(value => sortObject(value, seen));
  }

  // make a copy of object with key sorted
  return Object.keys(value)
    .sort()
    .reduce((result, key) => {
      if (key === '_owner') {
        return result;
      }
      if (key === 'current') {
        // eslint-disable-next-line no-param-reassign
        result[key] = '[Circular]';
      } else {
        // eslint-disable-next-line no-param-reassign
        result[key] = sortObject(value[key], seen);
      }
      return result;
    }, {});
}
