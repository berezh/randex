import { DEFAULT_SENTENCE_RANGE } from "../basic/const";
import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexAlphabet, RandexNumberRange, RandexSentenceOptions } from "../interfaces";
import { randexManyWord } from "./word";

export function randexSentence(options?: RandexSentenceOptions): string;

export function randexSentence(length: RandexNumberRange): string;

export function randexSentence(alphabet?: RandexAlphabet): string;

export function randexSentence(alphabet: RandexAlphabet, length: RandexNumberRange): string;

export function randexSentence(p1?: any, p2?: any): string {
  let length: RandexNumberRange = DEFAULT_SENTENCE_RANGE;
  let alphabet: RandexAlphabet = "english";

  if (RandexTypeParser.isLength(p1)) {
    length = p1;
  } else if (RandexTypeParser.inAlphabet(p1)) {
    alphabet = p1;
    if (RandexTypeParser.isLength(p2)) {
      length = p2;
    }
  } else if (typeof p1 === "object") {
    const options = p1 as RandexSentenceOptions;
    if (options.alphabet) {
      alphabet = options.alphabet;
    }
    if (options.words) {
      length = options.words;
    }
  }

  const words = randexManyWord(length)(alphabet);

  return words
    .map((text, index) => {
      let wordText = text;
      if (index === 0 && text.length > 0) {
        wordText = text[0].toUpperCase() + text.slice(1);
      }
      if (index + 1 >= words.length) {
        wordText = wordText + ".";
      }

      return wordText;
    })
    .join(" ");
}

export function randexManySentence(count: RandexNumberRange) {
  function many(options?: RandexSentenceOptions): string[];

  function many(words: RandexNumberRange): string[];

  function many(alphabet?: RandexAlphabet): string[];

  function many(alphabet: RandexAlphabet, words: RandexNumberRange): string[];

  function many(p1?: any, p2?: any): string[] {
    return RandexSetUtil.many(count, () => randexSentence(p1, p2));
  }

  return many;
}
