const toneMap: Record<string, string> = {
  // Lowercase letters
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
  ǖ: "v",
  ǘ: "v",
  ǚ: "v",
  ǜ: "v",

  // Uppercase letters
  Ā: "A",
  Á: "A",
  Ǎ: "A",
  À: "A",
  Ē: "E",
  É: "E",
  Ě: "E",
  È: "E",
  Ê̄: "E",
  Ế: "E",
  Ê̌: "E",
  Ề: "E",
  Ī: "I",
  Í: "I",
  Ǐ: "I",
  Ì: "I",
  Ō: "O",
  Ó: "O",
  Ǒ: "O",
  Ò: "O",
  Ū: "U",
  Ú: "U",
  Ǔ: "U",
  Ù: "U",
  Ǖ: "V",
  Ǘ: "V",
  Ǚ: "V",
  Ǜ: "V",
};

const tonesChars: string = Object.keys(toneMap).join("|");
const regexPattern: RegExp = new RegExp(tonesChars, "g");

/**
 * Removes diacritic tone marks from Pinyin syllables.
 *
 * This function takes a Pinyin string (or an array of Pinyin strings) with diacritic tone marks
 * and returns the same Pinyin syllables without the tone marks.
 *
 * Note: The function assumes the input is a **valid Pinyin syllable** that contains a diacritic tone mark
 * in the correct place. If the input is NOT valid, the behaviour of this function cannot be guaranteed. In the
 * case that a pinyin syllable provided has a neutral tone or no diacritic mark, no changes are made.
 *
 *
 * @param input - A valid Pinyin string or an array of valid Pinyin strings with diacritic tone marks.
 * @returns The input Pinyin with tone marks removed, preserving the original structure.
 *
 * @example
 * removeTone("mǎ"); // Returns "ma"
 * removeTone(["nǐ", "hǎo"]); // Returns ["ni", "hao"]
 * removeTone("huaì"); // Invalid input, diacritic mark in the wrong place
 * removeTone("huai"); // Returns "huai", syllable unchanged
 * removeTone("hữai"); // Invalid diacritic mark
 */
const removeTone = (input: string | string[]): string | string[] => {
  const convert = (str: string) =>
    str.replace(regexPattern, (match) => toneMap[match]);

  if (typeof input === "string") {
    return convert(input);
  } else if (Array.isArray(input)) {
    return input.map(convert);
  }

  throw new Error("Invalid input: Expected a string or an array of strings.");
};

export { removeTone }
