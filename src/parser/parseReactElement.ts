import * as ReactIs from 'react-is';
import React, { Fragment } from 'react';
import type { Options } from '../options';
import {
  createStringTreeNode,
  createNumberTreeNode,
  createReactElementTreeNode,
  createReactFragmentTreeNode,
} from '../tree';
import type { TreeNode } from '../tree';

const supportFragment = Boolean(Fragment);

const getReactElementDisplayName = (element: React.ReactElement<any>): string =>
  element.type.displayName ||
  (element.type.name !== '_default' ? element.type.name : null) || // function name
  (ReactIs.isForwardRef(element) ? element.type.render.displayName : null) ||
  (typeof element.type === 'function' // function without a name, you should provide one
    ? 'No Display Name'
    : element.type);

const noChildren = (propsValue, propName) => propName !== 'children';

const onlyMeaningfulChildren = (children: React.ReactNode): boolean =>
  children !== true &&
  children !== false &&
  children !== null &&
  children !== '';

const filterProps = (
  originalProps: Record<string, any>,
  cb: (propValue: any, porpName: string) => boolean
) => {
  const filteredProps = {};

  Object.keys(originalProps)
    .filter(key => cb(originalProps[key], key))
    .forEach(key => {
      filteredProps[key] = originalProps[key];
    });

  return filteredProps;
};

const parseReactElement = (
  element: ReactElement<*> | string | number,
  options: Options
): TreeNode => {
  const { displayName: displayNameFn = getReactElementDisplayName } = options;

  if (typeof element === 'string') {
    return createStringTreeNode(element);
  }
  if (typeof element === 'number') {
    return createNumberTreeNode(element);
  }
  if (!React.isValidElement(element)) {
    throw new Error(
      `react-element-to-jsx-string: Expected a React.Element, got \`${typeof element}\``
    );
  }

  const displayName = displayNameFn(element);

  const props = filterProps(element.props, noChildren);
  if (element.ref !== null) {
    props.ref = element.ref;
  }

  const { key } = element;
  if (typeof key === 'string' && key.search(/^\./)) {
    // React automatically add key=".X" when there are some children
    props.key = key;
  }

  const defaultProps = filterProps(element.type.defaultProps || {}, noChildren);
  const childrens = React.Children.toArray(element.props.children)
    .filter(onlyMeaningfulChildren)
    .map(child => parseReactElement(child, options));

  if (supportFragment && element.type === Fragment) {
    return createReactFragmentTreeNode(key, childrens);
  }

  return createReactElementTreeNode(
    displayName,
    props,
    defaultProps,
    childrens
  );
};

export default parseReactElement;
