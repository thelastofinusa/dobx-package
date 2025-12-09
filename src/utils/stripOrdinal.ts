/**
 * Removes ordinal suffixes like 1st → 1, 2nd → 2, etc.
 */
export function stripOrdinal(input: string): string {
  return input.replace(/\b(\d+)(st|nd|rd|th)\b/gi, "$1");
}
