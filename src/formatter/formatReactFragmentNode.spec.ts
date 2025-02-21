import { describe, expect, it } from "vitest";
import formatReactFragmentNode from "./formatReactFragmentNode";

const defaultOptions = {
  filterProps: [],
  showDefaultProps: true,
  showFunctions: false,
  tabStop: 2,
  useBooleanShorthandSyntax: true,
  useFragmentShortSyntax: true,
  sortProps: true,
};

describe("formatReactFragmentNode", () => {
  it("should format a react fragment with a string as children", () => {
    const tree = {
      type: "ReactFragment" as const,
      children: [
        {
          type: "string" as const,
          value: "Hello world",
        },
      ],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions)).toEqual(`<>
  Hello world
</>`);
  });

  it("should format a react fragment with a key", () => {
    const tree = {
      type: "ReactFragment" as const,
      key: "foo",
      children: [
        {
          type: "string" as const,
          value: "Hello world",
        },
      ],
    };

    expect(
      formatReactFragmentNode(tree, false, 0, defaultOptions),
    ).toEqual(`<React.Fragment key="foo">
  Hello world
</React.Fragment>`);
  });

  it("should format a react fragment with multiple children", () => {
    const tree = {
      type: "ReactFragment" as const,
      children: [
        {
          type: "ReactElement" as const,
          displayName: "div",
          defaultProps: {},
          props: {
            a: "foo",
          },
          children: [],
        },
        {
          type: "ReactElement" as const,
          displayName: "div",
          defaultProps: {},
          props: {
            b: "bar",
          },
          children: [],
        },
      ],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions)).toEqual(`<>
  <div a="foo" />
  <div b="bar" />
</>`);
  });

  it("should format an empty react fragment", () => {
    const tree = {
      type: "ReactFragment" as const,
      children: [],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions)).toEqual(
      "<React.Fragment />",
    );
  });

  it("should format an empty react fragment with key", () => {
    const tree = {
      type: "ReactFragment" as const,
      key: "foo",
      children: [],
    };

    expect(formatReactFragmentNode(tree, false, 0, defaultOptions)).toEqual(
      '<React.Fragment key="foo" />',
    );
  });

  it("should format a react fragment using the explicit syntax", () => {
    const tree = {
      type: "ReactFragment" as const,
      children: [
        {
          type: "string" as const,
          value: "Hello world",
        },
      ],
    };

    expect(
      formatReactFragmentNode(tree, false, 0, {
        ...defaultOptions,
        ...{
          useFragmentShortSyntax: false,
        },
      }),
    ).toEqual(`<React.Fragment>
  Hello world
</React.Fragment>`);
  });
});
