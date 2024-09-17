import { RandexCase, RandexAlphabetCase, RandexItemSet, RandexSet, RandexLength } from "../interfaces";
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

  public static getLength(reservedChars: number, length: RandexLength | undefined, defaultLength: RandexLength): RandexLength {
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
}
