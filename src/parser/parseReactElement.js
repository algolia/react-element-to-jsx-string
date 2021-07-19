/* @flow */

import React, { type Element as ReactElement, Fragment } from 'react';
import type { Options } from './../options';
import {
  createStringTreeNode,
  createNumberTreeNode,
  createReactElementTreeNode,
  createReactFragmentTreeNode,
} from './../tree';
import type { TreeNode } from './../tree';
import getComponentNameFromType from '../libs/getComponentNameFromType';

const supportFragment = Boolean(Fragment);

const getReactElementDisplayName = (element: ReactElement<*>): string => {
  const displayName = getComponentNameFromType(element.type);
  if (
    displayName === '_default' ||
    displayName === null ||
    displayName === undefined
  ) {
    return 'No Display Name';
  }

  return displayName;
};

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
  element: ReactElement<*> | string | number,
  options: Options
): TreeNode => {
  const { displayName: displayNameFn = getReactElementDisplayName } = options;

  if (typeof element === 'string') {
    return createStringTreeNode(element);
  } else if (typeof element === 'number') {
    return createNumberTreeNode(element);
  } else if (!React.isValidElement(element)) {
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
