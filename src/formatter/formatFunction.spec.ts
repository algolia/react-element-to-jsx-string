import { describe, it, expect, vitest } from 'vitest';
import formatFunction from './formatFunction';
import { NamedExoticComponent } from 'react';
import { generateOptionsFixture } from '../__tests__/generateOptionsFixture';

vitest.mock(
  './formatReactElementNode',
  () => (node: NamedExoticComponent) => `<${node.displayName} />`
);

function hello() {
  return 1;
}

describe('formatFunction', () => {
  it('should replace a function with noRefCheck without showFunctions option', () => {
    expect(formatFunction(hello, generateOptionsFixture({}))).toEqual(
      'function noRefCheck() {}'
    );
  });

  it('should replace a function with noRefCheck if showFunctions is false', () => {
    expect(
      formatFunction(
        hello,
        generateOptionsFixture({
          showFunctions: false,
        })
      )
    ).toEqual('function noRefCheck() {}');
  });

  it('should format a function if showFunctions is true', () => {
    expect(
      formatFunction(
        hello,
        generateOptionsFixture({
          showFunctions: true,
        })
      )
    ).toEqual('function hello() {return 1;}');
  });

  it('should format a function without name if showFunctions is true', () => {
    expect(
      formatFunction(
        () => 1,
        generateOptionsFixture({
          showFunctions: true,
        })
      )
    ).toEqual('() => 1');
  });

  it('should use the functionValue option', () => {
    expect(
      formatFunction(
        hello,
        generateOptionsFixture({
          functionValue: () => '<Test />',
        })
      )
    ).toEqual('<Test />');
  });

  it('should use the functionValue option even if showFunctions is true', () => {
    expect(
      formatFunction(
        hello,
        generateOptionsFixture({
          showFunctions: true,
          functionValue: () => '<Test />',
        })
      )
    ).toEqual('<Test />');
  });

  it('should use the functionValue option even if showFunctions is false', () => {
    expect(
      formatFunction(
        hello,
        generateOptionsFixture({
          showFunctions: false,
          functionValue: () => '<Test />',
        })
      )
    ).toEqual('<Test />');
  });
});
