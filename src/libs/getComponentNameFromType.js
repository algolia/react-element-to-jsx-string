/**
 * Reference from https://github.com/facebook/react/blob/28625c6f45423e6edc5ca0e2932281769c0d431e/packages/shared/getComponentNameFromType.js
 *
 * @flow
 */

import type { Context } from 'react';
import { Fragment } from 'react';
import {
  ContextConsumer,
  ContextProvider,
  ForwardRef,
  Portal,
  Memo,
  Profiler,
  StrictMode,
  Suspense,
  SuspenseList,
  Lazy,
} from 'react-is';

/**
 * didn't export the type in React
 * same as https://github.com/facebook/react/blob/310187264d01a31bc3079358f13662d31a079d9e/packages/react/index.js
 */
type LazyComponent<T, P> = {
  $$typeof: Symbol | number,
  _payload: P,
  _init: (payload: P) => T,
};

// Keep in sync with react-reconciler/getComponentNameFromFiber
function getWrappedName(
  outerType: mixed,
  innerType: any,
  wrapperName: string
): string {
  const displayName = (outerType: any).displayName;
  if (displayName) {
    return displayName;
  }
  const functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName;
}

// Keep in sync with react-reconciler/getComponentNameFromFiber
function getContextName(type: Context<any>) {
  return type.displayName || 'Context';
}

// Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
// eslint-disable-next-line complexity
function getComponentNameFromType(type: mixed): string | null {
  if (type === null || type === undefined) {
    // Host root, text node or just invalid type.
    return null;
  }
  if (typeof type === 'function') {
    return (type: any).displayName || type.name || null;
  }
  if (typeof type === 'string') {
    return type;
  }
  // eslint-disable-next-line default-case
  switch (type) {
    case Fragment:
      return 'Fragment';
    case Portal:
      return 'Portal';
    case Profiler:
      return 'Profiler';
    case StrictMode:
      return 'StrictMode';
    case Suspense:
      return 'Suspense';
    case SuspenseList:
      return 'SuspenseList';
    // case REACT_CACHE_TYPE:
    //   return 'Cache';
  }
  if (typeof type === 'object') {
    // eslint-disable-next-line default-case
    switch (type.$$typeof) {
      case ContextConsumer: {
        /**
         * in DEV, should get context from `_context`.
         * https://github.com/facebook/react/blob/e16d61c3000e2de6217d06b9afad162e883f73c4/packages/react/src/ReactContext.js#L44-L125
         */
        const context: any = type._context ?? type;
        return `${getContextName(context)}.Consumer`;
      }
      case ContextProvider: {
        const context: any = type._context;
        return `${getContextName(context)}.Provider`;
      }
      case ForwardRef:
        // eslint-disable-next-line no-case-declarations
        return getWrappedName(type, type.render, 'ForwardRef');
      case Memo: {
        const outerName = (type: any).displayName || null;
        if (outerName !== null) {
          return outerName;
        }
        return getComponentNameFromType(type.type) || 'Memo';
      }
      case Lazy: {
        const lazyComponent: LazyComponent<any, any> = (type: any);
        const payload = lazyComponent._payload;
        const init = lazyComponent._init;
        try {
          return getComponentNameFromType(init(payload));
        } catch (x) {
          return null;
        }
      }
    }
  }
  return null;
}

export default getComponentNameFromType;
