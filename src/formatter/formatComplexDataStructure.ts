import { prettyPrint } from "@base2/pretty-print-object";
import { isValidElement } from "react";
import { type Options, defaultOptions } from "../options";
import parseReactElement from "../parser/parseReactElement";
import formatFunction from "./formatFunction";
import formatTreeNode from "./formatTreeNode";
import sortObject from "./sortObject";
import spacer from "./spacer";

export default (
  value: Record<string, unknown> | Array<unknown>,
  inline: boolean,
  lvl: number,
  options: Options,
): string => {
  const normalizedValue = sortObject(value);

  const stringifiedValue = prettyPrint(normalizedValue, {
    transform: (currentObj, prop, originalResult) => {
      const currentValue = currentObj[prop];

      if (currentValue && isValidElement(currentValue)) {
        return formatTreeNode(
          parseReactElement(currentValue, options),
          true,
          lvl,
          options,
        );
      }

      if (typeof currentValue === "function") {
        return formatFunction(currentValue, options);
      }

      return originalResult;
    },
  });

  if (inline) {
    return stringifiedValue
      .replace(/\s+/g, " ")
      .replace(/{ /g, "{")
      .replace(/ }/g, "}")
      .replace(/\[ /g, "[")
      .replace(/ ]/g, "]");
  }

  const tabStop = options.tabStop ?? defaultOptions.tabStop;

  // Replace tabs with spaces, and add necessary indentation in front of each new line
  return stringifiedValue
    .replace(/\t/g, spacer(1, tabStop))
    .replace(/\n([^$])/g, `\n${spacer(lvl + 1, tabStop)}$1`);
};
