import { describe, it, expect, vitest, beforeEach } from 'vitest';
import formatTreeNode from './formatTreeNode';
import formatReactElementNode from './formatReactElementNode';
import { generateOptionsFixture } from '../__tests__/generateOptionsFixture';

vitest.mock('./formatReactElementNode');

describe('formatTreeNode', () => {
  beforeEach(() => {
    vitest
      .mocked(formatReactElementNode)
      .mockReturnValue('<MockedFormatReactElementNodeResult />');
  });

  it('should format number tree node', () => {
    expect(
      formatTreeNode(
        {
          type: 'number',
          value: 42,
        },
        true,
        0,
        generateOptionsFixture({})
      )
    ).toBe('42');
  });

  it('should format string tree node', () => {
    expect(
      formatTreeNode(
        {
          type: 'string',
          value: 'foo',
        },
        true,
        0,
        generateOptionsFixture({})
      )
    ).toBe('foo');
  });

  it('should format react element tree node', () => {
    expect(
      formatTreeNode(
        {
          type: 'ReactElement',
          displayName: 'Foo',
          childrens: [],
          props: {},
          defaultProps: {},
        },
        true,
        0,
        generateOptionsFixture({})
      )
    ).toBe('<MockedFormatReactElementNodeResult />');
  });

  const jsxDelimiters = ['<', '>', '{', '}'];
  jsxDelimiters.forEach((char) => {
    it(`should escape string that contains the JSX delimiter "${char}"`, () => {
      expect(
        formatTreeNode(
          {
            type: 'string',
            value: `I contain ${char}, is will be escaped`,
          },
          true,
          0,
          generateOptionsFixture({})
        )
      ).toBe(`{\`I contain ${char}, is will be escaped\`}`);
    });
  });

  it('should preserve the format of string', () => {
    expect(
      formatTreeNode(
        {
          type: 'string',
          value: 'foo\nbar',
        },
        true,
        0,
        generateOptionsFixture({})
      )
    ).toBe(`foo
bar`);

    expect(
      formatTreeNode(
        {
          type: 'string',
          value: JSON.stringify(
            {
              foo: 'bar',
            },
            null,
            2
          ),
        },
        false,
        0,
        generateOptionsFixture({
          tabStop: 2,
        })
      )
    ).toBe(`{\`{
  "foo": "bar"
}\`}`);
  });
});
