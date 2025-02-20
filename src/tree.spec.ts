import { describe, expect, it } from "vitest";
import {
  createNumberTreeNode,
  createReactElementTreeNode,
  createReactFragmentTreeNode,
  createStringTreeNode,
} from "./tree";

describe("createStringTreeNode", () => {
  it("generate a string typed node payload", () => {
    expect(createStringTreeNode("foo")).toEqual({
      type: "string",
      value: "foo",
    });
  });
});

describe("createNumberTreeNode", () => {
  it("generate a number typed node payload", () => {
    expect(createNumberTreeNode(42)).toEqual({
      type: "number",
      value: 42,
    });
  });
});

describe("createReactElementTreeNode", () => {
  it("generate a react element typed node payload", () => {
    expect(
      createReactElementTreeNode(
        "MyComponent",
        {
          foo: 42,
        },
        {
          bar: 51,
        },
        [
          {
            type: "string",
            value: "abc",
          },
        ],
      ),
    ).toEqual({
      type: "ReactElement",
      displayName: "MyComponent",
      props: {
        foo: 42,
      },
      defaultProps: {
        bar: 51,
      },
      children: [
        {
          type: "string",
          value: "abc",
        },
      ],
    });
  });
});

describe("createReactFragmentTreeNode", () => {
  it("generate a react fragment typed node payload", () => {
    expect(
      createReactFragmentTreeNode("foo", [
        {
          type: "string",
          value: "abc",
        },
      ]),
    ).toEqual({
      type: "ReactFragment",
      key: "foo",
      children: [
        {
          type: "string",
          value: "abc",
        },
      ],
    });
  });
});
