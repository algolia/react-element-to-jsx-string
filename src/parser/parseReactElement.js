/* @flow */

import { Children, Element, isValidElement } from 'react';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

const getReactElementDisplayName = (element: Element<*>): string =>
  element.type.displayName ||
  element.type.name || // function name
  (typeof element.type === 'function' // function without a name, you should provide one
    ? 'No Display Name'
    : element.type);

const noChildren = (propsValue, propName) => propName !== 'children';

const onlyMeaningfulChildren = (children): boolean =>
  children !== true &&
  children !== false &&
  children !== null &&
  children !== '';

const filterProps = (originalProps: {}, cb: (any, string) => boolean) => {
  const filteredProps = {};

  Object.keys(originalProps)
    .filter(key => cb(originalProps[key], key))
    .forEach(key => (filteredProps[key] = originalProps[key]));

  return filteredProps;
};

const parseReactElement = (
  element: Element<*> | string | number,
  options: Options
): TreeNode => {
  const { displayName: displayNameFn = getReactElementDisplayName } = options;
  const type = typeof element;

  if (type === 'string' || type === 'number') {
    return {
      type,
      value: element,
    };
  } else if (!isValidElement(element)) {
    throw new Error(
      `react-element-to-jsx-string: Expected a React.Element, got \`${typeof element}\``
    );
  }

  const displayName = displayNameFn(element);

  const props = filterProps(element.props, noChildren);
  if (element.ref !== null) {
    props.ref = element.ref;
  }

  const key = element.key;
  if (typeof key === 'string' && key.search(/^\./)) {
    // React automatically add key=".X" when there are some children
    props.key = key;
  }

  const defaultProps = filterProps(element.type.defaultProps || {}, noChildren);
  const childrens = Children.toArray(element.props.children)
    .filter(onlyMeaningfulChildren)
    .map(child => parseReactElement(child, options));

  return {
    type: 'ReactElement',
    displayName,
    props,
    defaultProps,
    childrens,
  };
};

export default parseReactElement;
