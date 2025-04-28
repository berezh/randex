import { RandexCase, RandexAlphabetCase, RandexItemSet, RandexSet, RandexNumberRange } from "../interfaces";
import { RandexTypeParser } from "./type";

const hex = "0123456789ABCDEFabcdef";
const symbol = '[-!$%^&*()_+|~=`{}[]:";<>?,./]' + "'";
const number = "0123456789";
const binary = "01";

const englishLower = "abcdefghijklmnopqrstuvwxyz";
const englishUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const frenchLower = "abcdefghijklmnopqrstuvwxyzàâæçèéêëîïôœùûü";
const frenchUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÈÉÊËÎÏÔŒÙÛÜ";
const spanishLower = "abcdefghijklmnopqrstuvwxyzñ";
const spanishUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑ";
const russianLower = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
const russianUpper = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

export class RandexSetUtil {
  public static readonly defaultFileNameLength: RandexNumberRange = [3, 10];

  public static readonly defaultExtensionLength: RandexNumberRange = [2, 5];

  public static readonly fileNameExtraChars = ""; //"-_.";

  public static readonly defaultEmailPrefixLength: RandexNumberRange = [6, 10];

  public static readonly defaultHightDomainEmailLength: RandexNumberRange = [1, 6];

  public static readonly defaultLowDomainEmailLength: RandexNumberRange = [2, 4];

  private static toSingleRange(itemSet: RandexItemSet) {
    if (Array.isArray(itemSet)) {
      return RandexSetUtil.toAlphabetRange(itemSet);
    } else if (RandexTypeParser.inAlphabet(itemSet)) {
      return RandexSetUtil.toAlphabetRange([itemSet, "default"]);
    }

    switch (itemSet) {
      case "hex":
        return hex;
      case "symbol":
        return symbol;
      case "number":
        return number;
      case "binary":
        return binary;
      default:
        return "";
    }
  }

  private static toAlphabetCase(cas: RandexCase, lowerWord: string, upperWord: string) {
    switch (cas) {
      case "lower":
      case "l":
        return lowerWord;

      case "upper":
      case "u":
        return upperWord;

      default:
        return lowerWord + upperWord;
    }
  }

  private static toAlphabetRange(set: RandexAlphabetCase) {
    const [alphabet, aCase] = set;
    switch (alphabet) {
      case "english":
        return RandexSetUtil.toAlphabetCase(aCase, englishLower, englishUpper);
      case "french":
        return RandexSetUtil.toAlphabetCase(aCase, frenchLower, frenchUpper);
      case "spanish":
        return RandexSetUtil.toAlphabetCase(aCase, spanishLower, spanishUpper);
      // case "german":
      //   return RtSetUtil.toAlphabetCase(aCase, englishLower, englishUpper);
      case "russian":
        return RandexSetUtil.toAlphabetCase(aCase, russianLower, russianUpper);
    }
  }

  public static toRange(set: RandexSet) {
    let result = "";
    if (RandexTypeParser.isSetSingle(set)) {
      result += RandexSetUtil.toSingleRange(set);
    } else if (RandexTypeParser.isSet(set)) {
      result += set.map(RandexSetUtil.toSingleRange).join("");
    }

    return result;
  }

  public static getLength(reservedChars: number, length: RandexNumberRange | undefined, defaultLength: RandexNumberRange): RandexNumberRange {
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

  public static randomSingleNumber(length: number) {
    return Math.floor(Math.random() * length);
  }

  public static randomRangeNumber(min: number, max: number) {
    const minN = Math.min(min, max);
    const maxN = Math.max(min, max);
    return RandexSetUtil.randomSingleNumber(maxN - minN + 1) + minN;
  }

  public static many<TItem>(count: RandexNumberRange, callback: () => TItem): TItem[] {
    const result: TItem[] = [];

    const length = Array.isArray(count) ? RandexSetUtil.randomRangeNumber(count[0], count[1]) : count;

    for (let i = 0; i < length; i++) {
      result.push(callback());
    }
    return result;
  }
}
