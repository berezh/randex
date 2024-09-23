import { randomNumber } from "./number";

export function randomArray<T>(array: T[], count: number): T[] {
  const result: T[] = [];

  const maxCount = array.length;

  const uniqueArray: T[] = [];
  for (let i = 0; i < array.length; i++) {
    uniqueArray.push(array[i]);
  }

  for (let i = 0; i < count && i < maxCount; i++) {
    const arrayCount = uniqueArray.length - 1;
    const index = randomNumber(arrayCount);
    const value = uniqueArray[index];
    result.push(value);
    uniqueArray.splice(index, 1);
  }

  return result;
}
