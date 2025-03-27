export type RandexCase = "default" | "lower" | "upper" | "l" | "u";
export type RandexAlphabet =
  | "english"
  | "french"
  | "spanish" // | "german"
  | "russian";

export type RandexSingleSet = RandexAlphabet | "hex" | "symbol" | "number" | "binary";
export type RandexAlphabetCase = [RandexAlphabet, RandexCase];

export type RandexItemSet = RandexSingleSet | RandexAlphabetCase;
export type RandexSet = RandexItemSet | RandexItemSet[];

export type RandexLength = number | [number, number];

interface RandexItemBasicOptions {
  set?: RandexSet;
  range?: string;
  length?: RandexLength;
}

export interface RandexContentSetOptions extends Omit<RandexItemBasicOptions, "set"> {
  set: RandexSet;
}

export interface RandexContentRangeOptions extends Omit<RandexItemBasicOptions, "range"> {
  range: string;
}

export type RandexContentArrayOptions = [RandexSet, string | RandexLength] | [RandexSet, string, RandexLength];

export type RandexContentOptions = RandexContentSetOptions | RandexContentRangeOptions | RandexContentArrayOptions | RandexSet;
