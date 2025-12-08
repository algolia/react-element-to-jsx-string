/* @flow */

import { ForwardRef, Memo } from 'react-is';
import getFunctionTypeName from './getFunctionTypeName';

const getWrappedComponentDisplayName = (Component: *): string => {
  switch (true) {
    case Boolean(Component.displayName):
      return Component.displayName;
    case Component.$$typeof === Memo:
      return getWrappedComponentDisplayName(Component.type);
    case Component.$$typeof === ForwardRef:
      return getWrappedComponentDisplayName(Component.render);
    default:
      return getFunctionTypeName(Component);
  }
};

export default getWrappedComponentDisplayName;
