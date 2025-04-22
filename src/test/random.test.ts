import { TestUtil } from "./test-util";
import { RandexRange, RandexSet } from "../interfaces";
import { Randex } from "../custom";

function inSet(set: RandexSet, length: RandexRange = 1) {
  const result = Randex.random({ set, length });
  TestUtil.testInSet(result, set, length);
}

function inRange(range: string, length: RandexRange = 1) {
  const result = Randex.random({ range, length });
  TestUtil.testInRange(result, range, length);
}

describe("random", () => {
  it("set", () => {
    inSet("english", 3);
    inSet(["english", "l"], 3);
    inSet(["english", "u"], 3);
    inSet("hex", 3);
    inSet("symbol", 3);
    inSet("number", 3);
    inSet("binary", 3);
  });

  it("range", () => {
    inRange("abc", 3);
    inRange("1234abc!@#", 3);
  });

  it("result 1: number", () => {
    const length: RandexRange = [0, 4];
    const result: Record<number, number> = {};
    TestUtil.loop(() => {
      const l = Randex.random({ set: "english", length }).length;
      result[l] = (result[l] || 0) + 1;
    });

    for (let i = 0; i <= 4; i++) {
      expect(result[i]).toBeGreaterThan(0);
    }
  });

  it("result 2: number range", () => {
    const length: RandexRange = [5, 8];
    const result: Record<number, number> = {};
    TestUtil.loop(() => {
      const l = Randex.random({ set: "english", length }).length;
      result[l] = (result[l] || 0) + 1;
    });

    for (let i = 5; i <= 8; i++) {
      expect(result[i]).toBeGreaterThan(0);
    }
  });

  it("length: alphabet", () => {
    inSet("english", 0);
    inSet("english", [0, 0]);
    inSet("english", [1, 3]);
    inSet("english", [0, 1]);
  });

  it("length: alphabet", () => {
    let value = Randex.random("english");
    expect(value.length).toBe(1);
    value = Randex.random(["english", "l"]);
    expect(value.length).toBe(1);
  });

  it("alphabet: upper", () => {
    TestUtil.loop(() => {
      let value = Randex.random(["english", "u"]);
      expect(TestUtil.isUpperCharValid(value, 1)).toBeTruthy();

      value = Randex.random([
        ["english", "u"],
        [1, 3],
      ]);
      expect(TestUtil.isUpperCharValid(value, [1, 3])).toBeTruthy();
    });
  });

  it("alphabet: lower", () => {
    TestUtil.loop(() => {
      let value = Randex.random(["english", "l"]);
      expect(TestUtil.isLowerCharValid(value, 1)).toBeTruthy();

      value = Randex.random([
        ["english", "lower"],
        [1, 3],
      ]);
      expect(TestUtil.isLowerCharValid(value, [1, 3])).toBeTruthy();
    });
  });
});
