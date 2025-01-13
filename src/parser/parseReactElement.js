/* @flow */

import React, { type Element as ReactElement, Fragment } from 'react';
import {
  ForwardRef,
  isContextConsumer,
  isContextProvider,
  isForwardRef,
  isLazy,
  isMemo,
  isProfiler,
  isStrictMode,
  isSuspense,
  Memo,
} from 'react-is';
import type { Options } from './../options';
import {
  createStringTreeNode,
  createNumberTreeNode,
  createReactElementTreeNode,
  createReactFragmentTreeNode,
} from './../tree';
import type { TreeNode } from './../tree';
import type { ComponentType } from 'react';

const supportFragment = Boolean(Fragment);

const getFunctionTypeName = (functionType): string => {
  if (!functionType.name || functionType.name === '_default') {
    return 'No Display Name';
  }
  return functionType.name;
};

const getWrappedComponentDisplayName = (
  Component: ComponentElement<any>
): string => {
  console.log(Component);
  if (Component.displayName !== undefined && Component.displayName !== null) {
    return Component.displayName;
  } else if (isMemo(Component) && 'type' in Component) {
    return getWrappedComponentDisplayName(Component.type);
  } else if (Component.$$typeof === ForwardRef) {
    return getWrappedComponentDisplayName(Component.render);
  }

  return getFunctionTypeName(Component);
};

// heavily inspired by:
// https://github.com/facebook/react/blob/3746eaf985dd92f8aa5f5658941d07b6b855e9d9/packages/react-devtools-shared/src/backend/renderer.js#L399-L496
const getReactElementDisplayName = (element: ReactElement<any>): string => {
  switch (true) {
    case typeof element.type === 'string':
      return element.type;
    case typeof element.type === 'function':
      if (element.type.displayName) {
        return element.type.displayName;
      }
      return getFunctionTypeName(element.type);
    case isForwardRef(element):
    case isMemo(element):
      return getWrappedComponentDisplayName(element.type);
    case isContextConsumer(element):
      return `${element.type._context.displayName || 'Context'}.Consumer`;
    case isContextProvider(element):
      return `${element.type._context.displayName || 'Context'}.Provider`;
    case isLazy(element):
      return 'Lazy';
    case isProfiler(element):
      return 'Profiler';
    case isStrictMode(element):
      return 'StrictMode';
    case isSuspense(element):
      return 'Suspense';
    default:
      return 'UnknownElementType';
  }
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
    .filter((key) => cb(originalProps[key], key))
    .forEach((key) => (filteredProps[key] = originalProps[key]));

  return filteredProps;
};

const parseReactElement = (
  element: ReactElement<any> | string | number,
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
    .map((child) => parseReactElement(child, options));

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
