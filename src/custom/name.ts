import { random } from "../basic";
import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexAlphabet, RandexLength } from "../interfaces";

export interface RandexNameOptions {
  alphabet?: RandexAlphabet;
  length?: RandexLength;
}

export function randomName(options?: RandexNameOptions);
export function randomName(length: RandexLength);
export function randomName(alphabet?: RandexAlphabet);
export function randomName(alphabet: RandexAlphabet, length: RandexLength);
export function randomName(p1?: any, p2?: any) {
  let length: RandexLength = 0;
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
  return random([alphabet, "u"], [[alphabet, "l"], currentLength]);
}
