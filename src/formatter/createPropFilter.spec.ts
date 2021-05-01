

import createPropFilter from './createPropFilter';

describe('createPropFilter', () => {
  it('should filter based on an array of keys', () => {
    const props = { a: 1, b: 2, c: 3 };
    const filter = createPropFilter(props, ['b']);

    const filteredPropKeys = Object.keys(props).filter(filter);

    expect(filteredPropKeys).toEqual(['a', 'c']);
  });

  it('should filter based on a callback', () => {
    const props = { a: 1, b: 2, c: 3 };
    const filter = createPropFilter(
      props,
      (val, key) => key !== 'b' && val < 3
    );

    const filteredPropKeys = Object.keys(props).filter(filter);

    expect(filteredPropKeys).toEqual(['a']);
  });
});
