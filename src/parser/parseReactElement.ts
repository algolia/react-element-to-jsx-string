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

type ElementProps = Record<string, unknown> & { children?: ReactNode };

// What `element.type` can be at runtime: a function or class component, or a
// memo, forwardRef or context object wrapping one.
type ComponentLike = {
  name?: string;
  displayName?: string;
  defaultProps?: Record<string, unknown>;
  $$typeof?: symbol;
  type?: ComponentLike; // memo
  render?: ComponentLike; // forwardRef
  _context?: ComponentLike; // context consumer
};

const getComponent = (element: ReactElement): ComponentLike =>
  typeof element.type === "string" ? {} : (element.type as ComponentLike);

const getFunctionTypeName = (functionType: ComponentLike): string => {
  if (!functionType.name || functionType.name === "_default") {
    return "No Display Name";
  }

  return functionType.name;
};

const getWrappedComponentDisplayName = (Component: ComponentLike): string => {
  if (Component.displayName) {
    return Component.displayName;
  }

  switch (true) {
    case Component.$$typeof === Memo && Component.type !== undefined:
      return getWrappedComponentDisplayName(Component.type);

    case Component.$$typeof === ForwardRef && Component.render !== undefined:
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
      return (
        getComponent(element).displayName ||
        getFunctionTypeName(getComponent(element))
      );

    case isForwardRef(element):
    case isMemo(element):
      return getWrappedComponentDisplayName(getComponent(element));

    case isContextConsumer(element):
      return `${getComponent(element)._context?.displayName || "Context"}.Consumer`;

    case isContextProvider(element):
      return `${getComponent(element).displayName || "Context"}.Provider`;
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
  cb: (propsValue: unknown, propsName: string) => boolean,
): Record<string, unknown> => {
  const filteredProps: Record<string, unknown> = {};
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

  if (!isValidElement<ElementProps>(element)) {
    throw new Error(
      `react-element-to-jsx-string: Expected a React.Element, got \`${typeof element}\``,
    );
  }

  const displayName = displayNameFn(element);
  const props = filterProps(element.props, noChildren);

  const key = element.key;

  if (typeof key === "string" && key.search(/^\./)) {
    // React automatically add key=".X" when there are some children
    props.key = key;
  }

  const defaultProps = filterProps(
    getComponent(element).defaultProps || {},
    noChildren,
  );
  const children = Children.toArray(element.props.children)
    .filter(onlyMeaningfulChildren)
    .map((oneChild) => parseReactElement(oneChild, options));

  if (supportFragment && element.type === Fragment) {
    return createReactFragmentTreeNode(key, children);
  }

  return createReactElementTreeNode(displayName, props, defaultProps, children);
};

export default parseReactElement;
