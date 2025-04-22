import { DEFAULT_WORD_RANGE } from "../basic/const";
import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexAlphabet, RandexRange, RandexWordOptions } from "../interfaces";
import { randexRandom } from "./random";

export function randexWord(options?: RandexWordOptions): string;

export function randexWord(length: RandexRange): string;

export function randexWord(alphabet?: RandexAlphabet): string;

export function randexWord(alphabet: RandexAlphabet, length: RandexRange): string;

export function randexWord(p1?: any, p2?: any): string {
  let length: RandexRange = DEFAULT_WORD_RANGE;
  let alphabet: RandexAlphabet = "english";
  if (RandexTypeParser.isLength(p1)) {
    length = p1;
  } else if (RandexTypeParser.inAlphabet(p1)) {
    alphabet = p1;
    if (RandexTypeParser.isLength(p2)) {
      length = p2;
    }
  } else if (typeof p1 === "object") {
    if (p1.alphabet) {
      alphabet = p1.alphabet;
    }
    if (p1.length) {
      length = p1.length;
    }
  }

  return randexRandom([[alphabet, "l"], length]);
}

export function randexManyWord(count: RandexRange) {
  function many(options?: RandexWordOptions): string[];

  function many(length: RandexRange): string[];

  function many(alphabet?: RandexAlphabet): string[];

  function many(alphabet: RandexAlphabet, length: RandexRange): string[];

  function many(p1?: any, p2?: any): string[] {
    return RandexSetUtil.many(count, () => randexWord(p1, p2));
  }

  return many;
}
