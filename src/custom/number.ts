import { RandexSetUtil } from "../basic/set";
import { RandexLength } from "../interfaces";

export function randomNumber(length: RandexLength): number {
  if (typeof length === "number") {
    return RandexSetUtil.randomNumber(length + 1);
  } else {
    const [min, max] = length;
    return RandexSetUtil.randomNumber(max - min + 1) + min;
  }
}
