/**
 * @jest-environment happy-dom
 */

/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/destructuring-assignment */

import {
  Fragment,
  Component,
  type ReactNode,
  forwardRef,
  lazy,
  Profiler,
  createElement,
  createContext,
  Suspense,
  memo,
  StrictMode,
  createRef,
  ComponentType,
} from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import reactElementToJSXString, { preserveFunctionLineBreak } from './index';

class TestComponent extends Component {}

function NamedStatelessComponent(props: { children?: ReactNode }) {
  return <div>{props.children}</div>;
}

class DefaultPropsComponent extends Component {
  static defaultProps = {
    test: 'test',
    boolean: true,
    number: 0,
    undefinedProp: undefined,
  };
}

class DisplayNamePrecedence extends Component {
  static displayName = 'This should take precedence';
}

function generateAnonymousStatelessComponent(): ComponentType<{
  children?: ReactNode;
}> {
  return function (props: { children?: ReactNode }) {
    return <div>{props.children}</div>;
  };
}

test('reactElementToJSXString(<TestComponent/>)', () => {
  expect(reactElementToJSXString(<TestComponent />)).toEqual(
    '<TestComponent />'
  );
});

test('reactElementToJSXString(<NamedStatelessComponent/>)', () => {
  expect(reactElementToJSXString(<NamedStatelessComponent />)).toEqual(
    '<NamedStatelessComponent />'
  );
});

test('reactElementToJSXString(<AnonymousStatelessComponent/>)', () => {
  const AnonymousStatelessComponent = generateAnonymousStatelessComponent();

  expect(reactElementToJSXString(<AnonymousStatelessComponent />)).toEqual(
    '<No Display Name />'
  );
});

test('reactElementToJSXString(<AnonymousStatelessComponent/>) with a displayName', () => {
  const AnonymousStatelessComponent = generateAnonymousStatelessComponent();
  AnonymousStatelessComponent.displayName = 'I have a name!';

  expect(reactElementToJSXString(<AnonymousStatelessComponent />)).toEqual(
    '<I have a name! />'
  );
});

test("reactElementToJSXString(createElement('div'))", () => {
  expect(reactElementToJSXString(createElement('div'))).toEqual('<div />');
});

test("reactElementToJSXString(createElement('div', {title: 'hello \"you\"'}))", () => {
  expect(
    reactElementToJSXString(
      createElement('div', {
        title: 'hello "you"',
      })
    )
  ).toEqual('<div title="hello &quot;you&quot;" />');
});

test("reactElementToJSXString(createElement('div', {title: '<'hello' you & you>'}))", () => {
  expect(
    reactElementToJSXString(
      createElement('div', {
        title: "<'hello' you & you>",
      })
    )
  ).toEqual('<div title="<\'hello\' you & you>" />');
});

test("reactElementToJSXString(<div obj={{ nested: <div arr={['hello', 'you']} /> }} />)", () => {
  /* eslint-disable react/no-unescaped-entities */

  expect(
    reactElementToJSXString(
      <div
        obj={{
          nested: <div arr={['hello', 'you']}>Hello "' you</div>,
        }}
      />
    )
  ).toEqual(`<div
  obj={{
    nested: <div arr={['hello', 'you']}>Hello "' you</div>
  }}
 />`);
});

test("reactElementToJSXString(<div nested={{ hello: 'world', foo: 'esca\\'\"ped', bar: 42 }} root=\"root\"/>)", () => {
  expect(
    reactElementToJSXString(
      <div
        nested={{
          hello: 'world',
          foo: 'esca\'"ped',
          bar: 42,
          baz: ['abc', 'def'],
        }}
        root="root"
      />
    )
  ).toEqual(`<div
  nested={{
    bar: 42,
    baz: [
      'abc',
      'def'
    ],
    foo: 'esca\\'"ped',
    hello: 'world'
  }}
  root="root"
/>`);
});

test("reactElementToJSXString(createElement('div', {title: Symbol('hello \"you\"')})", () => {
  expect(
    reactElementToJSXString(
      createElement('div', {
        title: Symbol('hello "you"'),
      })
    )
  ).toEqual('<div title={Symbol(\'hello "you"\')} />');
});

test('reactElementToJSXString(<div/>)', () => {
  expect(reactElementToJSXString(<div />)).toEqual('<div />');
});

test('reactElementToJSXString(<div fn={() => {}}/>)', () => {
  expect(reactElementToJSXString(<div fn={() => {}} />)).toEqual(
    '<div fn={function noRefCheck() {}} />'
  );
});

test('reactElementToJSXString(<div fn={function hello(){}}/>)', () => {
  // eslint-disable-next-line react/jsx-no-bind

  expect(reactElementToJSXString(<div fn={function hello() {}} />)).toEqual(
    '<div fn={function noRefCheck() {}} />'
  );
});

test('reactElementToJSXString(<div co={<div a="1" />} />)', () => {
  expect(reactElementToJSXString(<div co={<div a="1" />} />)).toEqual(
    '<div co={<div a="1" />} />'
  );
});

test('reactElementToJSXString(<div re={/^Hello world$/} />)', () => {
  expect(reactElementToJSXString(<div re={/^Hello world$/} />)).toEqual(
    '<div re={/^Hello world$/} />'
  );
});

test('reactElementToJSXString(<div int={8}/>)', () => {
  expect(reactElementToJSXString(<div int={8} />)).toEqual('<div int={8} />');
});

test("reactElementToJSXString(<div obj={{hello: 'world'}}/>)", () => {
  expect(
    reactElementToJSXString(
      <div
        obj={{
          hello: 'world',
        }}
      />
    )
  ).toEqual(`<div
  obj={{
    hello: 'world'
  }}
 />`);
});

test('reactElementToJSXString(<div a="1" obj={{hello: \'world\'}}/>)', () => {
  expect(
    reactElementToJSXString(
      <div
        a="1"
        obj={{
          hello: 'world',
        }}
      />
    )
  ).toEqual(`<div
  a="1"
  obj={{
    hello: 'world'
  }}
/>`);
});

test('reactElementToJSXString(<div obj={{hello: \'world\'}} a="1"/>)', () => {
  expect(
    reactElementToJSXString(
      <div
        obj={{
          hello: 'world',
        }}
        a="1"
      />
    )
  ).toEqual(`<div
  a="1"
  obj={{
    hello: 'world'
  }}
/>`);
});

test('reactElementToJSXString(<script type="application/json+ld">{`{ hello: \'world\' }`}</script>)', () => {
  expect(
    reactElementToJSXString(
      <script type="application/json+ld">{`{ hello: 'world' }`}</script>
    )
  ).toEqual(`<script type="application/json+ld">
  {\`{ hello: 'world' }\`}
</script>`);
});

test('reactElementToJSXString(<script type="application/json+ld">&#123; hello: \'world\' &#125;</script>)', () => {
  expect(
    reactElementToJSXString(
      <script type="application/json+ld">&#123; hello: 'world' &#125;</script>
    )
  ).toEqual(`<script type="application/json+ld">
  {\`{ hello: 'world' }\`}
</script>`);
});

test('reactElementToJSXString(<div obj={{hello: [1, 2], world: {nested: true}}}/>)', () => {
  expect(
    reactElementToJSXString(
      <div
        obj={{
          hello: [1, 2],
          world: {
            nested: true,
          },
        }}
      />
    )
  ).toEqual(`<div
  obj={{
    hello: [
      1,
      2
    ],
    world: {
      nested: true
    }
  }}
 />`);
});

test('reactElementToJSXString(<div></div>)', () => {
  expect(reactElementToJSXString(<div />)).toEqual('<div />');
});

test('reactElementToJSXString(<div z="3" a="1" b="2"/>)', () => {
  /* eslint react/jsx-sort-props: 0 */

  expect(reactElementToJSXString(<div z="3" a="1" b="2" />)).toEqual(`<div
  a="1"
  b="2"
  z="3"
/>`);
});

test('reactElementToJSXString(<div z="3" a="1" b="2"/>, {sortProps: false})', () => {
  /* eslint react/jsx-sort-props: 0 */
  expect(
    reactElementToJSXString(<div z="3" a="1" b="2" />, {
      sortProps: false,
    })
  ).toEqual(`<div
  z="3"
  a="1"
  b="2"
/>`);
});

test('reactElementToJSXString(<div a="1">Hello</div>)', () => {
  expect(reactElementToJSXString(<div a="1">Hello</div>)).toEqual(`<div a="1">
  Hello
</div>`);
});

test('reactElementToJSXString(<div a="1" b="5">Hello</div>)', () => {
  expect(
    reactElementToJSXString(
      <div a="1" b="5">
        Hello
      </div>
    )
  ).toEqual(`<div
  a="1"
  b="5"
>
  Hello
</div>`);
});

test('reactElementToJSXString(<div>Hello</div>)', () => {
  expect(reactElementToJSXString(<div>Hello</div>)).toEqual(`<div>
  Hello
</div>`);
});

test('reactElementToJSXString(<div>Hello "Jonh" and \'Mike\'</div>)', () => {
  expect(reactElementToJSXString(<div>Hello "Jonh" and 'Mike'</div>))
    .toEqual(`<div>
  Hello "Jonh" and 'Mike'
</div>`);
});

test('reactElementToJSXString(<div>{`foo\nbar`}</div>)', () => {
  expect(reactElementToJSXString(<div>{`foo\nbar`}</div>)).toEqual(`<div>
  foo
  bar
</div>`);

  expect(
    reactElementToJSXString(
      <div>
        <div>{`foo\nbar`}</div>
      </div>
    )
  ).toEqual(`<div>
  <div>
    foo
    bar
  </div>
</div>`);
});

test('reactElementToJSXString(<div>Hello</div>, {tabStop: 4})', () => {
  expect(
    reactElementToJSXString(<div>Hello</div>, {
      tabStop: 4,
    })
  ).toEqual(`<div>
    Hello
</div>`);
});

test('reactElementToJSXString(<div><div>Hello</div></div>)', () => {
  expect(
    reactElementToJSXString(
      <div>
        <div>Hello</div>
      </div>
    )
  ).toEqual(`<div>
  <div>
    Hello
  </div>
</div>`);
});

test('reactElementToJSXString(<div><div>Hello</div></div>, {tabStop: 4})', () => {
  expect(
    reactElementToJSXString(
      <div>
        <div>Hello</div>
      </div>,
      {
        tabStop: 4,
      }
    )
  ).toEqual(`<div>
    <div>
        Hello
    </div>
</div>`);
});

test('reactElementToJSXString(<div a="1" b="2"><div>Hello</div></div>)', () => {
  expect(
    reactElementToJSXString(
      <div a="1" b="2">
        <div>Hello</div>
      </div>
    )
  ).toEqual(`<div
  a="1"
  b="2"
>
  <div>
    Hello
  </div>
</div>`);
});

test('reactElementToJSXString(<div a="1" b="2"><div>Hello</div></div>, {tabStop: 4})', () => {
  expect(
    reactElementToJSXString(
      <div a="1" b="2">
        <div>Hello</div>
      </div>,
      {
        tabStop: 4,
      }
    )
  ).toEqual(`<div
    a="1"
    b="2"
>
    <div>
        Hello
    </div>
</div>`);
});

test('reactElementToJSXString(<div a={{a: "1", b: {c: "3"}}}><div b={{c: {d: "4"}}}>Hello</div></div>)', () => {
  expect(
    reactElementToJSXString(
      <div
        a={{
          a: '1',
          b: {
            c: '3',
          },
        }}
      >
        <div
          b={{
            c: {
              d: '4',
            },
          }}
        >
          Hello
        </div>
      </div>
    )
  ).toEqual(`<div
  a={{
    a: '1',
    b: {
      c: '3'
    }
  }}
>
  <div
    b={{
      c: {
        d: '4'
      }
    }}
  >
    Hello
  </div>
</div>`);
});

test('reactElementToJSXString()', () => {
  expect(() => {
    // @ts-expect-error Wrong call: first argument is missing
    reactElementToJSXString();
  }).toThrow('react-element-to-jsx-string: Expected a ReactElement');
});

test('reactElementToJSXString(null)', () => {
  expect(() => {
    // @ts-expect-error Wrong call: first argument could not be null
    reactElementToJSXString(null);
  }).toThrow('react-element-to-jsx-string: Expected a ReactElement');
});

test('ignores object keys order (sortobject)', () => {
  expect(
    reactElementToJSXString(
      <div
        o={{
          a: 1,
          b: 2,
        }}
      />
    )
  ).toEqual(
    reactElementToJSXString(
      <div
        o={{
          b: 2,
          a: 1,
        }}
      />
    )
  );
});

test('reactElementToJSXString(<div a={null} />', () => {
  expect(reactElementToJSXString(<div a={null} />)).toEqual(
    reactElementToJSXString(<div a={null} />)
  );
});

test('reactElementToJSXString(<div a={undefined} />', () => {
  expect(reactElementToJSXString(<div a={undefined} />)).toEqual(
    reactElementToJSXString(<div a={undefined} />)
  );
});

test('reactElementToJSXString(<div a={{b: function hello() {}}} />', () => {
  expect(
    reactElementToJSXString(
      <div
        a={{
          b: function hello() {},
        }}
      />
    )
  ).toEqual(`<div
  a={{
    b: function noRefCheck() {}
  }}
 />`);
});

test('reactElementToJSXString(<div a={{b: {c: {d: <div />, e: null}}}} />', () => {
  expect(
    reactElementToJSXString(
      <div
        a={{
          b: {
            c: {
              d: <div />,
              e: null,
            },
          },
        }}
      />
    )
  ).toEqual(`<div
  a={{
    b: {
      c: {
        d: <div />,
        e: null
      }
    }
  }}
 />`);
});

test('reactElementToJSXString(<div a={{b: {}}} />', () => {
  expect(
    reactElementToJSXString(
      <div
        a={{
          b: {},
        }}
      />
    )
  ).toEqual(`<div
  a={{
    b: {}
  }}
 />`);
});

test('reactElementToJSXString(<div a={{}} />', () => {
  expect(reactElementToJSXString(<div a={{}} />)).toEqual('<div a={{}} />');
});

test('reactElementToJSXString(<div><span /><span /></div>)', () => {
  expect(
    reactElementToJSXString(
      <div>
        <span />
        <span />
      </div>
    )
  ).toEqual(`<div>
  <span />
  <span />
</div>`);
});

test('reactElementToJSXString(<div>foo<div /></div>)', () => {
  expect(
    reactElementToJSXString(
      <div>
        foo
        <div />
      </div>
    )
  ).toEqual(`<div>
  foo
  <div />
</div>`);
});

test('reactElementToJSXString(<div>\nfoo bar <span> baz </span> qux quux\n</div>)', () => {
  expect(
    reactElementToJSXString(
      <div>
        foo bar <span> baz </span> qux quux
      </div>
    )
  ).toEqual(`<div>
  foo bar{' '}
  <span>
    {' '}baz{' '}
  </span>
  {' '}qux quux
</div>`);
});

test('reactElementToJSXString(<div a={[1, 2, 3, 4]} />', () => {
  expect(reactElementToJSXString(<div a={[1, 2, 3, 4]} />)).toEqual(`<div
  a={[
    1,
    2,
    3,
    4
  ]}
 />`);
});

test("reactElementToJSXString(<div a={[{Hello: ', world!'}]} />)", () => {
  expect(
    reactElementToJSXString(
      <div
        a={[
          {
            Hello: ', world!',
          },
        ]}
      />
    )
  ).toEqual(`<div
  a={[
    {
      Hello: ', world!'
    }
  ]}
 />`);
});

test('reactElementToJSXString(<div a={[{}]} />', () => {
  expect(reactElementToJSXString(<div a={[{}]} />)).toEqual(`<div
  a={[
    {}
  ]}
 />`);
});

test('reactElementToJSXString(<div a={[]} />', () => {
  expect(reactElementToJSXString(<div a={[]} />)).toEqual('<div a={[]} />');
});

test('reactElementToJSXString(<div a={[<div key="0"><span /></div>]} />', () => {
  expect(
    reactElementToJSXString(
      <div
        a={[
          <div key="0">
            <span />
          </div>,
        ]}
      />
    )
  ).toEqual(`<div
  a={[
    <div key="0"><span /></div>
  ]}
 />`);
});
test('reactElementToJSXString(<div type={Symbol("test")}/>)', () => {
  expect(reactElementToJSXString(<div type={Symbol('test')} />)).toEqual(
    "<div type={Symbol('test')} />"
  );
});

test('reactElementToJSXString(<div aprop="test" ref="yes" />', () => {
  expect(reactElementToJSXString(<div aprop="test" ref="yes" />)).toEqual(`<div
  ref="yes"
  aprop="test"
/>`);
});

test('reactElementToJSXString(<div aprop="a" ref="yes"><span ref="wee" zprop="z"/></div>', () => {
  expect(
    reactElementToJSXString(
      <div aprop="a" ref="yes">
        <span ref="wee" zprop="z" />
      </div>
    )
  ).toEqual(`<div
  ref="yes"
  aprop="a"
>
  <span
    ref="wee"
    zprop="z"
  />
</div>`);
});

test('reactElementToJSXString(<div aprop="test" key="yes" />', () => {
  expect(reactElementToJSXString(<div aprop="test" key="yes" />)).toEqual(`<div
  key="yes"
  aprop="test"
/>`);
});

test('reactElementToJSXString(<div>\\n  {null}\\n</div>', () => {
  const element = <div>{null}</div>;

  expect(reactElementToJSXString(element)).toEqual('<div />');
});

test('reactElementToJSXString(<div>{true}</div>)', () => {
  expect(reactElementToJSXString(<div>{true}</div>)).toEqual('<div />');
});

test('reactElementToJSXString(<div>{false}</div>)', () => {
  expect(reactElementToJSXString(<div>{false}</div>)).toEqual('<div />');
});

test('reactElementToJSXString(<div>\n{false}\n</div>)', () => {
  expect(reactElementToJSXString(<div>{false}</div>)).toEqual('<div />');
});

test('reactElementToJSXString(<div> {false} </div>)', () => {
  expect(reactElementToJSXString(<div> {false} </div>)).toEqual(`<div>
  {'  '}
</div>`);
});

test('reactElementToJSXString(<div>{null}</div>)', () => {
  expect(reactElementToJSXString(<div>{null}</div>)).toEqual('<div />');
});

test('reactElementToJSXString(<div>{123}</div>)', () => {
  expect(reactElementToJSXString(<div>{123}</div>)).toEqual(`<div>
  123
</div>`);
});

test("reactElementToJSXString(<div>{''}</div>)", () => {
  expect(reactElementToJSXString(<div>{''}</div>)).toEqual(
    reactElementToJSXString(<div />)
  );
});

test('reactElementToJSXString(<div>String with {1} js expression</div>)', () => {
  expect(reactElementToJSXString(<div>String with {1} js number</div>))
    .toEqual(`<div>
  String with 1 js number
</div>`);
});

test('reactElementToJSXString(<TestComponent />, { displayName: toUpper })', () => {
  expect(
    reactElementToJSXString(<TestComponent />, {
      displayName: (element) => element.type.name.toUpperCase(),
    })
  ).toEqual('<TESTCOMPONENT />');
});

test("reactElementToJSXString(<TestComponent />, { filterProps: ['key', 'className'] })", () => {
  expect(
    reactElementToJSXString(
      <TestComponent a="b" key="aKey" className="aClass" />,
      {
        filterProps: ['key', 'className'],
      }
    )
  ).toEqual('<TestComponent a="b" />');
});

test("reactElementToJSXString(<TestComponent />, { filterProps: () => !key.startsWith('some')) })", () => {
  expect(
    reactElementToJSXString(
      <TestComponent a="b" someProp="foo" someOtherProp={false} />,
      {
        filterProps: (val, key) => !key.startsWith('some'),
      }
    )
  ).toEqual('<TestComponent a="b" />');
});

test('reactElementToJSXString(<TestComponent />, { useBooleanShorthandSyntax: false })', () => {
  expect(
    reactElementToJSXString(
      // eslint-disable-next-line react/jsx-boolean-value
      <TestComponent testTrue={true} testFalse={false} />,
      {
        useBooleanShorthandSyntax: false,
      }
    )
  ).toEqual(`<TestComponent
  testFalse={false}
  testTrue={true}
/>`);
});

test('should render default props', () => {
  expect(reactElementToJSXString(<DefaultPropsComponent />))
    .toEqual(`<DefaultPropsComponent
  boolean
  number={0}
  test="test"
  undefinedProp={undefined}
/>`);
});

test('should not render default props if "showDefaultProps" option is false', () => {
  expect(
    reactElementToJSXString(<DefaultPropsComponent />, {
      showDefaultProps: false,
    })
  ).toEqual('<DefaultPropsComponent />');
});

test('should render props that differ from their defaults if "showDefaultProps" option is false', () => {
  expect(
    reactElementToJSXString(<DefaultPropsComponent test="foo" />, {
      showDefaultProps: false,
    })
  ).toEqual('<DefaultPropsComponent test="foo" />');
});

test('should render boolean props if value is `false`, default is `true` and "showDefaultProps" is false', () => {
  expect(
    reactElementToJSXString(<DefaultPropsComponent boolean={false} />, {
      showDefaultProps: false,
    })
  ).toEqual('<DefaultPropsComponent boolean={false} />');
});

test('reactElementToJSXString(<div co={<div a="1" />} />, { displayName: toUpper })', () => {
  expect(
    reactElementToJSXString(<div co={<div a="1" />} />, {
      displayName: (element) => element.type.toUpperCase(),
    })
  ).toEqual('<DIV co={<DIV a="1" />} />');
});

test('reactElementToJSXString(<div co={{a: <div a="1" />}} />, { displayName: toUpper })', () => {
  expect(
    reactElementToJSXString(
      <div
        co={{
          a: <div a="1" />,
        }}
      />,
      {
        displayName: (element) => element.type.toUpperCase(),
      }
    )
  ).toEqual(`<DIV
  co={{
    a: <DIV a="1" />
  }}
 />`);
});

test('should omit true as value', () => {
  expect(
    reactElementToJSXString(<div primary={true} />) // eslint-disable-line react/jsx-boolean-value
  ).toEqual('<div primary />');
});

test('should omit attributes with false as value', () => {
  expect(
    reactElementToJSXString(<div primary={false} />) // eslint-disable-line react/jsx-boolean-value
  ).toEqual('<div />');
});

test('should return the actual functions when "showFunctions" is true', () => {
  function fn() {
    return 'value';
  }

  expect(
    reactElementToJSXString(<div fn={fn} />, {
      showFunctions: true,
    })
  ).toEqual(`<div fn={function fn() {return "value";}} />`);
});

test('should expose the multiline "functionValue" formatter', () => {
  function fn() {
    return 'value';
  }

  expect(
    reactElementToJSXString(<div fn={fn} />, {
      showFunctions: true,
      functionValue: preserveFunctionLineBreak,
    })
  ).toEqual(`<div
  fn={function fn() {
    return "value";
  }}
 />`);
});

test('reactElementToJSXString(<DisplayNamePrecedence />)', () => {
  expect(reactElementToJSXString(<DisplayNamePrecedence />)).toEqual(
    '<This should take precedence />'
  );
});

// maxInlineAttributesLineLength tests
// Validate two props will stay inline if their length is less than the option
test('reactElementToJSXString(<div aprop="1" bprop="2" />, { maxInlineAttributesLineLength: 100 }))', () => {
  expect(
    reactElementToJSXString(<div aprop="1" bprop="2" />, {
      maxInlineAttributesLineLength: 100,
    })
  ).toEqual('<div aprop="1" bprop="2" />');
});

// Validate one prop will go to new line if length is greater than option. One prop is a special case since
// the old logic operated on whether or not two or more attributes were present. Making sure this overrides
// that older logic
test('reactElementToJSXString(<div aprop="1"/>, { maxInlineAttributesLineLength: 5 }))', () => {
  expect(
    reactElementToJSXString(<div aprop="1" />, {
      maxInlineAttributesLineLength: 5,
    })
  ).toEqual(`<div
  aprop="1"
/>`);
});

// Validate two props will go be multiline if their length is greater than the given option
test('reactElementToJSXString(<div aprop="1" bprop="2" />, { maxInlineAttributesLineLength: 10 }))', () => {
  expect(
    reactElementToJSXString(<div aprop="1" bprop="2" />, {
      maxInlineAttributesLineLength: 10,
    })
  ).toEqual(`<div
  aprop="1"
  bprop="2"
/>`);
});

// Same tests as above but with elements that have children. The closing braces for elements with children and without children
// run through different code paths so we have both sets of test to specify the behavior of both when this option is present
test('reactElementToJSXString(<div aprop="1" bprop="2">content</div>, { maxInlineAttributesLineLength: 100 }))', () => {
  expect(
    reactElementToJSXString(
      <div title="1" slot="2">
        content
      </div>,
      {
        maxInlineAttributesLineLength: 100,
      }
    )
  ).toEqual(`<div slot="2" title="1">
  content
</div>`);
});

test('reactElementToJSXString(<div aprop="1">content</div>, { maxInlineAttributesLineLength: 5 }))', () => {
  expect(
    reactElementToJSXString(<div title="1">content</div>, {
      maxInlineAttributesLineLength: 5,
    })
  ).toEqual(`<div
  title="1"
>
  content
</div>`);
});

test('reactElementToJSXString(<div aprop="1" bprop="2">content</div>, { maxInlineAttributesLineLength: 10 }))', () => {
  expect(
    reactElementToJSXString(
      <div title="1" slot="2">
        content
      </div>,
      {
        maxInlineAttributesLineLength: 10,
      }
    )
  ).toEqual(`<div
  slot="2"
  title="1"
>
  content
</div>`);
});

// Multi-level inline attribute test
test('reactElementToJSXString(<div><div>content</div></div>, { maxInlineAttributesLineLength: 24 }))', () => {
  expect(
    reactElementToJSXString(
      <div data-a="1" data-b="2">
        <div data-c="3" data-d="4">
          content
        </div>
      </div>,
      {
        maxInlineAttributesLineLength: 26,
      }
    )
  ).toEqual(`<div data-a="1" data-b="2">
  <div
    data-c="3"
    data-d="4"
  >
    content
  </div>
</div>`);
});

test('should return functionValue result when it returns a string', () => {
  expect(
    reactElementToJSXString(<div onClick={() => 'value'} />, {
      showFunctions: true,
      functionValue: () => '...',
    })
  ).toEqual('<div onClick={...} />');
});

test('sends the original fn to functionValue', () => {
  const fn = () => {};
  const functionValue = (receivedFn: unknown) => expect(receivedFn).toBe(fn);
  reactElementToJSXString(<div onClick={fn} />, {
    functionValue,
  });
});

test('should return noRefCheck when "showFunctions" is false and "functionValue" is not provided', () => {
  expect(reactElementToJSXString(<div onClick={() => {}} />)).toEqual(
    '<div onClick={function noRefCheck() {}} />'
  );
});

test('reactElementToJSXString(<Fragment><h1>foo</h1><p>bar</p></Fragment>)', () => {
  expect(
    reactElementToJSXString(
      <Fragment>
        <h1>foo</h1>
        <p>bar</p>
      </Fragment>
    )
  ).toEqual(`<>
  <h1>
    foo
  </h1>
  <p>
    bar
  </p>
</>`);
});

test('reactElementToJSXString(<Fragment key="foo"><div /><div /></Fragment>)', () => {
  expect(
    reactElementToJSXString(
      <Fragment key="foo">
        <div />
        <div />
      </Fragment>
    )
  ).toEqual(`<React.Fragment key="foo">
  <div />
  <div />
</React.Fragment>`);
});

test('reactElementToJSXString(<Fragment />)', () => {
  expect(reactElementToJSXString(<Fragment />)).toEqual(`<React.Fragment />`);
});

test('reactElementToJSXString(<div render={<Fragment><div /><div /></Fragment>} />)', () => {
  expect(
    reactElementToJSXString(
      <div
        render={
          <Fragment>
            <div />
            <div />
          </Fragment>
        }
      />
    )
  ).toEqual(`<div render={<><div /><div /></>} />`);
});

test('should not cause recursive loop when prop object contains an element', () => {
  const Test = () => <div>Test</div>;

  const Container = ({
    title: { component },
  }: {
    title: { component: ReactNode };
  }) => <div>{component}</div>;

  class App extends Component {
    render() {
      const inside = (
        <Container
          title={{
            component: <Test />,
          }}
        />
      );

      const insideString = reactElementToJSXString(inside);

      return (
        <div>
          {insideString}

          <div>Hello world!</div>

          <p>Start editing to see some magic happen :)</p>
        </div>
      );
    }
  }

  render(<App />);

  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});

test('should not cause recursive loop when an element contains a ref', () => {
  expect.assertions(2);

  class App extends Component {
    constructor(props) {
      super(props);
      this.inputRef = createRef();
    }

    componentDidMount() {
      expect(reactElementToJSXString(<input ref={this.inputRef} />))
        .toEqual(`<input
  ref={{
    current: '[Circular]'
  }}
 />`);
    }

    render() {
      return (
        <>
          <input ref={this.inputRef} />
          <div>Hello world!</div>
        </>
      );
    }
  }

  render(<App />);

  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});

test('should use inferred function name as display name for `forwardRef` element', () => {
  const Tag = forwardRef(function TagWithRef({ text }, ref) {
    return <span ref={ref}>{text}</span>;
  });

  expect(reactElementToJSXString(<Tag text="some label" />)).toEqual(
    `<TagWithRef text="some label" />`
  );
});

test('should use `displayName` instead of inferred function name as display name for `forwardRef` element', () => {
  const Tag = forwardRef(function Tag({ text }, ref) {
    return <span ref={ref}>{text}</span>;
  });
  Tag.displayName = 'MyTag';

  expect(reactElementToJSXString(<Tag text="some label" />)).toEqual(
    `<MyTag text="some label" />`
  );
});

test('should use inferred function name as display name for `memo` element', () => {
  const Tag = memo(function TagMemoized({ text }) {
    return <span>{text}</span>;
  });

  expect(reactElementToJSXString(<Tag text="some label" />)).toEqual(
    `<TagMemoized text="some label" />`
  );
});

test('should use `displayName` instead of inferred function name as display name for `memo` element', () => {
  const Tag = memo(function Tag({ text }) {
    return <span>{text}</span>;
  });
  Tag.displayName = 'MyTag';

  expect(reactElementToJSXString(<Tag text="some label" />)).toEqual(
    `<MyTag text="some label" />`
  );
});

test('should use inferred function name as display name for a `forwardRef` wrapped in `memo`', () => {
  const Tag = memo(
    forwardRef(function TagWithRef({ text }, ref) {
      return <span ref={ref}>{text}</span>;
    })
  );

  expect(reactElementToJSXString(<Tag text="some label" />)).toEqual(
    `<TagWithRef text="some label" />`
  );
});

test('should use inferred function name as display name for a component wrapped in `memo` multiple times', () => {
  const Tag = memo(
    memo(
      memo(function TagReallyMemoized({ text }) {
        return <span>{text}</span>;
      })
    )
  );

  expect(reactElementToJSXString(<Tag text="some label" />)).toEqual(
    `<TagReallyMemoized text="some label" />`
  );
});

test('should stringify `StrictMode` correctly', () => {
  const App = () => null;

  expect(
    reactElementToJSXString(
      <StrictMode>
        <App />
      </StrictMode>
    )
  ).toEqual(`<StrictMode>
  <App />
</StrictMode>`);
});

test('should stringify `Suspense` correctly', () => {
  const Spinner = () => null;
  const ProfilePage = () => null;

  expect(
    reactElementToJSXString(
      <Suspense fallback={<Spinner />}>
        <ProfilePage />
      </Suspense>
    )
  ).toEqual(`<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>`);
});

test('should stringify `Profiler` correctly', () => {
  const Navigation = () => null;

  expect(
    reactElementToJSXString(
      <Profiler id="Navigation" onRender={() => {}}>
        <Navigation />
      </Profiler>
    )
  ).toEqual(`<Profiler
  id="Navigation"
  onRender={function noRefCheck() {}}
>
  <Navigation />
</Profiler>`);
});

test('should stringify `Contex.Provider` correctly', () => {
  const Ctx = createContext();
  const App = () => {};

  expect(
    reactElementToJSXString(
      <Ctx.Provider value={null}>
        <App />
      </Ctx.Provider>
    )
  ).toEqual(`<Context.Provider value={null}>
  <App />
</Context.Provider>`);
});

test('should stringify `Context` correctly', () => {
  const Ctx = createContext();
  const App = () => {};

  expect(
    reactElementToJSXString(
      <Ctx value={null}>
        <App />
      </Ctx>
    )
  ).toEqual(`<Context.Provider value={null}>
  <App />
</Context.Provider>`);
});

test('should stringify `Contex.Provider` with `displayName` correctly', () => {
  const Ctx = createContext();
  Ctx.displayName = 'MyCtx';

  const App = () => {};

  expect(
    reactElementToJSXString(
      <Ctx.Provider value={null}>
        <App />
      </Ctx.Provider>
    )
  ).toEqual(`<MyCtx.Provider value={null}>
  <App />
</MyCtx.Provider>`);
});

test('should stringify `Contex.Consumer` correctly', () => {
  const Ctx = createContext();
  const Button = () => null;

  expect(
    reactElementToJSXString(
      <Ctx.Consumer>{(theme) => <Button theme={theme} />}</Ctx.Consumer>
    )
  ).toEqual(`<Context.Consumer />`);
});

test('should stringify `Contex.Consumer` with `displayName` correctly', () => {
  const Ctx = createContext();
  Ctx.displayName = 'MyCtx';

  const Button = () => null;

  expect(
    reactElementToJSXString(
      <Ctx.Consumer>{(theme) => <Button theme={theme} />}</Ctx.Consumer>
    )
  ).toEqual(`<MyCtx.Consumer />`);
});

test('should stringify `lazy` component correctly', () => {
  const Lazy = lazy(() => Promise.resolve(() => {}));

  expect(reactElementToJSXString(<Lazy />)).toEqual(`<Lazy />`);
});

test('should stringify `forwardRef` element with a circular property', () => {
  function TagList({ tags }) {
    return tags;
  }

  const Tag = forwardRef(function TagWithRef({ text }, ref) {
    return <span ref={ref}>{text}</span>;
  });
  Tag.emotionReal = Tag;

  expect(
    reactElementToJSXString(
      <TagList tags={[<Tag key="oops" text="oops, circular" />]} />
    )
  ).toEqual(`<TagList
  tags={[
    <TagWithRef key="oops" text="oops, circular"/>
  ]}
 />`);
});

test('should stringify element with a prop that has circular references', () => {
  const parent = {};
  const child = {};
  parent.child = child;
  child.parent = parent;

  function Comp() {
    return null;
  }

  expect(reactElementToJSXString(<Comp prop={parent} />)).toEqual(`<Comp
  prop={{
    child: {
      parent: '[Circular]'
    }
  }}
 />`);
});
