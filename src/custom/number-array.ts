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

  let numberArray: number[] = [];
  for (let i = min; i < max; i++) {
    numberArray.push(i);
  }

  for (let i = 0; i < count; i++) {
    const arrayCount = numberArray.length;
    const value = randomNumber(arrayCount);
    result.push(value);
    const index = numberArray.findIndex(x => x === value);
    numberArray = numberArray.splice(index, 1);
  }

  return result;
}
