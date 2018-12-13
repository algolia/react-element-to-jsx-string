/* @flow */

const SORT_FIRST = ['key', 'ref'];

export default (sortProps: boolean) => (a: string, b: string): -1 | 0 | 1 => {
  if (a === b) {
    return 0;
  }

  if (SORT_FIRST.includes(a)) {
    if (SORT_FIRST.includes(b)) {
      return SORT_FIRST.indexOf(a) - SORT_FIRST.indexOf(b);
    }
    return -1;
  }

  if (SORT_FIRST.includes(b)) {
    return 1;
  }

  if (!sortProps) {
    return 0;
  }

  return a < b ? -1 : 1;
};
