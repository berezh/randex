import { DEFAULT_SENTENCE_RANGE, DEFAULT_WORD_RANGE } from "../basic/const";
import { RandexSetUtil } from "../basic/set";
import { RandexRange, RandexSet } from "../interfaces";

export class TestUtil {
  public static testIn(value: string, length: RandexRange = 1, action: () => void) {
    if (typeof length === "number") {
      expect(value.length).toBe(length);
    } else if (Array.isArray(length)) {
      const [min, max] = length;
      expect(value.length).toBeGreaterThanOrEqual(min);
      expect(value.length).toBeLessThanOrEqual(max);
    }
    if (value) {
      action();
    }
  }

  public static loop(action: (index: number) => void) {
    for (let i = 0; i < 100; i++) {
      action(i);
    }
  }

  public static testInSet(value: string, set: RandexSet, length: RandexRange = 1) {
    TestUtil.testIn(value, length, () => {
      expect(TestUtil.inSet(value, set)).toBeTruthy();
    });
  }

  public static testInSetRange(value: string, set: RandexSet, range: string, length: RandexRange = 1) {
    TestUtil.testIn(value, length, () => {
      expect(TestUtil.inSet(value, set, range)).toBeTruthy();
    });
  }

  public static testInRange(value: string, range: string, length: RandexRange = 1) {
    TestUtil.testIn(value, length, () => {
      expect(TestUtil.inRange(value, range)).toBeTruthy();
    });
  }

  public static testInBoth(value: string, set: RandexSet, range: string, length: RandexRange = 1) {
    TestUtil.testIn(value, length, () => {
      expect(TestUtil.inBoth(value, set, range)).toBeTruthy();
    });
  }

  public static inRange(value: string, range: string) {
    for (let i = 0; i < value.length; i++) {
      if (!range.includes(value[i])) {
        return false;
      }
    }

    return value.length > 0;
  }

  public static inSet(value: string, set: RandexSet, range?: string) {
    const fullRange = RandexSetUtil.toRange(set) + (range ? range : "");
    return TestUtil.inRange(value, fullRange);
  }

  public static inBoth(value: string, set: RandexSet, range: string) {
    const fullRange = RandexSetUtil.toRange(set) + range;
    return TestUtil.inRange(value, fullRange);
  }

  public static isEmailValid(email: string) {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  }

  public static isUsernameValid(email: string) {
    return String(email)
      .toLowerCase()
      .match(/^[a-z][a-z0-9]{5,}$/);
  }

  public static isNameValid(email: string) {
    return String(email).match(/^[A-Z][a-z]{1,}$/);
  }

  public static isWordValid(text: string, length: RandexRange = DEFAULT_WORD_RANGE) {
    const l = TestUtil.getLength(length);
    return String(text).match(new RegExp(`\^[a-z]\{${l}\}\$`));
  }

  public static isSentenceValid(text: string, length: RandexRange = DEFAULT_SENTENCE_RANGE) {
    const l = TestUtil.getLength(length);
    const splits = text.split(" ");

    if (Array.isArray(length)) {
      const [min, max] = length;
      return splits.length >= min && splits.length <= max;
    } else {
      return splits.length === length;
    }
  }

  public static isUpperCharValid(value: string, length: RandexRange = 1) {
    const l = TestUtil.getLength(length);
    return String(value).match(new RegExp(`\^[A-Z]\{${l}\}\$`));
  }

  public static isLowerCharValid(value: string, length: RandexRange = 1) {
    const l = TestUtil.getLength(length);
    return String(value).match(new RegExp(`^[a-z]{${l}}$`));
  }

  public static isFullNameValid(email: string) {
    return String(email).match(/^[A-Z][a-z]{1,}[ ][A-Z][a-z]{1,}$/);
  }

  public static isFileNameValid(email: string) {
    return String(email)
      .toLowerCase()
      .match(/^[a-z0-9_\.]{2,}$/);
  }

  public static inNumberRange(value: number, range: [number, number]) {
    return value >= range[0] && value <= range[1];
  }

  private static getLength(length: RandexRange) {
    return Array.isArray(length) ? `${length[0]},${length[1]}` : length;
  }
}
