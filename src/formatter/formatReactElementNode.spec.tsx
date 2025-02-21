import { describe, expect, it } from "vitest";
import { generateOptionsFixture } from "../__tests__/generateOptionsFixture";
import formatReactElementNode from "./formatReactElementNode";

const defaultOptions = generateOptionsFixture({
  filterProps: [],
  showDefaultProps: true,
  showFunctions: false,
  tabStop: 2,
  useBooleanShorthandSyntax: true,
  sortProps: true,
});

describe("formatReactElementNode", () => {
  it("should format a react element with a string a children", () => {
    const tree = {
      type: "ReactElement" as const,
      displayName: "h1",
      defaultProps: {},
      props: {},
      children: [
        {
          type: "string" as const,
          value: "Hello world",
        },
      ],
    };

    expect(formatReactElementNode(tree, false, 0, defaultOptions)).toEqual(`<h1>
  Hello world
</h1>`);
  });

  it("should format a single depth react element", () => {
    const tree = {
      type: "ReactElement" as const,
      displayName: "aaa",
      props: {
        foo: "41",
      },
      defaultProps: {
        foo: "41",
      },
      children: [],
    };

    expect(formatReactElementNode(tree, false, 0, defaultOptions)).toEqual(
      '<aaa foo="41" />',
    );
  });

  it("should format a react element with an object as props", () => {
    const tree = {
      type: "ReactElement" as const,
      displayName: "div",
      defaultProps: {
        a: {
          aa: "1",
          bb: {
            cc: "3",
          },
        },
      },
      props: {
        a: {
          aa: "1",
          bb: {
            cc: "3",
          },
        },
      },
      children: [],
    };

    expect(formatReactElementNode(tree, false, 0, defaultOptions)).toEqual(`<div
  a={{
    aa: '1',
    bb: {
      cc: '3'
    }
  }}
 />`);
  });

  it("should format a react element with another react element as props", () => {
    const tree = {
      type: "ReactElement" as const,
      displayName: "div",
      defaultProps: {
        a: <span title="51" />,
      },
      props: {
        a: <span title="42" />,
      },
      children: [],
    };

    expect(formatReactElementNode(tree, false, 0, defaultOptions)).toEqual(
      '<div a={<span title="42" />} />',
    );
  });

  it("should format a react element with multiline children", () => {
    const tree = {
      type: "ReactElement" as const,
      displayName: "div",
      defaultProps: {},
      props: {},
      children: [
        {
          type: "string" as const,
          value: "first line\nsecond line\nthird line",
        },
      ],
    };

    expect(
      formatReactElementNode(tree, false, 0, defaultOptions),
    ).toEqual(`<div>
  first line
  second line
  third line
</div>`);

    expect(
      formatReactElementNode(tree, false, 2, defaultOptions),
    ).toEqual(`<div>
      first line
      second line
      third line
    </div>`);
  });

  it("should allow filtering props by function", () => {
    const tree = {
      type: "ReactElement" as const,
      displayName: "h1",
      defaultProps: {},
      props: {
        className: "myClass",
        onClick: () => {},
      },
      children: [
        {
          type: "string" as const,
          value: "Hello world",
        },
      ],
    };

    const options = {
      ...defaultOptions,
      filterProps: (val: unknown, key: string) => !key.startsWith("on"),
    };

    expect(
      formatReactElementNode(tree, false, 0, options),
    ).toEqual(`<h1 className="myClass">
  Hello world
</h1>`);
  });
});
