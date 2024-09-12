export type RandomSingleSet = "hex" | "symbol" | "alphabet" | "alphabetLower" | "alphabetUpper" | "number" | "binary";

export type RandomSet = RandomSingleSet | RandomSingleSet[];

export type RandomLength = number | [number, number];

interface RandomPartFullOptions {
  set?: RandomSet;
  range?: string;
  length?: RandomLength;
}

export interface RandomPartSetOptions extends Omit<RandomPartFullOptions, "set"> {
  set: RandomSet;
}

export interface RandomPartRangeOptions extends Omit<RandomPartFullOptions, "range"> {
  range: string;
}

export type RandomPartArrayOptions = [RandomSet, string | RandomLength] | [RandomSet, string, RandomLength];

export type RandomPartOptions = RandomPartSetOptions | RandomPartRangeOptions | RandomPartArrayOptions | RandomSet;
