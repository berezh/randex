import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import {
  RandexAlphabet,
  RandexLength,
  RandexEmailOptions,
  RandexFileNameOptions,
  RandexWordOptions,
  RandomNumberOptions,
  RandexUsernameOptions,
  RandexFullNameOptions,
} from "../interfaces";
import { randexRandom } from "./random";
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

  public static bool(): boolean {
    return Math.random() < 0.5;
  }

  public static email(options?: RandexEmailOptions): string;

  public static email(prefixLength: RandexLength, lowDomainLength?: RandexLength, hightDomainLength?: RandexLength): string;

  public static email(domain: string): string;

  public static email(p1?: any, p2?: any, p3?: any): string {
    let prefixLength: RandexLength = RandexSetUtil.defaultEmailPrefixLength;
    let hightDomainLength: RandexLength = RandexSetUtil.defaultHightDomainEmailLength;
    let lowDomainLength: RandexLength = RandexSetUtil.defaultLowDomainEmailLength;
    let domain = "";

    if (RandexTypeParser.isLength(p1)) {
      prefixLength = p1;
      if (RandexTypeParser.isLength(p2)) {
        lowDomainLength = p2;
      }
      if (RandexTypeParser.isLength(p3)) {
        hightDomainLength = p3;
      }
    } else if (typeof p1 === "string") {
      domain = p1;
    } else if (typeof p1 === "object") {
      if (p1.prefixLength) {
        prefixLength = p1.prefixLength;
      }
      if (p1.hightDomainLength) {
        hightDomainLength = p1.hightDomainLength;
      }
      if (p1.lowDomainLength) {
        lowDomainLength = p1.lowDomainLength;
      }
      if (p1.domain) {
        domain = p1.domain;
      }
    }

    if (!domain) {
      domain = randexRandom([["english", "l"], lowDomainLength]) + "." + randexRandom([["english", "l"], hightDomainLength]);
    }

    return randexRandom([[["english", "l"], "number"], prefixLength]) + "@" + domain;
  }

  public static fileName(options?: RandexFileNameOptions): string;

  public static fileName(fileNameLength: RandexLength, extensionLength?: RandexLength): string;

  public static fileName(fileNameLength: RandexLength, extension: string): string;

  public static fileName(extension: string): string;

  public static fileName(p1?: any, p2?: any): string {
    let fileNameLength = RandexSetUtil.defaultFileNameLength;
    let extensionLength: RandexLength = RandexSetUtil.defaultExtensionLength;
    let extension = "";

    if (RandexTypeParser.isLength(p1)) {
      fileNameLength = p1;
      if (RandexTypeParser.isLength(p2)) {
        extensionLength = p2;
      } else if (typeof p2 === "string") {
        extension = p2;
      }
    } else if (typeof p1 === "string") {
      extension = p1;
    } else if (typeof p1 === "object") {
      if (p1.fileNameLength) {
        fileNameLength = p1.fileNameLength;
      }
      if (p1.extensionLength) {
        extensionLength = p1.extensionLength;
      }
      if (p1.extension) {
        extension = p1.extension;
      }
    }

    fileNameLength = RandexSetUtil.getLength(1, fileNameLength, fileNameLength);

    if (!extension) {
      extension = randexRandom([["english", "l"], extensionLength]);
    }

    return (
      randexRandom([["english", "number"], RandexSetUtil.fileNameExtraChars, fileNameLength]) +
      randexRandom(["english", "number"]) +
      "." +
      (extension ? extension.replace(/^\./, "") : randexRandom([["english", "l"], extensionLength]))
    );
  }

  public static fullName(options?: RandexFullNameOptions): string;

  public static fullName(length: RandexLength): string;

  public static fullName(alphabet?: RandexAlphabet): string;

  public static fullName(alphabet: RandexAlphabet, length: RandexLength): string;

  public static fullName(alphabet: RandexAlphabet, firstLength: RandexLength, secondLength: RandexLength): string;

  public static fullName(p1?: any, p2?: any, p3?: any): string {
    let firstLength: RandexLength = 0;
    let secondLength: RandexLength = 0;
    let alphabet: RandexAlphabet = "english";

    if (RandexTypeParser.isLength(p1)) {
      firstLength = secondLength = p1;
    } else if (RandexTypeParser.inAlphabet(p1)) {
      alphabet = p1;
      if (RandexTypeParser.isLength(p2)) {
        firstLength = secondLength = p2;
      }
      if (RandexTypeParser.isLength(p3)) {
        secondLength = p3;
      }
    } else if (typeof p1 === "object") {
      if (p1.alphabet) {
        alphabet = p1.alphabet;
      }
      if (p1.firstLength) {
        firstLength = p1.firstLength;
      }
      if (p1.secondLength) {
        secondLength = p1.secondLength;
      }
    }

    return Randex.singleName({ length: firstLength, alphabet }) + " " + Randex.singleName({ length: secondLength, alphabet });
  }

  public static singleName(options?: RandexWordOptions): string;

  public static singleName(length: RandexLength): string;

  public static singleName(alphabet?: RandexAlphabet): string;

  public static singleName(alphabet: RandexAlphabet, length: RandexLength): string;

  public static singleName(p1?: any, p2?: any): string {
    let length: RandexLength = 0;
    let alphabet: RandexAlphabet = "english";
    if (RandexTypeParser.isLength(p1)) {
      length = p1;
    } else if (RandexTypeParser.inAlphabet(p1)) {
      alphabet = p1;
      if (RandexTypeParser.isLength(p2)) {
        length = p2;
      }
    } else if (typeof p1 === "object") {
      if (p1.alphabet) {
        alphabet = p1.alphabet;
      }
      if (p1.length) {
        length = p1.length;
      }
    }

    const currentLength = RandexSetUtil.getLength(1, length, [1, 9]);
    return randexRandom([alphabet, "u"], [[alphabet, "l"], currentLength]);
  }

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

  // number
  private static getNumberBase(decimals: number) {
    return decimals === 1 ? 10 : Math.pow(10, decimals);
  }

  private static getNumberValue(value: number, decimals?: number) {
    let result = value;
    if (typeof decimals === "number") {
      result = result * Randex.getNumberBase(decimals);
    }
    return result;
  }

  private static innerRandomNumber(from: number, to: number, decimals?: number) {
    const fromV = Randex.getNumberValue(from, decimals);
    const toV = Randex.getNumberValue(to, decimals);

    let result = RandexSetUtil.randomNumber(toV - fromV + 1) + fromV;
    if (typeof decimals === "number") {
      result = result / Randex.getNumberBase(decimals);
    }
    return result;
  }

  public static number(length: RandexLength, options?: RandomNumberOptions): number;

  public static number(from: number, to: number, options?: RandomNumberOptions): number;

  public static number(p1: any, p2?: any, p3?: any): number {
    if (typeof p1 === "number" && typeof p2 === "number") {
      return Randex.innerRandomNumber(p1, p2, (p3 as RandomNumberOptions)?.decimals);
    } else {
      const decimals = (p2 as RandomNumberOptions)?.decimals;
      if (typeof p1 === "number") {
        return Randex.innerRandomNumber(0, p1, decimals);
      } else {
        const [min, max] = p1;
        return Randex.innerRandomNumber(min, max, decimals);
      }
    }
  }

  public static username(options?: RandexUsernameOptions | RandexLength) {
    const length: RandexLength | undefined = RandexTypeParser.isLength(options) ? options : options?.length;
    const currentLength = RandexSetUtil.getLength(1, length, [6, 10]);

    return randexRandom(["english", "l"], [[["english", "l"], "number"], currentLength]);
  }
}
