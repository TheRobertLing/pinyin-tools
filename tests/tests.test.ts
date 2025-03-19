import { describe, expect, test } from "vitest";
import {
  diacriticToNumber,
  numberToDiacritic,
  removeTone,
  isValidPinyin,
} from "../src/PinyinTools.js";

describe("diacriticToNumber", () => {
  test.each([
    ["nǐ", "ni3"],
    ["mā", "ma1"],
    ["má", "ma2"],
    ["mǎ", "ma3"],
    ["mà", "ma4"],
    ["lüè", "lve4"],
    ["nǚ", "nv3"],
    ["lǘ", "lv2"],
    ["wǒ", "wo3"],
    ["zhōng", "zhong1"],
    ["jiǎo", "jiao3"],
    ["tīng", "ting1"],
    ["yáng", "yang2"],
  ])("single pinyin input", (input, expected) => {
    expect(diacriticToNumber(input)).toBe(expected);
  });

  test.each([
    [
      ["nǚ", "nǜ", "lǘ", "lǚ", "lǜ", "lüě", "lüè"],
      ["nv3", "nv4", "lv2", "lv3", "lv4", "lve3", "lve4"],
    ],
  ])("test nü, lü, nüe, lüe combinations ", (input, expected) => {
    expect(diacriticToNumber(input)).toEqual(expected);
  });

  test.each([
    ["MÍNG", "ming2"],
    ["pÍng", "ping2"],
    ["Lǚ", "lv3"],
    ["huā", "hua1"],
    ["XĪ", "xi1"],
    ["JīN", "jin1"],
    ["shŪ", "shu1"],
    ["WÀI", "wai4"],
    ["QǍI", "qai3"],
    ["YÚN", "yun2"],
    ["zHǒu", "zhou3"],
    ["BĒI", "bei1"],
  ])("single pinyin input with mixed case", (input, expected) => {
    expect(diacriticToNumber(input)).toBe(expected);
  });

  test.each([
    [
      ["hǎo", "xiè", "zǎo"],
      ["hao3", "xie4", "zao3"],
    ],
    [
      ["Wǒ", "ài", "nǐ"],
      ["wo3", "ai4", "ni3"],
    ],
    [
      ["CHŪ", "QÙ", "huí"],
      ["chu1", "qu4", "hui2"],
    ],
    [
      ["Lǜ", "nǚ", "tóng"],
      ["lv4", "nv3", "tong2"],
    ],
    [
      ["shēng", "BĚN", "tài"],
      ["sheng1", "ben3", "tai4"],
    ],
    [
      ["zǒu", "CHÍ", "máng"],
      ["zou3", "chi2", "mang2"],
    ],
    [
      ["DǍ", "jiāo", "zhāo"],
      ["da3", "jiao1", "zhao1"],
    ],
    [
      ["XĪ", "lǐ", "yáng"],
      ["xi1", "li3", "yang2"],
    ],
  ])("array pinyin input conversion", (input, expected) => {
    expect(diacriticToNumber(input)).toEqual(expected);
  });
});

describe("numberToDiacritic tests", () => {
  test.each([
    ["ni3", "nǐ"],
    ["ma1", "mā"],
    ["ma2", "má"],
    ["ma3", "mǎ"],
    ["ma4", "mà"],
    ["ma5", "ma"],
    ["ma0", "ma"],
    ["lve4", "lüè"],
    ["wo3", "wǒ"],
    ["zhong1", "zhōng"],
    ["jiao3", "jiǎo"],
    ["nv3", "nǚ"],
    ["lv2", "lǘ"],
    ["tian1", "tiān"],
    ["guo4", "guò"],
    ["fei1", "fēi"],
    ["qian", "qian"],
    ["nv", "nü"],
    ["nü", "nü"],
    ["nü", "nü"],
    ["sou1", "sōu"],
  ])("basic tests", (input, expected) => {
    expect(numberToDiacritic(input)).toBe(expected);
  });

  test.each([
    [
      [
        "nv3",
        "nv4",
        "lv2",
        "lv3",
        "lv4",
        "lve3",
        "lve4",
        "nü3",
        "nü4",
        "lü2",
        "lü3",
        "lü4",
        "lüe3",
        "lüe4",
      ],
      [
        "nǚ",
        "nǜ",
        "lǘ",
        "lǚ",
        "lǜ",
        "lüě",
        "lüè",
        "nǚ",
        "nǜ",
        "lǘ",
        "lǚ",
        "lǜ",
        "lüě",
        "lüè",
      ],
    ],
  ])("test nü, lü, nüe, lüe combinations ", (input, expected) => {
    expect(numberToDiacritic(input)).toEqual(expected);
  });
});

describe("removeTone tests", () => {
  test.each([
    ["nǐ", "ni"],
    ["mā", "ma"],
    ["má", "ma"],
    ["mǎ", "ma"],
    ["mà", "ma"],
    ["lüè", "lve"],
    ["wǒ", "wo"],
    ["zhōng", "zhong"],
    ["jiǎo", "jiao"],
    ["nǚ", "nv"],
    ["lǘ", "lv"],
    ["tīng", "ting"],
  ])("single pinyin input", (input, expected) => {
    expect(removeTone(input)).toBe(expected);
  });

  test.each([
    [
      ["nǐ", "mā", "lüè"],
      ["ni", "ma", "lve"],
    ],
    [
      ["wǒ", "zhōng", "jiǎo"],
      ["wo", "zhong", "jiao"],
    ],
    [
      ["tí", "shū", "yún"],
      ["ti", "shu", "yun"],
    ],
  ])("test array of pinyin", (input, expected) => {
    expect(removeTone(input)).toEqual(expected);
  });

  test.each([
    ["Nǐ", "ni3"],
    ["tĀ", "ta1"],
    ["bá", "ba2"],
    ["mǎO", "mao3"],
    ["Mà", "ma4"],
    ["Lüè", "lve4"],
    ["wǑ", "wo3"],
    ["ZhoNG", "zhong"],
    ["JiǎO", "jiao3"],
  ])("unevenly capitalized pinyin", (input, expected) => {
    expect(diacriticToNumber(input)).toBe(expected);
  });

  test.each([
    [
      ["nǚ", "nǜ"],
      ["nv", "nv"],
    ],
    [
      ["lǘ", "lǚ", "lǜ"],
      ["lv", "lv", "lv"],
    ], // lü variations
    [["nüè"], ["nve"]], // nüe variations
    [
      ["lüě", "lüè"],
      ["lve", "lve"],
    ], // lüe variations
  ])("test nü, lü, nüe, lüe combinations", (input, expected) => {
    expect(removeTone(input)).toEqual(expected);
  });
});

describe("isValidPinyin tests", () => {
  test.each([
    ["gōng", true],
    ["chéng", true],
    ["hē", true],
    ["jiǔ", true],
    ["qù", true],
    ["yún", true],
    ["péng", true],
    ["huáng", true],
    ["xióng", true],
    ["fàn", true],
    ["zuǒ", true],
    ["lüè", true],
    ["nüe", true],
    ["BŌ", true],
    ["BǍI", true],
    ["bĒN", true],
  ])("basic tests pass", (input, expected) => {
    expect(isValidPinyin(input)).toBe(expected);
  });

  test.each([
    ["hànzì", false],
    ["pǔtōng", false],
    ["wo3", false],
    ["hao4", false],
    ["abc", false],
    ["bén", false],
    ["zái", false],
    ["hǎng", false],
    ["těi", false],
    ["lǖ", false],
    ["lüé", false],
    ["lüē", false],
    ["giao", false],
    ["qa", false],
    ["qo", false],
  ])("basic tests fail", (input, expected) => {
    expect(isValidPinyin(input)).toBe(expected);
  });

  test.each([
    ["bén", true],
    ["pǎ", true],
    ["béi", true],
    ["bán", true],
    ["biáo", true],
    ["bíng", true],
    ["bín", true],
    ["bián", true],
  ])("allow unused", (input, expected) => {
    expect(isValidPinyin(input)).not.toBe(expected);
    expect(isValidPinyin(input, { allowUnused: true })).toBe(expected);
  });

  test.each([
    ["ben1", true],
    ["chi2", true],
    ["ka3", true],
    ["hello world", true],
    ["biang", true],
  ])("allow custom characters", (input, expected) => {
    expect(
      isValidPinyin(input, {
        include: ["ben1", "chi2", "ka3", "hello world", "biang"],
      })
    ).toBe(expected);
  });

  test.each([
    ["sòng", false],
    ["ǎi", false],
    ["shōu", false],
  ])("disallow custom characters", (input, expected) => {
    expect(isValidPinyin(input)).not.toBe(expected);
    expect(isValidPinyin(input, { exclude: ["sòng", "ǎi", "shōu"] })).toBe(
      expected
    );
  });

  test.each([
    [
      ["nuǎn", "kuà", "lāo", "xiū", "kuǎng"],
      [true, true, true, true, true],
    ],
    [
      ["invalid", "hi", "pootis", "hun", "shuai"],
      [false, false, false, true, true],
    ],
    [
      ["cHuÀn", "cŌnG", "ShÉn"],
      [true, true, true],
    ],
    [
      [
        "nv",
        "nve",
        "lv",
        "lve",
        "lüě",
        "lüè",
        "lǘ",
        "lǚ",
        "lǜ",
        "nǚ",
        "nǜ",
        "nüè",
        "nü",
        "lü",
        "lüe",
        "nüe",
      ],
      [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
    ],
  ])("array input tests", (input, expected) => {
    expect(isValidPinyin(input)).toEqual(expected);
  });
});
