export const INLINE_PATTERN = /\*\*([\s\S]+?)\*\*|\{\{(\w+):([\s\S]+?)\}\}/g;

export function stripMarkup(text: string): string {
  let result = text;
  let previous;
  do {
    previous = result;
    result = result.replace(INLINE_PATTERN, (_match, bold, _color, colored) => bold ?? colored);
  } while (result !== previous);
  return result;
}
