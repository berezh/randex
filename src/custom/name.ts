import { random } from "../basic";
import { RandomLength } from "../interfaces";

export interface RandomNameOptions {
  length: RandomLength;
}

function getLength(reservedChars: number, length: RandomLength | undefined, defaultLength: RandomLength): RandomLength {
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

export function randomName(options?: RandomNameOptions) {
  const { length } = options || {};
  const currentLength = getLength(1, length, [1, 9]);
  return random("alphabetUpper", ["alphabetLower", currentLength]);
}

export function randomFullName() {
  return randomName() + " " + randomName();
}
