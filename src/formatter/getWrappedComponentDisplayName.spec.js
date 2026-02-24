/**
 * @jest-environment jsdom
 */

/* @flow */

import React from 'react';
import getWrappedComponentDisplayName from './getWrappedComponentDisplayName';

class TestComponent extends React.Component {}

function NamedStatelessComponent(props: { children: React.Children }) {
  const { children } = props;
  return <div>{children}</div>;
}

class DisplayNamePrecedence extends React.Component {}

DisplayNamePrecedence.displayName = 'This should take precedence';

const MemoizedNamedStatelessComponent = React.memo(NamedStatelessComponent);

const ForwardRefStatelessComponent = React.forwardRef((props, forwardedRef) => (
  <div {...props} ref={forwardedRef} />
));

const ForwardRefNamedStatelessComponent = React.forwardRef(
  function BaseComponent(props, forwardedRef) {
    return <div {...props} ref={forwardedRef} />;
  }
);

const MemoizedForwardRefNamedStatelessComponent = React.memo(
  ForwardRefNamedStatelessComponent
);

describe('getWrappedComponentDisplayName(Component)', () => {
  it('getWrappedComponentDisplayName(TestComponent)', () => {
    expect(getWrappedComponentDisplayName(TestComponent)).toEqual(
      'TestComponent'
    );
  });

  it('getWrappedComponentDisplayName(NamedStatelessComponent)', () => {
    expect(getWrappedComponentDisplayName(NamedStatelessComponent)).toEqual(
      'NamedStatelessComponent'
    );
  });

  it('getWrappedComponentDisplayName(DisplayNamePrecedence)', () => {
    expect(getWrappedComponentDisplayName(DisplayNamePrecedence)).toEqual(
      'This should take precedence'
    );
  });

  it('getWrappedComponentDisplayName(MemoizedNamedStatelessComponent)', () => {
    expect(
      getWrappedComponentDisplayName(MemoizedNamedStatelessComponent)
    ).toEqual('NamedStatelessComponent');
  });

  it('getWrappedComponentDisplayName(ForwardRefStatelessComponent)', () => {
    expect(
      getWrappedComponentDisplayName(ForwardRefStatelessComponent)
    ).toEqual('Component');
  });

  it('getWrappedComponentDisplayName(ForwardRefNamedStatelessComponent)', () => {
    expect(
      getWrappedComponentDisplayName(ForwardRefNamedStatelessComponent)
    ).toEqual('BaseComponent');
  });

  it('getWrappedComponentDisplayName(MemoizedForwardRefNamedStatelessComponent)', () => {
    expect(
      getWrappedComponentDisplayName(MemoizedForwardRefNamedStatelessComponent)
    ).toEqual('BaseComponent');
  });
});
