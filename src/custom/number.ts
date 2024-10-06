import { RandexSetUtil } from "../basic/set";
import { RandexLength } from "../interfaces";

export interface RandomNumberOptions {
  decimals?: number;
}

function getBase(decimals: number) {
  return decimals === 1 ? 10 : Math.pow(10, decimals);
}

function getValue(value: number, decimals?: number) {
  let result = value;
  if (typeof decimals === "number") {
    result = result * getBase(decimals);
  }
  return result;
}

function innerRandomNumber(from: number, to: number, decimals?: number) {
  const fromV = getValue(from, decimals);
  const toV = getValue(to, decimals);

  let result = RandexSetUtil.randomNumber(toV - fromV + 1) + fromV;
  if (typeof decimals === "number") {
    result = result / getBase(decimals);
  }
  return result;
}

export function randomNumber(length: RandexLength, options?: RandomNumberOptions): number;
export function randomNumber(from: number, to: number, options?: RandomNumberOptions): number;
export function randomNumber(p1: any, p2?: any, p3?: any): number {
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
