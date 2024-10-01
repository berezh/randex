import { RandexSetUtil } from "../basic/set";
import { RandexLength } from "../interfaces";

export function randomNumber(length: RandexLength): number;
export function randomNumber(from: number, to: number): number;
export function randomNumber(p1: any, p2?: any): number {
  if (typeof p1 === "number" && typeof p2 === "number") {
    return RandexSetUtil.randomNumber(p2 - p1 + 1) + p1;
  } else {
    if (typeof p1 === "number") {
      return RandexSetUtil.randomNumber(p1 + 1);
    } else {
      const [min, max] = p1;
      return RandexSetUtil.randomNumber(max - min + 1) + min;
    }
  }
}
