import {
  Children,
  Fragment,
  type ReactElement,
  type ReactNode,
  isValidElement,
} from "react";
import {
  ForwardRef,
  Memo,
  isContextConsumer,
  isContextProvider,
  isForwardRef,
  isLazy,
  isMemo,
  isProfiler,
  isStrictMode,
  isSuspense,
} from "react-is";
import type { Options } from "../options";
import {
  createNumberTreeNode,
  createReactElementTreeNode,
  createReactFragmentTreeNode,
  createStringTreeNode,
} from "../tree";
import type { TreeNode } from "../tree";

const supportFragment = Boolean(Fragment);

const getFunctionTypeName = (
  functionType: (...args: Array<any>) => any,
): string => {
  if (!functionType.name || functionType.name === "_default") {
    return "No Display Name";
  }

  return functionType.name;
};

const getWrappedComponentDisplayName = (Component: any): string => {
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

// heavily inspired by:
// https://github.com/facebook/react/blob/3746eaf985dd92f8aa5f5658941d07b6b855e9d9/packages/react-devtools-shared/src/backend/renderer.js#L399-L496
const getReactElementDisplayName = (element: ReactElement): string => {
  switch (true) {
    case typeof element.type === "string":
      return element.type;

    case typeof element.type === "function":
      // @ts-expect-error: flow to TS
      if (element.type.displayName) {
        // @ts-expect-error: flow to TS
        return element.type.displayName;
      }

      // @ts-expect-error: flow to TS
      return getFunctionTypeName(element.type);

    case isForwardRef(element):
    case isMemo(element):
      return getWrappedComponentDisplayName(element.type);

    case isContextConsumer(element):
      // @ts-expect-error: flow to TS
      return `${element.type._context.displayName || "Context"}.Consumer`;

    case isContextProvider(element):
      // @ts-expect-error: flow to TS
      return `${element.type.displayName || "Context"}.Provider`;
    case isLazy(element):
      return "Lazy";

    case isProfiler(element):
      return "Profiler";

    case isStrictMode(element):
      return "StrictMode";

    case isSuspense(element):
      return "Suspense";

    default:
      return "UnknownElementType";
  }
};

const noChildren = (propsValue: unknown, propName: string) =>
  propName !== "children";

const onlyMeaningfulChildren = (children: ReactNode): boolean =>
  children !== true &&
  children !== false &&
  children !== null &&
  children !== "";

const filterProps = (
  originalProps: Record<string, unknown>,
  cb: (propsValue: any, propsName: string) => boolean,
): Record<string, any> => {
  const filteredProps: Record<string, any> = {};
  Object.keys(originalProps)
    .filter((key) => cb(originalProps[key], key))
    .forEach((key) => {
      filteredProps[key] = originalProps[key];
    });
  return filteredProps;
};

const parseReactElement = (element: ReactNode, options: Options): TreeNode => {
  const { displayName: displayNameFn = getReactElementDisplayName } = options;

  if (typeof element === "string") {
    return createStringTreeNode(element);
  }

  if (typeof element === "number") {
    return createNumberTreeNode(element);
  }

  if (!isValidElement(element)) {
    throw new Error(
      `react-element-to-jsx-string: Expected a React.Element, got \`${typeof element}\``,
    );
  }

  const displayName = displayNameFn(element);
  // @ts-expect-error: flow to TS
  const props = filterProps(element.props, noChildren);

  const key = element.key;

  if (typeof key === "string" && key.search(/^\./)) {
    // React automatically add key=".X" when there are some children
    props.key = key;
  }

  // @ts-expect-error: flow to TS
  const defaultProps = filterProps(element.type.defaultProps || {}, noChildren);
  // @ts-expect-error: flow to TS
  const children = Children.toArray(element.props.children)
    .filter(onlyMeaningfulChildren)
    .map((oneChild) => parseReactElement(oneChild, options));

  if (supportFragment && element.type === Fragment) {
    return createReactFragmentTreeNode(key, children);
  }

  return createReactElementTreeNode(displayName, props, defaultProps, children);
};

export default parseReactElement;
