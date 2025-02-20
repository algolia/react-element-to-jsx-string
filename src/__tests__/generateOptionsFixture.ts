import { type Options, defaultOptions } from "../options";

export function generateOptionsFixture(
  fixtureOptions: Partial<Options>,
): Options {
  return {
    ...defaultOptions,
    ...fixtureOptions,
  };
}
