import { RandexContentOptions, RandexLength, RandexContentSetOptions, RandexContentRangeOptions } from "../interfaces";
import { RandexSetUtil } from "./set";
import { RandexTypeParser } from "./type";

interface RandexRangeOptions {
  range: string;
  length: RandexLength;
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomString(params: RandexRangeOptions) {
  const { length, range } = params;
  let result = "";

  let currentLength = 0;
  if (typeof length === "number") {
    currentLength = length;
  } else if (Array.isArray(length)) {
    const [min, max] = length;
    currentLength = min + randomInt(max - min);
  }

  for (let i = 0; i < currentLength; i++) {
    const index = randomInt(range.length - 1);
    if (range.length >= index || range.length <= index) {
      result += range[index];
    }
  }

  return result;
}

function toContent(options: RandexContentOptions): RandexContentSetOptions | RandexContentRangeOptions {
  if (RandexTypeParser.isSet(options)) {
    return {
      set: options,
    };
  } else if (RandexTypeParser.isPartArray(options)) {
    if (options.length === 2) {
      const [set, rangeOrLength] = options;
      return RandexTypeParser.isLength(rangeOrLength)
        ? {
            set,
            length: rangeOrLength,
          }
        : {
            set,
            range: rangeOrLength,
          };
    } else if (options.length === 3) {
      const [set, range, length] = options;
      return {
        set,
        range,
        length,
      };
    }
  }

  return options as RandexContentSetOptions | RandexContentRangeOptions;
}

function toRangeOptions(options: RandexContentSetOptions | RandexContentRangeOptions): RandexRangeOptions {
  let fullRange = "";
  const { set, range, length = 1 } = options;

  if (range) {
    fullRange += range;
  }

  if (set) {
    fullRange += RandexSetUtil.toRange(set);
  }

  return {
    range: fullRange,
    length,
  };
}

export function random(...options: RandexContentOptions[]) {
  let result = "";
  for (const option of options) {
    const content = toContent(option);
    const p = toRangeOptions(content);
    result += randomString(p);
  }

  return result;
}
