/* @flow */

import { Children, Element, Props, isValidElement } from 'react';
import parseChildren from './parseChildren';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

const getReactElementDisplayName = (element: Element<*>): string => {
  return element.type.displayName ||
    element.type.name || // function name
    (typeof element.type === 'function' // function without a name, you should provide one
      ? 'No Display Name'
      : element.type);
};

const noChildren = (propsValue, propName) => propName !== 'children';

const filterProps = (originalProps: Props, cb: (any, string) => boolean) => {
  const filteredProps = {};

  Object.keys(originalProps)
    .filter(key => cb(originalProps[key], key))
    .forEach(key => filteredProps[key] = originalProps[key]);

  return filteredProps;
};

export default (
  element: Element<*> | string | number,
  options: Options = {} // FIXME: no default value
): TreeNode => {
  const {
    displayName: displayNameFn = getReactElementDisplayName,
  } = options;
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

  const displayName = displayNameFn
    ? displayNameFn(element)
    : getReactElementDisplayName(element);

  const props = filterProps({ ...element.props }, noChildren);
  if (element.ref !== null) {
    props.ref = element.ref;
  }

  const key = element.key || '';
  if (key && !/^\./.test(key)) {
    // React automatically add key=".X" when there are some children
    props.key = key;
  }

  const defaultProps = filterProps(element.type.defaultProps || {}, noChildren);
  const childrens = parseChildren(element, options);

  return {
    type: 'ReactElement',
    displayName,
    props,
    defaultProps,
    childrens,
  };
};
