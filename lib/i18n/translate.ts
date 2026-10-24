export type Messages = Record<string, string>;
export function messageKey(text: string) {
  return text.replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim();
}
export function translate(messages: Messages, text: string): string {
  const key = messageKey(text);
  if (Object.prototype.hasOwnProperty.call(messages, key)) return messages[key];
  // Templates contain only named values (dates and the visitor's first name).
  for (const [source, target] of Object.entries(messages)) {
    if (!source.includes("{value}")) continue;
    const [before, after] = source.split("{value}");
    if (key.startsWith(before) && key.endsWith(after) && key.length >= before.length + after.length) {
      const value = key.slice(before.length, after ? -after.length : undefined);
      return target.replace("{value}", translate(messages, value));
    }
  }
  return text;
}
