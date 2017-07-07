/* @flow */

import { Children, Element } from 'react';
import parseReactElement from './parseReactElement';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

const onlyMeaningfulChildren = (children): boolean => {
  return children !== true &&
    children !== false &&
    children !== null &&
    children !== '';
};

export default (element: Element<*>, options: Options): TreeNode[] => {
  const { children } = element.props;

  return Children.toArray(children)
    .filter(onlyMeaningfulChildren)
    .map(child => parseReactElement(child, options));
};
