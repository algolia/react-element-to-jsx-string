/* eslint-disable react/prop-types , no-console */
import React, { Component } from 'react';
import reactElementToJSXString from '../../src';

import { mount } from 'enzyme';

const Test = () => <div>Test</div>;

const Container = ({ title: { component } }) => <div>{component}</div>;

class App extends Component {
  render() {
    const inside = <Container title={{ component: <Test /> }} />;

    const insideString = reactElementToJSXString(inside);

    return (
      <div>
        {insideString}

        <div id="hello" />

        <p>Start editing to see some magic happen :)</p>
      </div>
    );
  }
}

describe('reactElementToJSXString', () => {
  it('should not cause recursive loop when prop object contains an element', () => {
    expect(mount(<App />).find('#hello')).toHaveLength(1);
  });
});
