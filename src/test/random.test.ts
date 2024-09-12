import { random } from "../basic";
import { TestUtil } from "./test-util";
import { RandomLength, RandomSet } from "../interfaces";

function inSet(set: RandomSet, length: RandomLength = 1) {
  const result = random({ set, length });
  TestUtil.testInSet(result, set, length);
}

function inRange(range: string, length: RandomLength = 1) {
  const result = random({ range, length });
  TestUtil.testInRange(result, range, length);
}

describe("random", () => {
  it("set", () => {
    inSet("alphabet", 3);
    inSet("alphabetLower", 3);
    inSet("alphabetUpper", 3);
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
    inSet("alphabet", 0);
    inSet("alphabet", [0, 0]);
    inSet("alphabet", [1, 3]);
    inSet("alphabet", [0, 1]);
  });
});
