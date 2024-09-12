import { RandomSet } from "../interfaces";

const alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetLower = "abcdefghijklmnopqrstuvwxyz";
const hex = "0123456789ABCDEFabcdef";
const symbol = '[-!$%^&*()_+|~=`{}[]:";<>?,./]' + "'";
export const alphabet = alphabetLower + alphabetUpper;
const number = "0123456789";
const binary = "01";

export class RtSetUtil {
  private static toSingleRange(set: RandomSet) {
    switch (set) {
      case "alphabet":
        return alphabet;
      case "alphabetUpper":
        return alphabetUpper;
      case "alphabetLower":
        return alphabetLower;
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

  public static toRange(set: RandomSet) {
    return Array.isArray(set) ? set.map(x => RtSetUtil.toSingleRange(x)).join("") : RtSetUtil.toSingleRange(set);
  }
}
