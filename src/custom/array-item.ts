import { randomNumber } from "./number";

export function randomArrayItem<T>(array: T[]): T {
  const arrayCount = array.length - 1;
  const index = randomNumber(0, arrayCount);
  return array[index];
}
