/* @flow */

import sortobject from 'sortobject';
import stringify from 'stringify-object';
import React, { Element, isValidElement } from 'react';
import traverse from 'traverse';
import spacer from './spacer';
import formatTreeNode from './formatTreeNode';
import formatPropValue, { defaultFunctionValue } from './formatPropValue';
import formatComplexDataStructure from './formatComplexDataStructure';
import formatProp from './formatProp';
import propNameSorter from './propNameSorter';
import type { Options } from './../options';
import parseReactElement from './../parser/parseReactElement';
import type { TreeNode } from './../tree';

const recurse = (lvl: number, inline: boolean, options: Options) => {
  return element => formatTreeNode(element, inline, lvl, options);
};

// FIXME: naming
const onlyOriginalProps = (leftProps, rightProps) =>
  propName => {
    const isIncludedInLeft = Object.keys(leftProps).includes(propName);
    return !isIncludedInLeft ||
      (isIncludedInLeft && leftProps[propName] !== rightProps[propName]);
  };

const shouldRenderMultilineAttr = (
  attributes: string[],
  inlineAttributeString: string,
  containsMultilineAttr: boolean,
  inline: boolean,
  lvl: number,
  tabStop: number,
  maxInlineAttributesLineLength: ?number
): boolean => {
  return (isInlineAttributeTooLong(
    attributes,
    inlineAttributeString,
    lvl,
    tabStop,
    maxInlineAttributesLineLength
  ) ||
    containsMultilineAttr) &&
    !inline;
};

const isInlineAttributeTooLong = (
  attributes: string[],
  inlineAttributeString: string,
  lvl: number,
  tabStop: number,
  maxInlineAttributesLineLength: ?number
): boolean => {
  if (!maxInlineAttributesLineLength) {
    return attributes.length > 1;
  }

  return spacer(lvl, tabStop).length + inlineAttributeString.length >
    maxInlineAttributesLineLength;
};

// FIXME: Make this code more robust?
const mergePlainStringChildren = (
  prev: TreeNode[],
  currentNode: any
): TreeNode[] => {
  const lastNode = prev[prev.length - 1];

  if (currentNode.type === 'number') {
    currentNode.type = 'string';
    currentNode.value = String(currentNode.value);
  }

  if (lastNode && lastNode.type === 'string' && currentNode.type === 'string') {
    prev[prev.length - 1].value += currentNode.value;
  } else {
    prev.push(currentNode);
  }

  return prev;
};

export default (
  node: TreeNode,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  const { displayName, childrens, props, defaultProps } = node;

  // FIXME: should be necessary now
  if (!displayName) throw new Error('Oups: displayName attribute is missing.');
  if (!childrens) throw new Error('Oups: childrens attribute is missing.');
  if (!props) throw new Error('Oups: props attribute is missing.');
  if (!defaultProps)
    throw new Error('Oups: defaultProps attribute is missing.');

  const {
    filterProps,
    maxInlineAttributesLineLength,
    showDefaultProps,
    sortProps,
    tabStop,
  } = options;

  let out = `<${displayName}`;

  let outInlineAttr = out;
  let outMultilineAttr = out;
  let containsMultilineAttr = false;

  const visibleAttributeNames = [];

  Object.keys(props)
    .filter(propName => filterProps.indexOf(propName) === -1)
    // .filter(propName => Object.keys(defaultProps).includes(propName) && defaultProps[propName] !== props[propName])
    .filter(onlyOriginalProps(defaultProps, props))
    .forEach(propName => visibleAttributeNames.push(propName));

  Object.keys(defaultProps)
    .filter(defaultPropName => filterProps.indexOf(defaultPropName) === -1)
    .filter(() => showDefaultProps)
    .filter(defaultPropName => !visibleAttributeNames.includes(defaultPropName))
    .forEach(defaultPropName => visibleAttributeNames.push(defaultPropName));

  const attributes = visibleAttributeNames.sort(propNameSorter(sortProps));

  attributes.forEach(attributeName => {
    const {
      attributeFormattedInline,
      attributeFormattedMultiline,
      isMultilineAttribute,
    } = formatProp(
      attributeName,
      Object.keys(props).includes(attributeName),
      props[attributeName],
      Object.keys(defaultProps).includes(attributeName),
      defaultProps[attributeName],
      inline,
      lvl,
      options
    );

    if (isMultilineAttribute) {
      containsMultilineAttr = true;
    }

    outInlineAttr += attributeFormattedInline;
    outMultilineAttr += attributeFormattedMultiline;
  });

  outMultilineAttr += `\n${spacer(lvl, tabStop)}`;

  if (
    shouldRenderMultilineAttr(
      attributes,
      outInlineAttr,
      containsMultilineAttr,
      inline,
      lvl,
      tabStop,
      maxInlineAttributesLineLength
    )
  ) {
    out = outMultilineAttr;
  } else {
    out = outInlineAttr;
  }

  if (childrens && childrens.length > 0) {
    out += '>';
    lvl++;
    if (!inline) {
      out += '\n';
      out += spacer(lvl, tabStop);
    }

    const onlyStringChildren = childrens.reduce(
      (prev, children) => {
        if (!prev) {
          return false;
        }

        if (typeof children !== 'string' || typeof children !== 'number') {
          return true;
        }

        return false;
      },
      true
    );

    out += childrens
      .reduce(mergePlainStringChildren, [])
      .map(recurse(lvl, inline, options))
      .join(`\n${spacer(lvl, tabStop)}`);

    if (!inline) {
      out += '\n';
      out += spacer(lvl - 1, tabStop);
    }
    out += `</${displayName}>`;
  } else {
    if (
      !isInlineAttributeTooLong(
        attributes,
        outInlineAttr,
        lvl,
        tabStop,
        maxInlineAttributesLineLength
      )
    ) {
      out += ' ';
    }

    out += '/>';
  }

  return out;
};
