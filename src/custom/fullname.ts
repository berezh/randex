import { RandexTypeParser } from "../basic/type";
import { RandexAlphabet, RandexLength } from "../interfaces";
import { randomName } from "./name";

export interface RandexFullNameOptions {
  alphabet?: RandexAlphabet;
  firstLength?: RandexLength;
  secondLength?: RandexLength;
}

export function randomFullName(options?: RandexFullNameOptions);
export function randomFullName(length: RandexLength); //
export function randomFullName(alphabet?: RandexAlphabet);
export function randomFullName(alphabet: RandexAlphabet, length: RandexLength);
export function randomFullName(alphabet: RandexAlphabet, firstLength: RandexLength, secondLength: RandexLength);
export function randomFullName(p1?: any, p2?: any, p3?: any) {
  let firstLength: RandexLength = 0;
  let secondLength: RandexLength = 0;
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

  return randomName({ length: firstLength, alphabet }) + " " + randomName({ length: secondLength, alphabet });
}
