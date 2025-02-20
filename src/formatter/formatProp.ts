import { type Options, defaultOptions } from "../options";
import formatPropValue from "./formatPropValue";
import spacer from "./spacer";

export default (
  name: string,
  hasValue: boolean,
  value: unknown,
  hasDefaultValue: boolean,
  defaultValue: unknown,
  inline: boolean,
  lvl: number,
  options: Options,
): {
  attributeFormattedInline: string;
  attributeFormattedMultiline: string;
  isMultilineAttribute: boolean;
} => {
  if (!hasValue && !hasDefaultValue) {
    throw new Error(
      `The prop "${name}" has no value and no default: could not be formatted`,
    );
  }

  const usedValue = hasValue ? value : defaultValue;

  const { useBooleanShorthandSyntax, tabStop = defaultOptions.tabStop } =
    options;

  const formattedPropValue = formatPropValue(usedValue, inline, lvl, options);

  let attributeFormattedInline = " ";
  let attributeFormattedMultiline = `\n${spacer(lvl + 1, tabStop)}`;
  const isMultilineAttribute = formattedPropValue.includes("\n");

  if (
    useBooleanShorthandSyntax &&
    formattedPropValue === "{false}" &&
    !hasDefaultValue
  ) {
    // If a boolean is false and not different from it's default, we do not render the attribute
    attributeFormattedInline = "";
    attributeFormattedMultiline = "";
  } else if (useBooleanShorthandSyntax && formattedPropValue === "{true}") {
    attributeFormattedInline += `${name}`;
    attributeFormattedMultiline += `${name}`;
  } else {
    attributeFormattedInline += `${name}=${formattedPropValue}`;
    attributeFormattedMultiline += `${name}=${formattedPropValue}`;
  }

  return {
    attributeFormattedInline,
    attributeFormattedMultiline,
    isMultilineAttribute,
  };
};
