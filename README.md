# pinyin-tools

**pinyin-tools** is a small library for processing and validating pinyin. It includes utilities to convert between pinyin diacritics and numerical tones, remove tones, and validate pinyin input.

## Features

- Convert **pinyin diacritics** to **numerical tones**.
- Convert **numerical tones** back to **pinyin diacritics**.
- Remove **tone marks** from pinyin.
- Validate whether a string is **valid pinyin**.

---

## Installation

You can install **pinyin-tools** via **npm** or **yarn**:

```bash
npm install pinyin-tools
```

## Usage

This library was built mainly for ESM environments. If you need CommonJS support, feel free to clone the source code and compile the typescript.

### Importing in ESM

After installing, you can import functions like this:

```js
import {
  diacriticToNumber,
  numberToDiacritic,
  removeTone,
  isValidPinyin,
} from "pinyin-tools";
```

## Function Usages

The library provides 5 utilities:

1. `diacriticToNumber(input: string | string[]): string | string[]`
2. `numberToDiacritic(input: string | string[]): string | string[]`
3. `toCedictPinyin(input: string | string[]): string | string[]`
4. `removeTone(input: string | string[]): string | string[]`
5. `isValidPinyin(input: string | string[], options?: Options): boolean | boolean[]`

### diacriticToNumber

This function converts pinyin with diacritic tone marks into pinyin with a tone number appended. You can pass either a single string or an array of strings.

#### Notes:

- The function treats each input string as a single pinyin unit. This means that a string containing multiple pinyin words separated by spaces (e.g., `"nǐ hǎo"`) will not be converted correctly. Instead, pass an array like `["nǐ", "hǎo"]` for proper conversion.
- The function assumes that the input is valid pinyin, meaning:
  - It contains only one diacritic mark.
  - The diacritic mark is placed over the correct vowel. If the input is invalid, the output may be incorrect or unpredictable.
- To align with common practices, `ü` is converted to `v` in base syllables `"lü", "lüe", "nü", "nüe"`, along with their tonal variations (e.g. `ǘ -> v2`). However, it is worth noting that input such as `"nv̄"`, is not considered valid input and thus may not be converted correctly.
- All input is converted into lower case to ensure consistency.

### numberToDiacritic

This function performs the reverse operation of `diacriticToNumber`, converting pinyin with numerical tone notation back into pinyin with diacritic marks. You can pass either a single string or an array of strings.

#### Notes:

- As with `diacriticToNumber`, each input string is treated as a single pinyin unit, meaning it must include a trailing tone number (0-5) for conversion.
- Both 0 and 5 are treated as neutral tones, as the function uses a modulo-5 operation to determine tone placement. However, any number outside the 0-5 range will still be converted, potentially resulting in unexpected output.
- The function assumes the input follows valid pinyin conventions, meaning
  - The input must include a valid tone number.
  - The number must correspond to a correct pinyin syllable. If these conditions are not met, the conversion may not work as expected.
- Unlike `diacriticToNumber` both `v` and `ü` will be correctly recognized and converted. As an example, this means that `"lü2"` and `"lv2"` will both be transformed into `"lǘ"`.
- The function is also compatible with CC-EDICT syntax meaning input such as `u:` will be correctly recognised and converted into `ü`.
- All input is converted into lower case to ensure consistency.

### toCedictPinyin

This function converts "v" into "u:" to align with CC-EDICT syntax. You can pass either a single string or an array of strings.

#### Notes:

- This function expects the input to already be in numerical tone notation, and is recommended to be used AFTER calling `diacriticToNumber`.

### removeTone

This function removes tone marks and numerical tones from pinyin input, returning only the base syllables. You can pass either a single string or an array of strings.

#### Notes:

- As with `diacriticToNumber` and `numberToDiacritic`, each input string is treated as a single pinyin unit, containing either diacritic tone marks or numerical tones.
- The function assumes the input is valid pinyin, meaning:
  - If the input uses diacritic tone marks, there should be only one diacritic mark placed over the correct vowel.
  - If the input uses numerical tones, it must end with a tone number (0-5).
- The function relies on regex-based replacements, which may allow it to process certain unexpected inputs correctly. However, to ensure consistent and predictable results, it is recommended to verify the input before use.
- All input is converted into lower case to ensure consistency.

### isValidPinyin

This function checks whether a given input is valid pinyin, supporting only diacritic tone marks. It does not currently validate pinyin with numerical tones. You can pass either a single string or an array of strings.
The function also provides some customisation options.

| Option        | Type       | Default | Description                                                                                                           |
| ------------- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `allowUnused` | `boolean`  | `false` | Allows non-standard pinyin syllables to be considered valid. Useful if you need more flexibility in input validation. |
| `include`     | `string[]` | `[]`    | An array of additional syllables to be considered valid, even if they are not part of standard pinyin.                |
| `exclude`     | `string[]` | `[]`    | An array of syllables that should be treated as invalid, even if they are normally valid pinyin.                      |

#### Notes:

- The function currently does not support validation for pinyin with numerical tones. However, you may wish to define your own custom inclusion list.
- A pinyin is considered to be "valid" if the syllable and tonal variation maps to a known Chinese character. You may wish to consult an online pinyin chart to determine which syllables are considered valid. What this means is that whilst the syllable `"te"` is valid, for example, `"tē", "té", "tě"` are NOT valid unless the `allowUnused` option is set to true, as they do not map to any Chinese characters (dialects are not accounted for and only official pronouciations are considered). Furthermore, syllables such as `"giao", "qa", "qo"` are also considered invalid even if their initials and finals are individually valid.
- The `allowUnused` option permits tonal variations of a pinyin syllable only if they have valid character mappings, meaning not all tones for a given syllable will necessarily be allowed—only those with actual character representations. As an example, `"tē", "té", "tě"` are all considered valid with `allowUnused` set to `true`, but `"giao", "qa", "qo"` are still considered invalid as they were never valid syllables to begin with.
- Some lesser used pinyin such as `"biáng", "nià"` (see https://en.wikipedia.org/wiki/Biangbiang_noodles, https://www.sohu.com/a/668608723_121665426) are also considered invalid due to their absence from standard pinyin charts. If you wish to include such instances, you may use the `include` option to do so.
- Input is first checked against a users custom inclusions and exclusions, before then being normalized to lower case and checked against a set of valid pinyin.

### Example Usage:

```js
import {
  diacriticToNumber,
  numberToDiacritic,
  removeTone,
  isValidPinyin,
} from "pinyin-tools";

console.log(diacriticToNumber("mā")); // Output: "ma1"
console.log(diacriticToNumber("nǐ")); // Output: "ni3"
console.log(diacriticToNumber("hǎo")); // Output: "hao3"
console.log(diacriticToNumber("lǜ")); // Output: "lv4" (ü → v)
console.log(diacriticToNumber("XIāNG")); // Output: "xiang1" (all lowercase)

console.log(numberToDiacritic("ma1")); // Output: "mā"
console.log(numberToDiacritic("ni3")); // Output: "nǐ"
console.log(numberToDiacritic("hao3")); // Output: "hǎo"
console.log(numberToDiacritic("lv4")); // Output: "lǜ" (v → ü)
console.log(numberToDiacritic("GAN4")); // Output: "gàn"
console.log(numberToDiacritic(["MING2", "TIAN1"])); // Output: ["míng", "tiān"]

console.log(removeTone("mā")); // Output: "ma"
console.log(removeTone("nǐ")); // Output: "ni"
console.log(removeTone("hǎo")); // Output: "hao"
console.log(removeTone("lǜ")); // Output: "lv" (ü → v)
console.log(removeTone("shàng")); // Output: "shang"

console.log(isValidPinyin("shàng")); // Output: true
console.log(isValidPinyin("BǍI")); // Output: true
console.log(isValidPinyin("pǔtōng")); // Output: false (each string treated as a single pinyin unit)
console.log(isValidPinyin(["tē", "té", "tě", "tè"])); // Output: [false, false, false, true]
console.log(isValidPinyin(["tē", "té", "tě", "tè"], { allowUnused: true })); // Output: [true, true, true, true]
console.log(
  isValidPinyin(["tē", "té", "tě", "tè"], {
    allowUnused: true,
    exclude: ["tè"],
  })
); // Output: [true, true, true, false] (exclusion list takes priority)
console.log(isValidPinyin("Hi person", { include: ["Hi person"] })); // Output: true
```
