import { RandexCase, RandexAlphabetCase, RandexItemSet, RandexSet } from "../interfaces";
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

export class RtSetUtil {
  private static toSingleRange(itemSet: RandexItemSet) {
    if (Array.isArray(itemSet)) {
      return RtSetUtil.toAlphabetRange(itemSet);
    } else if (RandexTypeParser.inAlphabet(itemSet)) {
      return RtSetUtil.toAlphabetRange([itemSet, "default"]);
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
        return RtSetUtil.toAlphabetCase(aCase, englishLower, englishUpper);
      case "french":
        return RtSetUtil.toAlphabetCase(aCase, frenchLower, frenchUpper);
      case "spanish":
        return RtSetUtil.toAlphabetCase(aCase, spanishLower, spanishUpper);
      // case "german":
      //   return RtSetUtil.toAlphabetCase(aCase, englishLower, englishUpper);
      case "russian":
        return RtSetUtil.toAlphabetCase(aCase, russianLower, russianUpper);
    }
  }

  public static toRange(set: RandexSet) {
    let result = "";
    if (RandexTypeParser.isSetSingle(set)) {
      result += RtSetUtil.toSingleRange(set);
    } else if (RandexTypeParser.isSet(set)) {
      result += set.map(RtSetUtil.toSingleRange).join("");
    }

    return result;
  }
}
