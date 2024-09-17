import { random } from "../basic";
import { RandexSetUtil } from "../basic/set";
import { RandexAlphabet, RandexLength } from "../interfaces";

export interface RandexNameOptions {
  length?: RandexLength;
  alphabet?: RandexAlphabet;
}

export interface RandexFullNameOptions {
  firstLength?: RandexLength;
  secondLength?: RandexLength;
  alphabet?: RandexAlphabet;
}

export function randomName(options?: RandexNameOptions) {
  const { length, alphabet = "english" } = options || {};
  const currentLength = RandexSetUtil.getLength(1, length, [1, 9]);
  return random([alphabet, "u"], [[alphabet, "l"], currentLength]);
}

export function randomFullName(options?: RandexFullNameOptions) {
  const { firstLength, secondLength, alphabet } = options || {};
  return randomName({ length: firstLength, alphabet }) + " " + randomName({ length: secondLength, alphabet });
}
