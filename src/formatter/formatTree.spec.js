/* @flow */

/* eslint-env jest */
/* eslint-disable react/no-multi-comp, react/prop-types */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import formatTree from './formatTree';

describe('formatTree', () => {
  it('should format a react element with a string a children', () => {
    const tree = {
      type: 'ReactElement',
      displayName: 'h1',
      defaultProps: {},
      props: {},
      childrens: [
        {
          value: 'Hello world',
          type: 'string',
        },
      ],
    };

    expect(formatTree(tree)).toEqual(
      `<h1>
  Hello world
</h1>`
    );
  });

  it('should format a single depth react element', () => {
    const tree = {
      type: 'ReactElement',
      displayName: 'aaa',
      props: {
        foo: '41',
      },
      defaultProps: {
        foo: '41',
      },
      childrens: [],
    };

    expect(formatTree(tree)).toEqual('<aaa foo="41" />');
  });

  it('should format a react element with an object as props', () => {
    const tree = {
      type: 'ReactElement',
      displayName: 'div',
      defaultProps: {
        a: { aa: '1', bb: { cc: '3' } },
      },
      props: {
        a: { aa: '1', bb: { cc: '3' } },
      },
      childrens: [],
    };

    expect(formatTree(tree)).toEqual(
      `<div
  a={{
    aa: '1',
    bb: {
      cc: '3'
    }
  }}
 />`
    );
  });

  it('should format a react element with another react element as props', () => {
    const tree = {
      type: 'ReactElement',
      displayName: 'div',
      defaultProps: {
        a: <span b="42" />,
      },
      props: {
        a: <span b="42" />,
      },
      childrens: [],
    };

    expect(formatTree(tree)).toEqual('<div a={<span b="42" />} />');
  });
});
