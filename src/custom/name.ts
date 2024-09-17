import { random } from "../basic";
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

function getLength(reservedChars: number, length: RandexLength | undefined, defaultLength: RandexLength): RandexLength {
  let result = defaultLength;
  if (typeof length === "number" && length > reservedChars) {
    result = length - reservedChars;
  } else if (Array.isArray(length)) {
    const [min, max] = length;
    const dMin = min - reservedChars;
    const dMax = max - reservedChars;
    if (dMin >= 0 && dMax >= 0) {
      if (dMin < dMax) {
        return [dMin, dMax];
      } else if (dMin === dMax) {
        return dMin;
      }
    }
  }

  return result;
}

export function randomName(options?: RandexNameOptions) {
  const { length, alphabet = "english" } = options || {};
  const currentLength = getLength(1, length, [1, 9]);
  return random([alphabet, "u"], [[alphabet, "l"], currentLength]);
}

export function randomFullName(options?: RandexFullNameOptions) {
  const { firstLength, secondLength, alphabet } = options || {};
  return randomName({ length: firstLength, alphabet }) + " " + randomName({ length: secondLength, alphabet });
}
