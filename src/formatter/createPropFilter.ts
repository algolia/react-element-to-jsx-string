export default function createPropFilter(
  props: {},
  filter: string[] | ((propValue: any, key: string) => boolean)
) {
  if (Array.isArray(filter)) {
    return (key: string) => filter.indexOf(key) === -1;
  } else {
    // @ts-expect-error: flow to TS
    return (key: string) => filter(props[key], key);
  }
}
