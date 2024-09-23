import { RandexLength } from "../interfaces";
import { randomNumber } from "./number";

export function randomNumberArray(length: RandexLength, count: number): number[] {
  let min = 0;
  let max = 0;
  const result: number[] = [];

  if (typeof length === "number") {
    max = length;
  } else {
    min = length[0];
    max = length[1];
  }

  const maxCount = max - min + 1;

  const numberArray: number[] = [];
  for (let i = min; i <= max; i++) {
    numberArray.push(i);
  }

  for (let i = 0; i < count && i < maxCount; i++) {
    const arrayCount = numberArray.length - 1;
    const index = randomNumber(arrayCount);

    const value = numberArray[index];
    result.push(value);
    numberArray.splice(index, 1);
  }

  return result;
}
