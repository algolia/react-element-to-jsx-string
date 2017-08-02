/* @flow */

import formatTreeNode from './formatTreeNode';

describe('formatTreeNode', () => {
  it('should escape JSX entity on string node', () => {
    expect(
      formatTreeNode(
        { type: 'string', value: 'Mister mustache :{' },
        true,
        0,
        {}
      )
    ).toBe('Mister mustache :&lbrace;');
  });

  it('should detect JSON string and not escaping then', () => {
    expect(
      formatTreeNode({ type: 'string', value: '{ "foo": "bar" }' }, true, 0, {})
    ).toBe('{`{"foo":"bar"}`}');

    expect(
      formatTreeNode({ type: 'string', value: '{ "foo": "bar" }' }, false, 0, {
        tabStop: 2,
      })
    ).toBe(`{\`{
  "foo": "bar"
}\`}`);
  });
});
