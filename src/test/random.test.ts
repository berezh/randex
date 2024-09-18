import { random } from "../basic";
import { TestUtil } from "./test-util";
import { RandexLength, RandexSet } from "../interfaces";

function inSet(set: RandexSet, length: RandexLength = 1) {
  const result = random({ set, length });
  TestUtil.testInSet(result, set, length);
}

function inRange(range: string, length: RandexLength = 1) {
  const result = random({ range, length });
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

  it("length: alphabet", () => {
    inSet("english", 0);
    inSet("english", [0, 0]);
    inSet("english", [1, 3]);
    inSet("english", [0, 1]);
  });

  it("length: alphabet", () => {
    let value = random("english");
    expect(value.length).toBe(1);
    value = random(["english", "l"]);
    expect(value.length).toBe(1);
  });

  it("alphabet: upper", () => {
    TestUtil.loop(() => {
      let value = random(["english", "u"]);
      expect(TestUtil.isUpperCharValid(value, 1)).toBeTruthy();

      value = random([
        ["english", "u"],
        [1, 3],
      ]);
      expect(TestUtil.isUpperCharValid(value, [1, 3])).toBeTruthy();
    });
  });

  it("alphabet: lower", () => {
    TestUtil.loop(() => {
      let value = random(["english", "l"]);
      expect(TestUtil.isLowerCharValid(value, 1)).toBeTruthy();

      value = random([
        ["english", "lower"],
        [1, 3],
      ]);
      expect(TestUtil.isLowerCharValid(value, [1, 3])).toBeTruthy();
    });
  });
});
