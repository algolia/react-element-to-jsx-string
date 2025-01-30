/* eslint-disable react/jsx-curly-brace-presence */

import React, { Fragment, ReactNode } from 'react';
import { describe, it, expect } from 'vitest';
import parseReactElement from './parseReactElement';
import { generateOptionsFixture } from '../__tests__/generateOptionsFixture';

const options = generateOptionsFixture({});

describe('parseReactElement', () => {
  it('should parse a react element with a string as children', () => {
    expect(parseReactElement(<h1>Hello world</h1>, options)).toEqual({
      type: 'ReactElement',
      displayName: 'h1',
      defaultProps: {},
      props: {},
      childrens: [
        {
          type: 'string',
          value: 'Hello world',
        },
      ],
    });
  });

  it('should filter empty childrens', () => {
    expect(
      parseReactElement(
        <h1>
          Hello
          {null}
          {true}
          {false}
          {''}
          world
        </h1>,
        options
      )
    ).toEqual({
      type: 'ReactElement',
      displayName: 'h1',
      defaultProps: {},
      props: {},
      childrens: [
        {
          type: 'string',
          value: 'Hello',
        },
        {
          type: 'string',
          value: 'world',
        },
      ],
    });
  });

  it('should parse a single depth react element', () => {
    // @ts-expect-error `aaa` is not a valid dom element
    expect(parseReactElement(<aaa foo="41" />, options)).toEqual({
      type: 'ReactElement',
      displayName: 'aaa',
      props: {
        foo: '41',
      },
      defaultProps: {},
      childrens: [],
    });
  });

  it('should parse a react element with an object as props', () => {
    const Foo = (props: { a: unknown }) => <></>;

    expect(
      parseReactElement(
        <Foo
          a={{
            aa: '1',
            bb: {
              cc: '3',
            },
          }}
        />,
        options
      )
    ).toEqual({
      type: 'ReactElement',
      displayName: 'Foo',
      defaultProps: {},
      props: {
        a: {
          aa: '1',
          bb: {
            cc: '3',
          },
        },
      },
      childrens: [],
    });
  });

  it('should parse a react element with another react element as props', () => {
    const Foo = (props: { a: unknown }) => <></>;
    const Bar = (props: { b: unknown }) => <></>;

    expect(parseReactElement(<Foo a={<Bar b="42" />} />, options)).toEqual({
      type: 'ReactElement',
      displayName: 'Foo',
      defaultProps: {},
      props: {
        a: <Bar b="42" />,
      },
      childrens: [],
    });
  });

  it('should parse the react element defaultProps', () => {
    const Foo = (props: { foo?: string }) => {
      return <>Hello</>;
    };
    Foo.defaultProps = {
      bar: 'Hello Bar!',
      baz: 'Hello Baz!',
    };

    expect(
      parseReactElement(<Foo foo="Hello Foo!" bar="Hello world!" />, options)
    ).toEqual({
      type: 'ReactElement',
      displayName: 'Foo',
      defaultProps: {
        bar: 'Hello Bar!',
        baz: 'Hello Baz!',
      },
      props: {
        bar: 'Hello world!',
        baz: 'Hello Baz!',
        foo: 'Hello Foo!',
      },
      childrens: [],
    });
  });

  it('should extract the component key', () => {
    expect(parseReactElement(<div key="foo-1" />, options)).toEqual({
      type: 'ReactElement',
      displayName: 'div',
      defaultProps: {},
      props: {
        key: 'foo-1',
      },
      childrens: [],
    });
  });

  it('should extract the component ref', () => {
    const refFn = () => {};

    expect(parseReactElement(<div ref={refFn} />, options)).toEqual({
      type: 'ReactElement',
      displayName: 'div',
      defaultProps: {},
      props: {
        ref: refFn,
      },
      childrens: [],
    });

    const refObject = { current: null };

    expect(parseReactElement(<div ref={refObject} />, options)).toEqual({
      type: 'ReactElement',
      displayName: 'div',
      defaultProps: {},
      props: {
        ref: refObject,
      },
      childrens: [],
    });

    expect(parseReactElement(<div ref={null} />, options)).toEqual({
      type: 'ReactElement',
      displayName: 'div',
      defaultProps: {},
      props: {
        ref: null,
      },
      childrens: [],
    });

    // @ts-expect-error Illegal ref type
    // eslint-disable-next-line react/no-string-refs
    expect(parseReactElement(<div ref="foo" />, options)).toEqual({
      type: 'ReactElement',
      displayName: 'div',
      defaultProps: {},
      props: {
        ref: 'foo',
      },
      childrens: [],
    });
  });

  it('should parse a react fragment', () => {
    expect(
      parseReactElement(
        <Fragment key="foo">
          <div />
          <div />
        </Fragment>,
        options
      )
    ).toEqual({
      type: 'ReactFragment',
      key: 'foo',
      childrens: [
        {
          type: 'ReactElement',
          displayName: 'div',
          defaultProps: {},
          props: {},
          childrens: [],
        },
        {
          type: 'ReactElement',
          displayName: 'div',
          defaultProps: {},
          props: {},
          childrens: [],
        },
      ],
    });
  });
});
