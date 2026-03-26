/* @flow */

import spacer from './spacer';
import formatPropValue from './formatPropValue';
import formatComplexDataStructure from './formatComplexDataStructure';
import type { Options } from './../options';

const isValidJSXPropName = (propName: string): boolean =>
  /^[$A-Z_a-z][$\w-]*$/.test(propName);

export default (
  name: string,
  hasValue: boolean,
  value: any,
  hasDefaultValue: boolean,
  defaultValue: any,
  inline: boolean,
  lvl: number,
  options: Options
): {
  attributeFormattedInline: string,
  attributeFormattedMultiline: string,
  isMultilineAttribute: boolean,
} => {
  if (!hasValue && !hasDefaultValue) {
    throw new Error(
      `The prop "${name}" has no value and no default: could not be formatted`
    );
  }

  const usedValue = hasValue ? value : defaultValue;

  const { useBooleanShorthandSyntax, tabStop } = options;
  const hasValidJSXPropName = isValidJSXPropName(name);
  const formattedPropValue = hasValidJSXPropName
    ? formatPropValue(usedValue, inline, lvl, options)
    : null;

  let attributeFormattedInline = ' ';
  let attributeFormattedMultiline = `\n${spacer(lvl + 1, tabStop)}`;
  let attributePayload = '';

  if (
    useBooleanShorthandSyntax &&
    formattedPropValue === '{false}' &&
    !hasDefaultValue
  ) {
    // If a boolean is false and not different from it's default, we do not render the attribute
    attributeFormattedInline = '';
    attributeFormattedMultiline = '';
  } else if (!hasValidJSXPropName) {
    const formattedObjectSpreadValue = `{...${formatComplexDataStructure(
      { [name]: usedValue },
      true,
      lvl,
      options
    )}}`;
    attributePayload = formattedObjectSpreadValue;
    attributeFormattedInline += formattedObjectSpreadValue;
    attributeFormattedMultiline += formattedObjectSpreadValue;
  } else if (useBooleanShorthandSyntax && formattedPropValue === '{true}') {
    attributePayload = `${name}`;
    attributeFormattedInline += `${name}`;
    attributeFormattedMultiline += `${name}`;
  } else {
    attributePayload = `${name}=${String(formattedPropValue)}`;
    attributeFormattedInline += `${name}=${String(formattedPropValue)}`;
    attributeFormattedMultiline += `${name}=${String(formattedPropValue)}`;
  }

  const isMultilineAttribute = attributePayload.includes('\n');

  return {
    attributeFormattedInline,
    attributeFormattedMultiline,
    isMultilineAttribute,
  };
};
