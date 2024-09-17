import { RandexCase, RandexAlphabet, RandexItemSet, RandexContentArrayOptions, RandexSet, RandexSingleSet, RandexLength } from "../interfaces";

export class RandexTypeParser {
  private static inRange(value: number, range: [number, number]) {
    const [min, max] = range;
    return value >= min && value <= max;
  }

  private static inLiteral<T = string>(value: string, ...expects: T[]) {
    return !!expects.find(x => x === value);
  }

  public static inCase(value: string): value is RandexCase {
    return RandexTypeParser.inLiteral<RandexCase>(value, "default", "lower", "upper", "l", "u");
  }

  public static inAlphabet(value: string): value is RandexAlphabet {
    return RandexTypeParser.inLiteral<RandexAlphabet>(
      value,
      "english",
      "french",
      "spanish", // "german",
      "russian"
    );
  }

  public static inSet(value: string): value is RandexSingleSet {
    return RandexTypeParser.inAlphabet(value) || RandexTypeParser.inLiteral<RandexSingleSet>(value, "hex", "symbol", "number", "binary");
  }

  // RandomLength
  public static isLength(value: any): value is RandexLength {
    if (typeof value === "number") {
      return true;
    } else if (Array.isArray(value) && value.length === 2) {
      return typeof value[0] === "number" && typeof value[1] === "number";
    }
    return false;
  }

  // RandomItemSet
  public static isSetSingle(value: any): value is RandexItemSet {
    if (typeof value === "string") {
      return RandexTypeParser.inSet(value);
    } else if (Array.isArray(value) && value.length === 2) {
      const [alphabet, aCase] = value as any;
      if (typeof alphabet === "string" && typeof aCase === "string") {
        if (RandexTypeParser.inAlphabet(alphabet) && RandexTypeParser.inCase(aCase)) {
          return true;
        }
      }
    }

    return false;
  }

  public static isSet(value: any): value is RandexSet {
    if (RandexTypeParser.isSetSingle(value)) {
      return true;
    } else if (Array.isArray(value)) {
      const sets = value.filter(x => RandexTypeParser.isSetSingle(x));
      return sets.length === value.length;
    }

    return false;
  }

  public static isPartArray(value: any): value is RandexContentArrayOptions {
    if (Array.isArray(value) && RandexTypeParser.inRange(value.length, [2, 3])) {
      if (value.length === 2) {
        const [set, rangeOrLength] = value;
        return RandexTypeParser.isSet(set) && (RandexTypeParser.isLength(rangeOrLength) || typeof rangeOrLength === "string");
      } else if (value.length === 3) {
        const [set, range, length] = value;
        return RandexTypeParser.isSet(set) && typeof range === "string" && RandexTypeParser.isLength(length);
      }
    }
    return false;
  }
}
