/**
 * @jest-environment jsdom
 */

/* @flow */

import React from 'react';
import getFunctionTypeName from './getFunctionTypeName';

function NamedStatelessComponent(props: { children: React.Children }) {
  const { children } = props;
  return <div>{children}</div>;
}

const _default = function(props: { children: React.Children }) {
  const { children } = props;
  return <div>{children}</div>;
};

const NamelessComponent = function(props: { children: React.Children }) {
  const { children } = props;
  return <div>{children}</div>;
};

delete NamelessComponent.name;

describe('getFunctionTypeName(Component)', () => {
  it('getFunctionTypeName(NamedStatelessComponent)', () => {
    expect(getFunctionTypeName(NamedStatelessComponent)).toEqual(
      'NamedStatelessComponent'
    );
  });

  it('getFunctionTypeName(_default)', () => {
    expect(getFunctionTypeName(_default)).toEqual('Component');
  });

  it('getFunctionTypeName(NamelessComponent)', () => {
    expect(getFunctionTypeName(NamelessComponent)).toEqual('Component');
  });
});
