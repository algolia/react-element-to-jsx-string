/* @flow */

import { Element } from 'react';
import formatTree from './formatter/formatTree';
import parseReactElement from './parser/parseReactElement';
import type { Options } from './options';

const reactElementToJsxString = (element: Element<any>, options: Options) => {
  if (!element) {
    throw new Error('react-element-to-jsx-string: Expected a ReactElement');
  }

  return formatTree(parseReactElement(element, options), options);
};

export default reactElementToJsxString;
