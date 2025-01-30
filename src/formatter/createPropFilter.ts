// TODO: To be renamed `createPropsFilter`
export default function createPropFilter<Value extends unknown>(
  props: Record<string, Value>,
  filter: string[] | ((propValue: Value, key: string) => boolean)
) {
  if (Array.isArray(filter)) {
    return (key: string) => filter.indexOf(key) === -1;
  }

  return (key: string) => filter(props[key], key);
}
