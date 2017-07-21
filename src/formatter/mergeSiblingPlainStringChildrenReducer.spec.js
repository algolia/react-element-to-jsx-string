/* @flow */

import mergeSiblingPlainStringChildrenReducer from './mergeSiblingPlainStringChildrenReducer';
import type { TreeNode } from './../tree';

const createScalarTreeNode = (type, value) => ({ type, value });
const createReactElementTreeNode = childrens => ({
  type: 'ReactElement',
  childrens,
});

test('mergeSiblingPlainStringChildrenReducer should merge sibling string tree nodes', () => {
  const childrens: TreeNode[] = [
    createScalarTreeNode('string', 'a'),
    createScalarTreeNode('string', 'b'),
    createScalarTreeNode('string', 'c'),
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
      createScalarTreeNode('string', 'a'),
      createScalarTreeNode('number', 51),
      createScalarTreeNode('string', 'c'),
    ].reduce(mergeSiblingPlainStringChildrenReducer, [])
  ).toEqual([
    {
      type: 'string',
      value: 'a51c',
    },
  ]);

  expect(
    [
      createScalarTreeNode('string', 5),
      createScalarTreeNode('number', 1),
      createScalarTreeNode('string', 'a'),
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
    createReactElementTreeNode(['foo']),
    createScalarTreeNode('string', 'a'),
    createScalarTreeNode('number', 'b'),
    createReactElementTreeNode(['bar']),
    createScalarTreeNode('string', 'c'),
    createScalarTreeNode('number', 42),
    createReactElementTreeNode(['baz']),
  ];

  expect(childrens.reduce(mergeSiblingPlainStringChildrenReducer, [])).toEqual([
    {
      type: 'ReactElement',
      childrens: ['foo'],
    },
    {
      type: 'string',
      value: 'ab',
    },
    {
      type: 'ReactElement',
      childrens: ['bar'],
    },
    {
      type: 'string',
      value: 'c42',
    },
    {
      type: 'ReactElement',
      childrens: ['baz'],
    },
  ]);
});

test('mergeSiblingPlainStringChildrenReducer should reduce empty array to an empty array', () => {
  expect([].reduce(mergeSiblingPlainStringChildrenReducer, [])).toEqual([]);
});
