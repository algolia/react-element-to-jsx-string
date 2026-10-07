// Not run: only typechecked (`pnpm run typecheck`), to catch breaking changes
// in the public types. Covers usages that the 18.x `index.d.ts` accepted.

import type { ReactElement, ReactNode } from "react";

import reactElementToJSXString, {
  type Options,
  inlineFunction,
  preserveFunctionLineBreak,
} from "../index";

const options: Options = { tabStop: 4, sortProps: false };
reactElementToJSXString(null, options);
reactElementToJSXString(null);

reactElementToJSXString(null, {
  displayName: (element: ReactNode) => String(element),
});
reactElementToJSXString(null, {
  displayName: (element: ReactElement) => String(element.type),
});

reactElementToJSXString(null, { filterProps: ["key", "ref"] });
reactElementToJSXString(null, {
  filterProps: (value, key) => key !== "id" && value !== null,
});
reactElementToJSXString(null, {
  filterProps: (value: string) => value !== "",
});

reactElementToJSXString(null, { functionValue: inlineFunction });
reactElementToJSXString(null, { functionValue: preserveFunctionLineBreak });
reactElementToJSXString(null, { functionValue: (fn) => fn.name });
reactElementToJSXString(null, { functionValue: () => 42 });
