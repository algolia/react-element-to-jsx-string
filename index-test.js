/* eslint-env mocha */

import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import reactElementToJSXString from './index';

class TestComponent extends React.Component {}

describe(`reactElementToJSXString(ReactElement)`, () => {
  it(`reactElementToJSXString(<TestComponent/>)`, () => {
    expect(
      reactElementToJSXString(<TestComponent/>)
    ).toEqual(`<TestComponent />`);
  });

  it(`reactElementToJSXString(React.createElement('div'))`, () => {
    expect(
      reactElementToJSXString(React.createElement('div'))
    ).toEqual(`<div />`);
  });

  it(`reactElementToJSXString(<div/>)`, () => {
    expect(
      reactElementToJSXString(<div/>)
    ).toEqual(`<div />`);
  });

  it(`reactElementToJSXString(<div fn={() => {}}/>)`, () => {
    expect(
      reactElementToJSXString(<div fn={() => {}}/>)
    ).toEqual(`<div fn={function noRefCheck() {}} />`);
  });

  it(`reactElementToJSXString(<div fn={function hello(){}}/>)`, () => {
    expect(
      reactElementToJSXString(<div fn={function hello() {}}/>)
    ).toEqual(`<div fn={function noRefCheck() {}} />`);
  });

  it(`reactElementToJSXString(<div co={<div a="1" />} />)`, () => {
    expect(
      reactElementToJSXString(<div co={<div a="1" />}/>)
    ).toEqual(`<div co={<div a="1" />} />`);
  });

  it(`reactElementToJSXString(<div re={/^Hello world$/} />)`, () => {
    expect(
      reactElementToJSXString(<div re={/^Hello world$/}/>)
    ).toEqual(`<div re={/^Hello world$/} />`);
  });

  it(`reactElementToJSXString(<div int={8}/>)`, () => {
    expect(
      reactElementToJSXString(<div int={8}/>)
    ).toEqual(`<div int={8} />`);
  });

  it(`reactElementToJSXString(<div obj={{hello: 'world'}}/>)`, () => {
    expect(
      reactElementToJSXString(<div obj={{hello: 'world'}}/>)
    ).toEqual(`<div obj={{hello: 'world'}} />`);
  });

  it(`reactElementToJSXString(<div obj={{hello: [1, 2], world: {nested: true}}}/>)`, () => {
    expect(
      reactElementToJSXString(<div obj={{hello: [1, 2], world: {nested: true}}}/>)
    ).toEqual(`<div obj={{hello: [1, 2], world: {nested: true}}} />`);
  });

  it(`reactElementToJSXString(<div></div>)`, () => {
    expect(
      reactElementToJSXString(<div></div>)
    ).toEqual(`<div />`);
    expect(
      reactElementToJSXString(<div></div>)
    ).toEqual(`<div></div>`);
  });

  it(`reactElementToJSXString(<div z="3" a="1" b="2"/>)`, () => {
    /* eslint react/jsx-sort-props: 0 */
    expect(
      reactElementToJSXString(<div z="3" a="1" b="2"/>)
    ).toEqual(
`<div
  a="1"
  b="2"
  z="3"
/>`);
  });

  it(`reactElementToJSXString(<div a="1">Hello</div>)`, () => {
    expect(
      reactElementToJSXString(<div a="1">Hello</div>)
    ).toEqual(
`<div a="1">
  Hello
</div>`);
  });

  it(`reactElementToJSXString(<div a="1" b="5">Hello</div>)`, () => {
    expect(
      reactElementToJSXString(<div a="1" b="5">Hello</div>)
    ).toEqual(
`<div
  a="1"
  b="5"
>
  Hello
</div>`);
  });

  it(`reactElementToJSXString(<div>Hello</div>)`, () => {
    expect(
      reactElementToJSXString(<div>Hello</div>)
    ).toEqual(
`<div>
  Hello
</div>`);
  });

  it(`reactElementToJSXString(<div><div>Hello</div></div>)`, () => {
    expect(
      reactElementToJSXString(<div><div>Hello</div></div>)
    ).toEqual(
`<div>
  <div>
    Hello
  </div>
</div>`);
  });

  it(`reactElementToJSXString(<div a="1" b="2"><div>Hello</div></div>)`, () => {
    expect(
      reactElementToJSXString(<div a="1" b="2"><div>Hello</div></div>)
    ).toEqual(
`<div
  a="1"
  b="2"
>
  <div>
    Hello
  </div>
</div>`);
  });

  it(`reactElementToJSXString()`, () => {
    expect(() => {
      reactElementToJSXString();
    }).toThrow('react-element-to-jsx-string: Expected a ReactElement');
  });

  it(`reactElementToJSXString(null)`, () => {
    expect(() => {
      reactElementToJSXString(null);
    }).toThrow('react-element-to-jsx-string: Expected a ReactElement');
  });

  it(`ignores object keys order (sortobject)`, () => {
    expect(
      reactElementToJSXString(<div o={{a: 1, b: 2}}/>)
    ).toEqual(
      reactElementToJSXString(<div o={{b: 2, a: 1}}/>)
    );
  });

  it(`reactElementToJSXString(<div a={null} />`, () => {
    expect(
      reactElementToJSXString(<div a={null} />)
    ).toEqual(
      reactElementToJSXString(<div a={null} />)
    );
  });

  it(`reactElementToJSXString(<div a={undefined} />`, () => {
    expect(
      reactElementToJSXString(<div a={undefined} />)
    ).toEqual(
      reactElementToJSXString(<div a={undefined} />)
    );
  });

  it(`reactElementToJSXString(<div a={{b: function hello() {}}} />`, () => {
    expect(
      reactElementToJSXString(<div a={{b: function hello() {}}} />)
    ).toEqual(`<div a={{b: function noRefCheck() {}}} />`);
  });

  it(`reactElementToJSXString(<div a={{b: {c: {d: <div />, e: null}}}} />`, () => {
    expect(
      reactElementToJSXString(<div a={{b: {c: {d: <div />, e: null}}}} />)
    ).toEqual(`<div a={{b: {c: {d: <div />, e: null}}}} />`);
  });

  it(`reactElementToJSXString(<div a={{b: {}}} />`, () => {
    expect(
      reactElementToJSXString(<div a={{b: {}}} />)
    ).toEqual(`<div a={{b: {}}} />`);
  });

  it(`reactElementToJSXString(<div a={{}} />`, () => {
    expect(
      reactElementToJSXString(<div a={{}} />)
    ).toEqual(`<div a={{}} />`);
  });


  it(`reactElementToJSXString(<div><span /><span /></div>)`, () => {
    expect(
      reactElementToJSXString(<div><span /><span /></div>)
    ).toEqual(`<div>
  <span />
  <span />
</div>`);
  });

  it(`reactElementToJSXString(<div>foo<div /></div>)`, () => {
    expect(
      reactElementToJSXString(<div>foo<div /></div>)
    ).toEqual(`<div>
  foo
  <div />
</div>`);
  });

  it(`reactElementToJSXString(<div a={[1, 2, 3, 4]} />`, () => {
    expect(
      reactElementToJSXString(<div a={[1, 2, 3, 4]} />)
    ).toEqual(`<div a={[1, 2, 3, 4]} />`);
  });

  it(`reactElementToJSXString(<div a={[1, 2, 3, 4]} />`, () => {
    expect(
      reactElementToJSXString(<div a={[{Hello: ', world!'}]} />)
    ).toEqual(`<div a={[{Hello: ', world!'}]} />`);
  });

  it(`reactElementToJSXString(<div a={[{}]} />`, () => {
    expect(
      reactElementToJSXString(<div a={[{}]} />)
    ).toEqual(`<div a={[{}]} />`);
  });

  it(`reactElementToJSXString(<div a={[]} />`, () => {
    expect(
      reactElementToJSXString(<div a={[]} />)
    ).toEqual(`<div a={[]} />`);
  });

  it(`reactElementToJSXString(<div a={[]} />`, () => {
    expect(
      reactElementToJSXString(<div a={[]} />)
    ).toEqual(`<div a={[]} />`);
  });

  it(`reactElementToJSXString(<div a={[<div><span /></div>]} />`, () => {
    expect(
      reactElementToJSXString(<div a={[<div><span /></div>]} />)
    ).toEqual(`<div a={[<div><span /></div>]} />`);
  });

  it(`reactElementToJSXString(decorator(<span />)`, () => {
    function myDecorator(ComposedComponent) {
      class MyDecorator extends React.Component {
        render() {
          return (
            <div>
              {React.createElement(ComposedComponent.type, this.props)}
            </div>
          );
        }
      }
      MyDecorator.displayName = ComposedComponent.name + '-Decorated';
      return MyDecorator;
    }

    var NestedSpan = myDecorator(<span />);
    var renderer = createRenderer();
    renderer.render(<NestedSpan />);
    expect(
      reactElementToJSXString(renderer.getRenderOutput())
    ).toEqual(`<div>
  <span />
</div>`);
  });

  it(`reactElementToJSXString(<div>Hello {this.props.name}</div>`, () => {
    class InlineProps extends React.Component {
      render() {
        return <div>Hello {this.props.name}</div>;
      }
    }

    let renderer = createRenderer();
    renderer.render(<InlineProps name="John" />);
    let actualElement = renderer.getRenderOutput();
    expect(reactElementToJSXString(actualElement))
      .toEqual(
`<div>
  Hello John
</div>`);
  });

  it(`reactElementToJSXString(<div a={[<div><span /></div>]} />`, () => {
    expect(
      reactElementToJSXString(<div a={[<div><span /></div>]} />)
    ).toEqual(`<div a={[<div><span /></div>]} />`);
  });

  it(`reactElementToJSXString(<div aprop="test" ref="yes" />`, () => {
    expect(
      reactElementToJSXString(<div aprop="test" ref="yes" />)
    ).toEqual(
`<div
  ref="yes"
  aprop="test"
/>`);
  });

  it(`reactElementToJSXString(<div aprop="a" ref="yes"><span ref="wee" zprop="z"/></div>`, () => {
    expect(
      reactElementToJSXString(<div aprop="a" ref="yes"><span ref="wee" zprop="z"/></div>)
    ).toEqual(
`<div
  ref="yes"
  aprop="a"
>
  <span
    ref="wee"
    zprop="z"
  />
</div>`);
  });

  it(`reactElementToJSXString(<div aprop="test" key="yes" />`, () => {
    expect(
      reactElementToJSXString(<div aprop="test" key="yes" />)
    ).toEqual(
`<div
  key="yes"
  aprop="test"
/>`);
  });
});
