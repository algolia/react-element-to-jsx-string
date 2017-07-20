/* @flow */

import propNameSorter from './propNameSorter';

test('The propNameSorter should always move the `key` and `ref` keys first', () => {
  const fixtures = ['c', 'key', 'a', 'ref', 'b'];

  expect(fixtures.sort(propNameSorter(false))).toEqual([
    'key',
    'ref',
    'c',
    'a',
    'b',
  ]);
});

test('The propNameSorter should always sort the props and keep `key` and `ref` keys first', () => {
  const fixtures = ['c', 'key', 'a', 'ref', 'b'];

  expect(fixtures.sort(propNameSorter(true))).toEqual([
    'key',
    'ref',
    'a',
    'b',
    'c',
  ]);
});
