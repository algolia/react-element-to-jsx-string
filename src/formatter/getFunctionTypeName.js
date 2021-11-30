/* @flow */

const getFunctionTypeName = (functionType): string => {
  if (!functionType.name || functionType.name === '_default') {
    return 'Component';
  }
  return functionType.name;
};

export default getFunctionTypeName;
