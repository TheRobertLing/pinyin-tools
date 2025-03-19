const toneMap: Record<string, string> = {
  ā: "a",
  á: "a",
  ǎ: "a",
  à: "a",
  ē: "e",
  é: "e",
  ě: "e",
  è: "e",
  ê̄: "e",
  ế: "e",
  ê̌: "e",
  ề: "e",
  ī: "i",
  í: "i",
  ǐ: "i",
  ì: "i",
  ō: "o",
  ó: "o",
  ǒ: "o",
  ò: "o",
  ū: "u",
  ú: "u",
  ǔ: "u",
  ù: "u",
  ü: "v",
  ǖ: "v",
  ǘ: "v",
  ǚ: "v",
  ǜ: "v",
};

const regexPattern: RegExp = new RegExp(Object.keys(toneMap).join("|"), "g");

/**
 * Removes diacritic tone marks from pinyin syllables.
 *
 * Notes:
 * - For the sake of consistency, all input is normalized to lower case.
 * - Invalid pinyin syllables may yield unpredictable results
 * - Does not remove any tone numbers, and is only used for specifically
 * pinyin in diacritic notation
 * - To align with common pinyin typing practises, the following pinyin
 * syllables containing ü will be converted into v:
 * nü, lü, nüe, lüe -> nv, lv, nve, lve
 *
 *
 * @param input A pinyin string or an array of pinyin strings with tone numbers. Each
 * string is treated entirely as a pinyin (i.e no pinyin separated by whitespaces in a single string).
 * The pinyin syllable is assumed to be valid.
 * @returns A single pinyin syllable or list of pinyin syllables with tones removed.
 *
 * @example
 * removeTone("mǎ"); // Returns "ma"
 * removeTone(["nǐ", "hǎo"]); // Returns ["ni", "hao"]
 * removeTone("huaì"); // Invalid input, diacritic mark in the wrong place
 * removeTone("huai"); // Returns "huai", syllable unchanged
 * removeTone("hữai"); // Invalid diacritic mark
 */
function removeTone(input: string): string;
function removeTone(input: string[]): string[];
function removeTone(input: string | string[]): string | string[] {
  const convert = (str: string) => {
    str = str.toLowerCase();
    str = str.replace(regexPattern, (match) => toneMap[match]);
    return str.replace(/\d+/g, "");
  };

  const inputArray: string[] = Array.isArray(input) ? input : [input];
  const results = inputArray.map(convert);

  return Array.isArray(input) ? results : results[0];
}

export { removeTone };
