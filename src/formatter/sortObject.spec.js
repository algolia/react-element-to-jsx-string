/* @flow */

import React from 'react';
import sortObject from './sortObject';

describe('sortObject', () => {
  it('should sort keys in objects', () => {
    const fixture = {
      c: 2,
      b: { x: 1, c: 'ccc' },
      a: [{ foo: 1, bar: 2 }],
    };

    expect(JSON.stringify(sortObject(fixture))).toEqual(
      JSON.stringify({
        a: [{ bar: 2, foo: 1 }],
        b: { c: 'ccc', x: 1 },
        c: 2,
      })
    );
  });

  it('should process an array', () => {
    const fixture = [{ foo: 1, bar: 2 }, null, { b: 1, c: 2, a: 3 }];

    expect(JSON.stringify(sortObject(fixture))).toEqual(
      JSON.stringify([{ bar: 2, foo: 1 }, null, { a: 3, b: 1, c: 2 }])
    );
  });

  it('should not break special values', () => {
    const date = new Date();
    const regexp = /test/g;
    const fixture = {
      a: [date, regexp],
      b: regexp,
      c: date,
    };

    expect(sortObject(fixture)).toEqual({
      a: [date, regexp],
      b: regexp,
      c: date,
    });
  });

  describe('_owner key', () => {
    it('should preserve the _owner key for objects that are not react elements', () => {
      const fixture = {
        _owner: "_owner that doesn't belong to react element",
        foo: 'bar',
      };

      expect(JSON.stringify(sortObject(fixture))).toEqual(
        JSON.stringify({
          _owner: "_owner that doesn't belong to react element",
          foo: 'bar',
        })
      );
    });

    it('should remove the _owner key from top level react element', () => {
      const fixture = {
        reactElement: (
          <div>
            <span></span>
          </div>
        ),
      };

      expect(JSON.stringify(sortObject(fixture))).toEqual(
        JSON.stringify({
          reactElement: {
            type: 'div',
            key: null,
            props: {
              children: {
                type: 'span',
                key: null,
                props: {},
                _owner: null,
                _store: {},
              },
            },
            _store: {},
          },
        })
      );
    });
  });
});
