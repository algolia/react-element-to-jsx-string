export default function createPropFilter(
  props: Record<string, any>,
  filter: string[] | ((propValue: any, propKey: string) => boolean)
) {
  if (Array.isArray(filter)) {
    return (key: string) => filter.indexOf(key) === -1;
  } 
    return (key: string) => filter(props[key], key);
  
}
