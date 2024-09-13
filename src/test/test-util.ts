import { RtSetUtil } from "../basic/set";
import { RandomLength, RandomSet } from "../interfaces";

export class TestUtil {
  public static testIn(value: string, length: RandomLength = 1, action: () => void) {
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

  public static testInSet(value: string, set: RandomSet, length: RandomLength = 1) {
    TestUtil.testIn(value, length, () => {
      expect(TestUtil.inSet(value, set)).toBeTruthy();
    });
  }

  public static testInRange(value: string, range: string, length: RandomLength = 1) {
    TestUtil.testIn(value, length, () => {
      expect(TestUtil.inRange(value, range)).toBeTruthy();
    });
  }

  public static testInBoth(value: string, set: RandomSet, range: string, length: RandomLength = 1) {
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

  public static inSet(value: string, set: RandomSet) {
    const range = RtSetUtil.toRange(set);
    return TestUtil.inRange(value, range);
  }

  public static inBoth(value: string, set: RandomSet, range: string) {
    const fullRange = RtSetUtil.toRange(set) + range;
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
}
