import { describe, expect, it } from "vitest";

import { isPlainObject } from "./isPlainObject";

describe("isPlainObject", () => {
  it("should return true for objects created by the Object constructor", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ foo: "bar" })).toBe(true);
    expect(isPlainObject(new Object())).toBe(true);
    expect(isPlainObject(Object.create(Object.prototype))).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it("should return false for other values", () => {
    class Foo {
      abc = {};
    }

    expect(isPlainObject(new Foo())).toBe(false);
    expect(isPlainObject(Object.create({}))).toBe(false);
    expect(isPlainObject(/foo/)).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject(["foo", "bar"])).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject("foo")).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });
});
