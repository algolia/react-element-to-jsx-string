/* @flow */

const isKeyOrRefProps = (propName: string) => ['key', 'ref'].includes(propName);

export default (sortProps: boolean) => (a: string, b: string): -1 | 0 | 1 => {
  if (a === b) {
    return 0;
  }

  if (isKeyOrRefProps(a) && isKeyOrRefProps(b)) {
    return 1;
  } else if (isKeyOrRefProps(a)) {
    return -1;
  } else if (isKeyOrRefProps(b)) {
    return 1;
  }

  if (!sortProps) {
    return 0;
  }

  return a < b ? -1 : 1;
};
