/* @flow */

export default function sortObject(value: any, seen = []): any {
  // return non-object value as is
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // return date and regexp values as is
  if (value instanceof Date || value instanceof RegExp) {
    return value;
  }

  if (seen.includes(value)) return '[Circular]';
  seen.push(value);

  if (Array.isArray(value)) {
    // make a copy of array with each item passed through sortObject()
    value = value.map(value => sortObject(value, seen));
  } else {
    // make a copy of object with key sorted
    value = Object.keys(value)
      .sort()
      .reduce((result, key) => {
        if (key !== '_owner') {
          // eslint-disable-next-line no-param-reassign
          result[key] = sortObject(value[key], seen);
        }
        return result;
      }, {});
  }

  seen.pop();
  return value;
}
