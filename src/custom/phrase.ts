import { DEFAULT_PHRASE_RANGE } from "../basic/const";
import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexAlphabet, RandexNumberRange, RandexPhraseOptions } from "../interfaces";
import { randexManyWord } from "./word";

export function randexPhrase(options?: RandexPhraseOptions): string;

export function randexPhrase(words: RandexNumberRange): string;

export function randexPhrase(alphabet?: RandexAlphabet): string;

export function randexPhrase(alphabet: RandexAlphabet, words: RandexNumberRange): string;

export function randexPhrase(p1?: any, p2?: any): string {
  let length: RandexNumberRange = DEFAULT_PHRASE_RANGE;
  let alphabet: RandexAlphabet = "english";

  if (RandexTypeParser.isLength(p1)) {
    length = p1;
  } else if (RandexTypeParser.inAlphabet(p1)) {
    alphabet = p1;
    if (RandexTypeParser.isLength(p2)) {
      length = p2;
    }
  } else if (typeof p1 === "object") {
    const options = p1 as RandexPhraseOptions;
    if (options.alphabet) {
      alphabet = options.alphabet;
    }
    if (options.words) {
      length = options.words;
    }
  }

  const words = randexManyWord(length)(alphabet);

  return words.join(" ");
}

export function randexManyPhrase(count: RandexNumberRange) {
  function many(options?: RandexPhraseOptions): string[];

  function many(words: RandexNumberRange): string[];

  function many(alphabet?: RandexAlphabet): string[];

  function many(alphabet: RandexAlphabet, words: RandexNumberRange): string[];

  function many(p1?: any, p2?: any): string[] {
    return RandexSetUtil.many(count, () => randexPhrase(p1, p2));
  }

  return many;
}
