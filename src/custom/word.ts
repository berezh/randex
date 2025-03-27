import { RandexTypeParser } from "../basic/type";
import { RandexAlphabet, RandexLength, RandexWordOptions } from "../interfaces";
import { randexRandom } from "./random";

export function randexWord(options?: RandexWordOptions): string;

export function randexWord(length: RandexLength): string;

export function randexWord(alphabet?: RandexAlphabet): string;

export function randexWord(alphabet: RandexAlphabet, length: RandexLength): string;

export function randexWord(p1?: any, p2?: any): string {
  let length: RandexLength = [2, 10];
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
