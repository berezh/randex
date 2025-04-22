import { RandexTypeParser } from "../basic/type";
import { RandexAlphabet, RandexFullNameOptions, RandexRange } from "../interfaces";
import { randexSingleName } from "./singleName";

export function randexFullName(options?: RandexFullNameOptions): string;

export function randexFullName(length: RandexRange): string;

export function randexFullName(alphabet?: RandexAlphabet): string;

export function randexFullName(alphabet: RandexAlphabet, length: RandexRange): string;

export function randexFullName(alphabet: RandexAlphabet, firstLength: RandexRange, secondLength: RandexRange): string;

export function randexFullName(p1?: any, p2?: any, p3?: any): string {
  let firstLength: RandexRange = 0;
  let secondLength: RandexRange = 0;
  let alphabet: RandexAlphabet = "english";

  if (RandexTypeParser.isLength(p1)) {
    firstLength = secondLength = p1;
  } else if (RandexTypeParser.inAlphabet(p1)) {
    alphabet = p1;
    if (RandexTypeParser.isLength(p2)) {
      firstLength = secondLength = p2;
    }
    if (RandexTypeParser.isLength(p3)) {
      secondLength = p3;
    }
  } else if (typeof p1 === "object") {
    if (p1.alphabet) {
      alphabet = p1.alphabet;
    }
    if (p1.firstLength) {
      firstLength = p1.firstLength;
    }
    if (p1.secondLength) {
      secondLength = p1.secondLength;
    }
  }

  return randexSingleName({ length: firstLength, alphabet }) + " " + randexSingleName({ length: secondLength, alphabet });
}
