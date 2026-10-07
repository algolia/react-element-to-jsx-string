/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

// oxlint-disable-next-line typescript/no-wrapper-object-types -- In this case there nothing to replace Object
function isObject(o: unknown): o is Object {
  return Object.prototype.toString.call(o) === "[object Object]";
}

export function isPlainObject(o: unknown): o is Record<string, unknown> {
  if (isObject(o) === false) {
    return false;
  }

  // If has modified constructor
  const ctor = o.constructor;
  if (ctor === undefined) {
    return true;
  }

  // If has modified prototype
  const prot = ctor.prototype;
  if (isObject(prot) === false) {
    return false;
  }

  // If constructor does not have an Object-specific method
  // oxlint-disable-next-line no-prototype-builtins -- `prot` is a constructor prototype, not user data
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}
