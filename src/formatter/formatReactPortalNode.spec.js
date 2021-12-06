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
      containerSelector: 'body',
      childrens: [
        {
          value: 'Hello world',
          type: 'string',
        },
      ],
    };

    expect(formatReactPortalNode(tree, false, 0, defaultOptions))
      .toMatchInlineSnapshot(`
      "{ReactDOM.createPortal(
        <>
          Hello world
        </>
      , document.querySelector(\`body\`))}"
    `);
  });

  it('should format a react portal with multiple childrens', () => {
    const tree = {
      type: 'ReactPortal',
      containerSelector: 'body',
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
      "{ReactDOM.createPortal(
        <>
          <div a=\\"foo\\" />
          <div b=\\"bar\\" />
        </>
      , document.querySelector(\`body\`))}"
    `);
  });

  it('should format an empty react portal', () => {
    const tree = {
      type: 'ReactPortal',
      containerSelector: 'body',
      childrens: [],
    };

    expect(
      formatReactPortalNode(tree, false, 0, defaultOptions)
    ).toMatchInlineSnapshot(
      `"{ReactDOM.createPortal(null, document.querySelector(\`body\`))}"`
    );
  });
});
