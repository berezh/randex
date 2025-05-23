import { RandexNumberRange } from "../interfaces";
import { randexBool } from "./bool";
import { randexEmail } from "./email";
import { randexFileName } from "./filenameX";
import { randexFullName } from "./fullnameX";
import { randexManyNumber, randexNumber } from "./number";
import { randexManyPhrase, randexPhrase } from "./phrase";
import { randexRandom } from "./random";
import { randexManySentence, randexSentence } from "./sentence";
import { randexSingleName } from "./singleName";
import { randexUsername } from "./username";
import { randexManyWord, randexWord } from "./word";

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

  public static number = randexNumber;

  public static username = randexUsername;

  public static word = randexWord;

  public static sentence = randexSentence;

  public static phrase = randexPhrase;

  public static many(count: RandexNumberRange) {
    return { word: randexManyWord(count), phrase: randexManyPhrase(count), sentence: randexManySentence(count), number: randexManyNumber(count) };
  }
}
