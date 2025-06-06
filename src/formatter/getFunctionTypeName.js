/* @flow */

const getFunctionTypeName = (functionType: Function): string => {
  if (!functionType.name || functionType.name === '_default') {
    return 'Component';
  }
  return functionType.name;
};

export default getFunctionTypeName;
