const tonePlacements: Record<string, string[]> = {
  a: ["a", "ā", "á", "ǎ", "à"],
  e: ["e", "ē", "é", "ě", "è"],
  ê: ["ê", "ê̄", "ế", "ê̌", "ề"],
  i: ["i", "ī", "í", "ǐ", "ì"],
  o: ["o", "ō", "ó", "ǒ", "ò"],
  u: ["u", "ū", "ú", "ǔ", "ù"],
  ü: ["ü", "ǖ", "ǘ", "ǚ", "ǜ"],
};

const vowels = ["a", "e", "i", "o", "u", "ü"];

function extractNumber(str: string): string {
  const match = str.match(/\d+$/);
  return match ? match[0] : "";
}

/**
 * Converts pinyin in numerical tone notation to diacritic notation.
 *
 * Notes:
 * - For the sake of consistency, all input is normalized to lower case.
 * - The function makes use of the modulus operation (mod 5) so both 0 and 5 work to represent the neutral tone.
 * - Invalid pinyin syllables may yield unpredictable results
 *
 * @param input A pinyin string or an array of pinyin strings with tone numbers. Each
 * string is treated entirely as a pinyin (i.e no pinyin separated by whitespaces in a single string).
 * The pinyin syllable is assumed to be valid.
 * @returns A single pinyin syllable or list of pinyin syllables in diacritic notation.
 *
 * @example
 * numberToDiacritic("ni3"); // Returns "nǐ"
 * numberToDiacritic(["ni3", "GaN4", "ma2"]) // Returns ["nǐ", "gàn", "má"]
 * numberToDiacritic(["ma0", "ma5"]) // Returns ["ma", "ma"]
 */
function numberToDiacritic(input: string): string;
function numberToDiacritic(input: string[]): string[];
function numberToDiacritic(input: string | string[]): string | string[] {
  const inputArray: string[] = Array.isArray(input) ? input : [input];
  const results: string[] = inputArray.map((pinyin) => {
    pinyin = pinyin.toLowerCase();

    const tone: string = extractNumber(pinyin);
    if (!tone) {
      return pinyin.replace("v", "ü"); // No tone number
    }

    const toneNum: number = Number(tone) % 5;
    let basePinyin = pinyin.replace(/\d+$/, "").replace("v", "ü");

    // Algorithm: https://en.wikipedia.org/wiki/Pinyin
    let vowelToReplace: string | null = null;
    if (basePinyin.includes("a")) {
      vowelToReplace = "a";
    } else if (basePinyin.includes("e")) {
      vowelToReplace = "e";
    } else if (basePinyin.includes("ou")) {
      vowelToReplace = "o";
    } else {
      // Find the last vowel in the string
      for (let i = basePinyin.length - 1; i >= 0; i--) {
        if (vowels.includes(basePinyin[i])) {
          vowelToReplace = basePinyin[i];
          break;
        }
      }
    }

    // Replace vowel with diacritic letter
    if (vowelToReplace) {
      basePinyin = basePinyin.replace(
        vowelToReplace,
        tonePlacements[vowelToReplace][toneNum]
      );
    }

    return basePinyin;
  });

  return Array.isArray(input) ? results : results[0];
}

export { numberToDiacritic }
