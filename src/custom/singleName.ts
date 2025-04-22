import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexAlphabet, RandexRange, RandexWordOptions } from "../interfaces";
import { randexRandom } from "./random";

export function randexSingleName(options?: RandexWordOptions): string;

export function randexSingleName(length: RandexRange): string;

export function randexSingleName(alphabet?: RandexAlphabet): string;

export function randexSingleName(alphabet: RandexAlphabet, length: RandexRange): string;

export function randexSingleName(p1?: any, p2?: any): string {
  let length: RandexRange = 0;
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

  const currentLength = RandexSetUtil.getLength(1, length, [1, 9]);
  return randexRandom([alphabet, "u"], [[alphabet, "l"], currentLength]);
}
