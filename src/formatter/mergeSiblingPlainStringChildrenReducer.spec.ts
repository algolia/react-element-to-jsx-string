import { expect, test } from 'vitest';
import mergeSiblingPlainStringChildrenReducer from './mergeSiblingPlainStringChildrenReducer';
import {
  createNumberTreeNode,
  createStringTreeNode,
  createReactElementTreeNode,
} from '../tree';
import type { TreeNode } from '../tree';

test('mergeSiblingPlainStringChildrenReducer should merge sibling string tree nodes', () => {
  const childrens: TreeNode[] = [
    createStringTreeNode('a'),
    createStringTreeNode('b'),
    createStringTreeNode('c'),
  ];

  expect(childrens.reduce(mergeSiblingPlainStringChildrenReducer, [])).toEqual([
    {
      type: 'string',
      value: 'abc',
    },
  ]);
});

test('mergeSiblingPlainStringChildrenReducer should consider number as string', () => {
  expect(
    [
      createStringTreeNode('a'),
      createNumberTreeNode(51),
      createStringTreeNode('c'),
    ].reduce(mergeSiblingPlainStringChildrenReducer, [])
  ).toEqual([
    {
      type: 'string',
      value: 'a51c',
    },
  ]);

  expect(
    [
      createStringTreeNode('5'),
      createNumberTreeNode(1),
      createStringTreeNode('a'),
    ].reduce(mergeSiblingPlainStringChildrenReducer, [])
  ).toEqual([
    {
      type: 'string',
      value: '51a',
    },
  ]);
});

test('mergeSiblingPlainStringChildrenReducer should detect non string node', () => {
  const childrens: TreeNode[] = [
    createReactElementTreeNode('MyFoo', {}, {}, [
      { type: 'string', value: 'foo' },
    ]),
    createStringTreeNode('a'),
    createNumberTreeNode(123),
    createReactElementTreeNode('MyBar', {}, {}, [
      { type: 'string', value: 'bar' },
    ]),
    createStringTreeNode('c'),
    createNumberTreeNode(42),
    createReactElementTreeNode('MyBaz', {}, {}, [
      { type: 'string', value: 'baz' },
    ]),
  ];

  expect(childrens.reduce(mergeSiblingPlainStringChildrenReducer, [])).toEqual([
    {
      type: 'ReactElement',
      displayName: 'MyFoo',
      props: {},
      defaultProps: {},
      childrens: [{ type: 'string', value: 'foo' }],
    },
    {
      type: 'string',
      value: 'a123',
    },
    {
      type: 'ReactElement',
      displayName: 'MyBar',
      props: {},
      defaultProps: {},
      childrens: [{ type: 'string', value: 'bar' }],
    },
    {
      type: 'string',
      value: 'c42',
    },
    {
      type: 'ReactElement',
      displayName: 'MyBaz',
      props: {},
      defaultProps: {},
      childrens: [{ type: 'string', value: 'baz' }],
    },
  ]);
});

test('mergeSiblingPlainStringChildrenReducer should reduce empty array to an empty array', () => {
  expect([].reduce(mergeSiblingPlainStringChildrenReducer, [])).toEqual([]);
});
