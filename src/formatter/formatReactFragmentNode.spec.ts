import { describe, it, expect } from 'vitest';
import formatReactFragmentNode from './formatReactFragmentNode';

const defaultOptions = {
  filterProps: [],
  showDefaultProps: true,
  showFunctions: false,
  tabStop: 2,
  useBooleanShorthandSyntax: true,
  useFragmentShortSyntax: true,
  sortProps: true,
};

describe('formatReactFragmentNode', () => {
  it('should format a react fragment with a string as children', () => {
    const tree = {
      type: 'ReactFragment' as const,
      childrens: [
        {
          type: 'string' as const,
          value: 'Hello world',
        },
      ],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions)).toEqual(`<>
  Hello world
</>`);
  });

  it('should format a react fragment with a key', () => {
    const tree = {
      type: 'ReactFragment' as const,
      key: 'foo',
      childrens: [
        {
          type: 'string' as const,
          value: 'Hello world',
        },
      ],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions))
      .toEqual(`<React.Fragment key="foo">
  Hello world
</React.Fragment>`);
  });

  it('should format a react fragment with multiple childrens', () => {
    const tree = {
      type: 'ReactFragment' as const,
      childrens: [
        {
          type: 'ReactElement' as const,
          displayName: 'div',
          defaultProps: {},
          props: {
            a: 'foo',
          },
          childrens: [],
        },
        {
          type: 'ReactElement' as const,
          displayName: 'div',
          defaultProps: {},
          props: {
            b: 'bar',
          },
          childrens: [],
        },
      ],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions)).toEqual(`<>
  <div a="foo" />
  <div b="bar" />
</>`);
  });

  it('should format an empty react fragment', () => {
    const tree = {
      type: 'ReactFragment' as const,
      childrens: [],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions)).toEqual(
      '<React.Fragment />'
    );
  });

  it('should format an empty react fragment with key', () => {
    const tree = {
      type: 'ReactFragment' as const,
      key: 'foo',
      childrens: [],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions)).toEqual(
      '<React.Fragment key="foo" />'
    );
  });

  it('should format a react fragment using the explicit syntax', () => {
    const tree = {
      type: 'ReactFragment' as const,
      childrens: [
        {
          type: 'string' as const,
          value: 'Hello world',
        },
      ],
    };

    expect(
      formatReactFragmentNode(tree, false, 0, {
        ...defaultOptions,
        ...{
          useFragmentShortSyntax: false,
        },
      })
    ).toEqual(`<React.Fragment>
  Hello world
</React.Fragment>`);
  });
});
