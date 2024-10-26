import { randomNumber } from "./number";

export function randomArrayItem<T>(array: T[]): T;
export function randomArrayItem<T>(array: T[], defaultValue: T): T;
export function randomArrayItem<T>(array: T[], defaultValue?: T) {
  if (array?.length) {
    const arrayCount = array.length - 1;
    const index = randomNumber(0, arrayCount);
    return array[index];
  } else if (defaultValue) {
    return defaultValue;
  } else {
    throw "Array is empty";
  }
}
