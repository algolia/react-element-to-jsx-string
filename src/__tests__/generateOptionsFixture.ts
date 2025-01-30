import { defaultOptions, type Options } from '../options';

export function generateOptionsFixture(
  fixtureOptions: Partial<Options>
): Options {
  return {
    ...defaultOptions,
    ...fixtureOptions,
  };
}
