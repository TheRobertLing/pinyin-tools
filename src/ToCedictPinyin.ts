/**
 * Converts standard pinyin notation into CC-CEDICT style.
 * Specifically, replaces `ü` or `v` with `u:`. This function is best used after DiacriticToNumber()
 *
 * @param input A pinyin string or an array of pinyin strings with tone numbers. Each
 * string is treated entirely as a pinyin (i.e. no whitespace-separated syllables).
 * The pinyin syllable is assumed to be valid.
 * @returns A single pinyin syllable or list of pinyin syllables in CC-EDICT style notation.
 *
 * @example
 * toCedictPinyin("nǚ3") // Returns "nu:3"
 * toCedictPinyin(["lüe4", "lv3"]) // Returns ["lu:e4", "lu:3"]
 */
function toCedictPinyin(input: string): string;
function toCedictPinyin(input: string[]): string[];
function toCedictPinyin(input: string | string[]): string | string[] {
  const inputArray: string[] = Array.isArray(input) ? input : [input];

  const results: string[] = inputArray.map((pinyin) => {
    pinyin = pinyin.toLowerCase();
    return pinyin.replace(/ü/g, "u:").replace(/v/g, "u:");
  });

  return Array.isArray(input) ? results : results[0];
}

export { toCedictPinyin };
