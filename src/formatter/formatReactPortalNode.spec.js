/* @flow */

import formatReactPortalNode from './formatReactPortalNode';

const defaultOptions = {
  filterProps: [],
  showDefaultProps: true,
  showFunctions: false,
  tabStop: 2,
  useBooleanShorthandSyntax: true,
  useFragmentShortSyntax: true,
  sortProps: true,
};

describe('formatReactPortalNode', () => {
  it('should format a react portal with a string as children', () => {
    const tree = {
      type: 'ReactPortal',
      childrens: [
        {
          value: 'Hello world',
          type: 'string',
        },
      ],
    };

    expect(formatReactPortalNode(tree, false, 0, defaultOptions))
      .toMatchInlineSnapshot(`
      "{ReactDOM.createPortal(<>
        Hello world
      </>, document.body)}"
    `);
  });

  it('should format a react portal with multiple childrens', () => {
    const tree = {
      type: 'ReactPortal',
      childrens: [
        {
          type: 'ReactElement',
          displayName: 'div',
          props: { a: 'foo' },
          childrens: [],
        },
        {
          type: 'ReactElement',
          displayName: 'div',
          props: { b: 'bar' },
          childrens: [],
        },
      ],
    };

    expect(formatReactPortalNode(tree, false, 0, defaultOptions))
      .toMatchInlineSnapshot(`
      "{ReactDOM.createPortal(<>
        <div a=\\"foo\\" />
        <div b=\\"bar\\" />
      </>, document.body)}"
    `);
  });

  it('should format an empty react portal', () => {
    const tree = {
      type: 'ReactPortal',
      childrens: [],
    };

    expect(
      formatReactPortalNode(tree, false, 0, defaultOptions)
    ).toMatchInlineSnapshot(`"{ReactDOM.createPortal(< />, document.body)}"`);
  });

  it('should format a react fragment using the explicit syntax', () => {
    const tree = {
      type: 'ReactPortal',
      childrens: [
        {
          value: 'Hello world',
          type: 'string',
        },
      ],
    };

    expect(
      formatReactPortalNode(tree, false, 0, {
        ...defaultOptions,
        ...{ useFragmentShortSyntax: false },
      })
    ).toMatchInlineSnapshot(`
      "{ReactDOM.createPortal(<>
        Hello world
      </>, document.body)}"
    `);
  });
});
