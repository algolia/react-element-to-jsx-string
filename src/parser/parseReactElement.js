/* @flow */

import React, { type Element as ReactElement, Fragment } from 'react';
import {
  isContextConsumer,
  isContextProvider,
  isForwardRef,
  isLazy,
  isMemo,
  isPortal,
  isProfiler,
  isStrictMode,
  isSuspense,
} from 'react-is';
import getFunctionTypeName from '../formatter/getFunctionTypeName';
import getWrappedComponentDisplayName from '../formatter/getWrappedComponentDisplayName';
import type { Options } from './../options';
import type { TreeNode } from './../tree';
import {
  createNumberTreeNode,
  createReactElementTreeNode,
  createReactFragmentTreeNode,
  createReactPortalTreeNode,
  createStringTreeNode,
} from './../tree';

const supportFragment = Boolean(Fragment);

// heavily inspired by:
// https://github.com/facebook/react/blob/3746eaf985dd92f8aa5f5658941d07b6b855e9d9/packages/react-devtools-shared/src/backend/renderer.js#L399-L496
const getReactElementDisplayName = (element: ReactElement<*>): string => {
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
    .filter(key => cb(originalProps[key], key))
    .forEach(key => (filteredProps[key] = originalProps[key]));

  return filteredProps;
};

const constructSelector = element => {
  let selector = element.nodeName.toLowerCase();

  if (element.id) {
    selector = `#${element.id}`;
  } else if (element.classList.length) {
    selector += `.${element.classList.join('.')}`;
  }

  return selector;
};

const parseReactElement = (
  element: ReactElement<*> | string | number,
  options: Options
): TreeNode => {
  const { displayName: displayNameFn = getReactElementDisplayName } = options;

  const processChildren = children =>
    React.Children.toArray(children)
      .filter(onlyMeaningfulChildren)
      .map(child => parseReactElement(child, options));

  if (typeof element === 'string') {
    return createStringTreeNode(element);
  } else if (typeof element === 'number') {
    return createNumberTreeNode(element);
  } else if (isPortal(element)) {
    return createReactPortalTreeNode(
      // $FlowFixMe need react-dom flowtypes
      constructSelector(element.containerInfo),
      // $FlowFixMe need react-dom flowtypes
      processChildren(element.children)
    );
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
  const childrens = processChildren(element.props.children);

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
