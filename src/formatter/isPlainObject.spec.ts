/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Licensed under the MIT License.
 */

import assert from "node:assert";
import { describe, it } from "vitest";
import { isPlainObject } from "./isPlainObject";

describe("isPlainObject", () => {
  it("should return `true` if the object is created by the `Object` constructor.", () => {
    assert(isPlainObject(Object.create({})));
    assert(isPlainObject(Object.create(Object.prototype)));
    assert(isPlainObject({ foo: "bar" }));
    assert(isPlainObject({}));
    assert(isPlainObject(Object.create(null)));
  });

  it("should return `false` if the object is not created by the `Object` constructor.", () => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    function Foo(this: any) {
      this.abc = {};
    }

    assert(!isPlainObject(/foo/));
    assert(!isPlainObject(() => {}));
    assert(!isPlainObject(1));
    assert(!isPlainObject(["foo", "bar"]));
    assert(!isPlainObject([]));
    // @ts-expect-error
    assert(!isPlainObject(new Foo()));
    assert(!isPlainObject(null));
  });
});
