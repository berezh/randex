import { RandexSetUtil } from "../basic/set";
import { RandexLength, RandomNumberOptions } from "../interfaces";

function getNumberBase(decimals: number) {
  return decimals === 1 ? 10 : Math.pow(10, decimals);
}

function getNumberValue(value: number, decimals?: number) {
  let result = value;
  if (typeof decimals === "number") {
    result = result * getNumberBase(decimals);
  }
  return result;
}

function innerRandomNumber(from: number, to: number, decimals?: number) {
  const fromV = getNumberValue(from, decimals);
  const toV = getNumberValue(to, decimals);

  let result = RandexSetUtil.randomNumber(toV - fromV + 1) + fromV;
  if (typeof decimals === "number") {
    result = result / getNumberBase(decimals);
  }
  return result;
}

export function randexNumber(length: RandexLength, options?: RandomNumberOptions): number;

export function randexNumber(from: number, to: number, options?: RandomNumberOptions): number;

export function randexNumber(p1: any, p2?: any, p3?: any): number {
  if (typeof p1 === "number" && typeof p2 === "number") {
    return innerRandomNumber(p1, p2, (p3 as RandomNumberOptions)?.decimals);
  } else {
    const decimals = (p2 as RandomNumberOptions)?.decimals;
    if (typeof p1 === "number") {
      return innerRandomNumber(0, p1, decimals);
    } else {
      const [min, max] = p1;
      return innerRandomNumber(min, max, decimals);
    }
  }
}
