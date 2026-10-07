import * as React from "react";

const isSeen = (value: unknown, seen: WeakSet<object>): boolean =>
  typeof value === "object" && value !== null && seen.has(value);

function safeSortObject(value: unknown, seen: WeakSet<object>): unknown {
  // return non-object value as is
  if (value === null || typeof value !== "object") {
    return value;
  }

  // return date and regexp values as is
  if (value instanceof Date || value instanceof RegExp) {
    return value;
  }

  // return react element as is but remove _owner key because it can lead to recursion
  if (React.isValidElement(value)) {
    const { _owner, ...copyObj } = value as typeof value & { _owner?: unknown };
    return copyObj;
  }

  seen.add(value);

  // make a copy of array with each item passed through the sorting algorithm
  if (Array.isArray(value)) {
    return value.map((v) => safeSortObject(v, seen));
  }

  // make a copy of object with key sorted
  const record = value as Record<string, unknown>;

  return Object.keys(record)
    .sort()
    .reduce<Record<string, unknown>>((result, key) => {
      const keyValue = record[key];

      if (key === "current" || isSeen(keyValue, seen)) {
        result[key] = "[Circular]";
      } else {
        result[key] = safeSortObject(keyValue, seen);
      }

      return result;
    }, {});
}

export default function sortObject(value: unknown): unknown {
  return safeSortObject(value, new WeakSet());
}
