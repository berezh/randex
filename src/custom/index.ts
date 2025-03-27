import { RandexLength } from "../interfaces";
import { randexBool } from "./bool";
import { randexEmail } from "./email";
import { randexFileName } from "./filename";
import { randexFullName } from "./fullname";
import { randexNumber } from "./number";
import { randexRandom } from "./random";
import { randexSingleName } from "./singleName";
import { randexUsername } from "./username";
import { randexWord } from "./word";

export class Randex {
  public static random = randexRandom;

  public static arrayItem<T>(array: T[]): T;

  public static arrayItem<T>(array: T[], defaultValue: T): T;

  public static arrayItem<T>(array: T[], defaultValue?: T) {
    if (array?.length) {
      const arrayCount = array.length - 1;
      const index = Randex.number(0, arrayCount);
      return array[index];
    } else if (defaultValue) {
      return defaultValue;
    } else {
      throw "Array is empty";
    }
  }

  public static array<T>(array: T[], count: number): T[] {
    const result: T[] = [];

    const maxCount = array.length;

    const uniqueArray: T[] = [];
    for (let i = 0; i < array.length; i++) {
      uniqueArray.push(array[i]);
    }

    for (let i = 0; i < count && i < maxCount; i++) {
      const arrayCount = uniqueArray.length - 1;
      const index = Randex.number(arrayCount);
      const value = uniqueArray[index];
      result.push(value);
      uniqueArray.splice(index, 1);
    }

    return result;
  }

  public static bool = randexBool;

  public static email = randexEmail;

  public static fileName = randexFileName;

  public static fullName = randexFullName;

  public static singleName = randexSingleName;

  public static word = randexWord;

  public static numberArray(length: RandexLength, count: number): number[] {
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
      const index = Randex.number(arrayCount);

      const value = numberArray[index];
      result.push(value);
      numberArray.splice(index, 1);
    }

    return result;
  }

  public static number = randexNumber;

  public static username = randexUsername;

  public static many(count: number) {
    return {
      word: {},
    };
  }
}
