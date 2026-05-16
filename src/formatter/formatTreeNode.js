/* @flow */

import formatReactElementNode from './formatReactElementNode';
import formatReactFragmentNode from './formatReactFragmentNode';
import type { Options } from './../options';
import type { TreeNode } from './../tree';

const jsxStopChars = ['<', '>', '{', '}'];
const shouldBeEscaped = (s: string) =>
  jsxStopChars.some(jsxStopChar => s.includes(jsxStopChar));

const escape = (s: string) => {
  if (!shouldBeEscaped(s)) {
    return s;
  }

  const escapedString = s.replace('${', '\\${').replace('`', '\\`');

  return `{\`${escapedString}\`}`;
};

const preserveTrailingSpace = (s: string) => {
  const escapeNewlinesInSingleQuotedString = (str: string) =>
    // When we wrap whitespace into a JSX expression like `{'...'}`
    // the content must be valid JS inside single quotes.
    str.replace(/\r/g, '\\r').replace(/\n/g, '\\n');

  let result = s;
  if (result.endsWith(' ')) {
    result = result.replace(/^(.*?)(\s+)$/, (m, p1, p2) => {
      const escapedP2 = escapeNewlinesInSingleQuotedString(p2);
      return `${p1}{'${escapedP2}'}`;
    });
  }

  if (result.startsWith(' ')) {
    result = result.replace(/^(\s+)(.*)$/, (m, p1, p2) => {
      const escapedP1 = escapeNewlinesInSingleQuotedString(p1);
      return `{'${escapedP1}'}${p2}`;
    });
  }

  return result;
};

export default (
  node: TreeNode,
  inline: boolean,
  lvl: number,
  options: Options
): string => {
  if (node.type === 'number') {
    return String(node.value);
  }

  if (node.type === 'string') {
    return node.value
      ? `${preserveTrailingSpace(escape(String(node.value)))}`
      : '';
  }

  if (node.type === 'ReactElement') {
    return formatReactElementNode(node, inline, lvl, options);
  }

  if (node.type === 'ReactFragment') {
    return formatReactFragmentNode(node, inline, lvl, options);
  }

  throw new TypeError(`Unknow format type "${node.type}"`);
};
