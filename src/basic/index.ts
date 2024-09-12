import { RandomPartSetOptions, RandomPartOptions, RandomSet, RandomLength } from "../interfaces";
import { RtSetUtil } from "./set";

interface RandomStringParams {
  range: string;
  length: RandomLength;
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomString(params: RandomStringParams) {
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
    result += range[index];
  }

  return result;
}

function ifLengthType(value: string | number | number[]) {
  return typeof value === "number" || Array.isArray(value);
}

function toFullOption(options: RandomPartOptions): RandomPartSetOptions {
  if (typeof options === "string") {
    return {
      set: options,
      length: 1,
    };
  } else if (Array.isArray(options)) {
    if (options.length === 2) {
      const [set, rangeOrLength] = options;
      const result: RandomPartSetOptions = {
        set,
      };

      if (ifLengthType(rangeOrLength)) {
        result.length = rangeOrLength;
      } else {
        result.range = rangeOrLength;
      }

      return result;
    }
    if (options.length === 3 && ifLengthType(options[2])) {
      return {
        set: options[0],
        range: options[1],
        length: options[2],
      };
    }

    return {
      set: options as RandomSet,
      length: 1,
    };
  }

  return options as RandomPartSetOptions;
}

function toParam(options: RandomPartSetOptions): RandomStringParams {
  let fullRange = "";
  const { set, range, length = 1 } = options;

  if (range) {
    fullRange += range;
  }

  if (set) {
    fullRange += Array.isArray(set) ? set.map(x => RtSetUtil.toRange(x)).join("") : RtSetUtil.toRange(set);
  }

  return {
    range: fullRange,
    length,
  };
}

export function random(...options: RandomPartOptions[]) {
  let result = "";
  for (const option of options) {
    const o = toFullOption(option);
    const p = toParam(o);
    result += randomString(p);
  }

  return result;
}
