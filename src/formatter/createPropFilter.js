/* @flow */

export default function createPropFilter(
  props: {},
  filter: string[] | ((any, string) => boolean)
) {
  if (Array.isArray(filter)) {
    return key => filter.indexOf(key) === -1;
  } else {
    return key => filter(props[key], key);
  }
}
