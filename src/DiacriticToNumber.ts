import { removeTone } from "./RemoveTone.js";

const toneMap: Record<string, string> = {
  ā: "1",
  á: "2",
  ǎ: "3",
  à: "4",
  ē: "1",
  é: "2",
  ě: "3",
  è: "4",
  ê̄: "1",
  ế: "2",
  ê̌: "3",
  ề: "4",
  ī: "1",
  í: "2",
  ǐ: "3",
  ì: "4",
  ō: "1",
  ó: "2",
  ǒ: "3",
  ò: "4",
  ū: "1",
  ú: "2",
  ǔ: "3",
  ù: "4",
  ǖ: "1",
  ǘ: "2",
  ǚ: "3",
  ǜ: "4",
};

const regexPattern: RegExp = new RegExp(Object.keys(toneMap).join("|"), "g");

/**
 * Converts pinyin syllable with diacritic tone marks into numerical tone notation.
 *
 * Notes
 * - For the sake of consistency, all input is normalized to lower case.
 * - Invalid pinyin syllables or input may yield unpredictable results
 * - To align with common pinyin typing practises, the following pinyin
 * syllables containing ü will be converted into v:
 * nü, lü, nüe, lüe -> nv, lv, nve, lve
 *
 * @param input A pinyin string or an array of pinyin strings with diacritic tone marks. Each
 * string is treated entirely as a pinyin (i.e no pinyin separated by whitespaces in a single string).
 * The pinyin syllable is assumed to be valid.
 * @returns A single pinyin syllable or list of pinyin syllables with tone numbers.
 *
 * @example
 * diacriticToNumber("nǐ"); // Returns "ni3"
 * diacriticToNumber(["nǐ", "GàN", "Má"]); // Returns ["ni3", "gan4", "ma2"] (note the lower case)
 */
function diacriticToNumber(input: string): string;
function diacriticToNumber(input: string[]): string[];
function diacriticToNumber(input: string | string[]): string | string[] {
  const inputArray: string[] = Array.isArray(input) ? input : [input];

  const results: string[] = inputArray.map((pinyin) => {
    pinyin = pinyin.toLowerCase();

    const matches = pinyin.match(regexPattern);
    if (!matches) {
      return pinyin; // No diacritic, return original
    }

    // If there is more than 1 diacritic mark, just take first one
    const diacritic = toneMap[matches[0]];
    const pinyinWithoutTone = removeTone(pinyin);

    return `${pinyinWithoutTone}${diacritic}`;
  });

  return Array.isArray(input) ? results : results[0];
}

export { diacriticToNumber };
