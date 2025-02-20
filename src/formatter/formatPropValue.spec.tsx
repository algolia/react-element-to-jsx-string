import { beforeEach, describe, expect, it, vitest } from "vitest";
import { generateOptionsFixture } from "../__tests__/generateOptionsFixture";
import parseReactElement from "../parser/parseReactElement";
import formatComplexDataStructure from "./formatComplexDataStructure";
import formatPropValue from "./formatPropValue";
import formatTreeNode from "./formatTreeNode";

vitest.mock("./../parser/parseReactElement");
vitest.mock("./formatTreeNode");
vitest.mock("./formatComplexDataStructure");

describe("formatPropValue", () => {
  beforeEach(() => {
    vitest
      .mocked(formatTreeNode)
      .mockReturnValue("<MockedFormatTreeNodeResult />");

    vitest
      .mocked(formatComplexDataStructure)
      .mockReturnValue("*Mocked formatComplexDataStructure result*");
  });

  it("should format an integer prop value", () => {
    expect(formatPropValue(42, false, 0, generateOptionsFixture({}))).toBe(
      "{42}",
    );
  });

  it("should escape double quote on prop value of string type", () => {
    expect(
      formatPropValue('Hello "Jonh"!', false, 0, generateOptionsFixture({})),
    ).toBe('"Hello &quot;Jonh&quot;!"');
  });

  it("should format a symbol prop value", () => {
    expect(
      formatPropValue(Symbol("Foo"), false, 0, generateOptionsFixture({})),
    ).toBe("{Symbol('Foo')}");
    // eslint-disable-next-line symbol-description
    expect(
      formatPropValue(Symbol(), false, 0, generateOptionsFixture({})),
    ).toBe("{Symbol()}");
  });

  it("should replace a function prop value by a an empty generic function by default", () => {
    const doThings = (a: number) => a * 2;

    expect(
      formatPropValue(doThings, false, 0, generateOptionsFixture({})),
    ).toBe("{function noRefCheck() {}}");
  });

  it('should show the function prop value implementation if "showFunctions" option is true', () => {
    function doThings(a: number) {
      return a * 2;
    }

    expect(
      formatPropValue(
        doThings,
        false,
        0,
        generateOptionsFixture({
          showFunctions: true,
        }),
      ),
    ).toBe("{function doThings(a) {return a * 2;}}");
  });

  it('should format the function prop value with the "functionValue" option', () => {
    const doThings = (a: number) => a * 2;

    const functionValue = (fn: Function) => {
      expect(fn).toBe(doThings);

      return "function Myfunction() {}";
    };

    expect(
      formatPropValue(
        doThings,
        false,
        0,
        generateOptionsFixture({
          functionValue,
          showFunctions: true,
        }),
      ),
    ).toBe("{function Myfunction() {}}");

    expect(
      formatPropValue(
        doThings,
        false,
        0,
        generateOptionsFixture({
          functionValue,
          showFunctions: false,
        }),
      ),
    ).toBe("{function Myfunction() {}}");
  });

  it("should parse and format a react element prop value", () => {
    expect(formatPropValue(<div />, false, 0, generateOptionsFixture({}))).toBe(
      "{<MockedFormatTreeNodeResult />}",
    );

    expect(parseReactElement).toHaveBeenCalledTimes(1);
    expect(formatTreeNode).toHaveBeenCalledTimes(1);
  });

  it("should format a date prop value", () => {
    expect(
      formatPropValue(
        new Date("2017-01-01T11:00:00.000Z"),
        false,
        0,
        generateOptionsFixture({}),
      ),
    ).toBe('{new Date("2017-01-01T11:00:00.000Z")}');
  });

  it("should format an invalid date prop value", () => {
    expect(
      formatPropValue(
        new Date(Number.NaN),
        false,
        0,
        generateOptionsFixture({}),
      ),
    ).toBe("{new Date(NaN)}");
  });

  it("should format an object prop value", () => {
    expect(
      formatPropValue(
        {
          foo: 42,
        },
        false,
        0,
        generateOptionsFixture({}),
      ),
    ).toBe("{*Mocked formatComplexDataStructure result*}");

    expect(formatComplexDataStructure).toHaveBeenCalledTimes(1);
  });

  it("should format an array prop value", () => {
    expect(
      formatPropValue(["a", "b", "c"], false, 0, generateOptionsFixture({})),
    ).toBe("{*Mocked formatComplexDataStructure result*}");

    expect(formatComplexDataStructure).toHaveBeenCalledTimes(1);
  });

  it("should format a boolean prop value", () => {
    expect(formatPropValue(true, false, 0, generateOptionsFixture({}))).toBe(
      "{true}",
    );

    expect(formatPropValue(false, false, 0, generateOptionsFixture({}))).toBe(
      "{false}",
    );
  });

  it("should format null prop value", () => {
    expect(formatPropValue(null, false, 0, generateOptionsFixture({}))).toBe(
      "{null}",
    );
  });

  it("should format undefined prop value", () => {
    expect(
      formatPropValue(undefined, false, 0, generateOptionsFixture({})),
    ).toBe("{undefined}");
  });

  it('should call the ".toString()" method on object instance prop value', () => {
    expect(
      formatPropValue(
        new Set(["a", "b", 42]),
        false,
        0,
        generateOptionsFixture({}),
      ),
    ).toBe("{[object Set]}");

    expect(
      formatPropValue(new Map(), false, 0, generateOptionsFixture({})),
    ).toBe("{[object Map]}");
  });
});
