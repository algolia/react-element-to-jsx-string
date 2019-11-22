declare module 'react-element-to-jsx-string' {
  import { ReactNode } from 'react';

  interface ReactElementToJSXStringOptions {
    displayName?: (element: ReactNode) => string;
    filterProps?: string[];
    showDefaultProps?: boolean;
    showFunctions?: boolean;
    functionValue?: (fn: any) => any;
    tabStop?: number;
    useBooleanShorthandSyntax?: boolean;
    maxInlineAttributesLineLength?: number;
    sortProps?: boolean;
    useFragmentShortSyntax?: boolean;
  }

  const reactElementToJSXString: (element: ReactNode, options?: ReactElementToJSXStringOptions) => string;
  export = reactElementToJSXString;
}
