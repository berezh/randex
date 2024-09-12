import { random } from "../basic";
import { TestUtil } from "./test-util";
import { RandomLength, RandomSet } from "../interfaces";

describe("random params", () => {
  it("array 1", () => {
    const set: RandomSet = "alphabetLower";

    const result1 = random({ set });
    const result2 = random(set);

    TestUtil.testInSet(result1, set);
    TestUtil.testInSet(result2, set);
  });

  it("single: array", () => {
    const set: RandomSet = ["number", "alphabetLower"];

    const result1 = random({ set });
    const result2 = random(set);

    TestUtil.testInSet(result1, set);
    TestUtil.testInSet(result2, set);
  });

  it("single: array, length", () => {
    const set: RandomSet = ["number", "alphabetLower"];
    const length: RandomLength = 3;

    const result1 = random({ set, length });
    const result2 = random([set, length]);

    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("single: array, length as array", () => {
    const set: RandomSet = ["number", "alphabetLower"];
    const length: RandomLength = [1, 4];

    const result1 = random({ set, length });
    const result2 = random([set, length]);

    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("array 2 (range)", () => {
    const set: RandomSet = "number";
    const range = "abcdefghijklmnopqrstuvwxyz";

    const result1 = random({ set, range });
    const result2 = random([set, range]);

    TestUtil.testInBoth(result1, set, range);
    TestUtil.testInBoth(result2, set, range);
  });

  it("array 2 (length)", () => {
    const set: RandomSet = "alphabet";
    const length: RandomLength = 3;
    const result1 = random({ set, length });
    const result2 = random([set, length]);
    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("array 3", () => {
    const set: RandomSet = "number";
    const range = "abcdefghijklmnopqrstuvwxyz";
    const length: RandomLength = 3;

    const result1 = random({ set, range, length });
    const result2 = random([set, range, length]);

    TestUtil.testInBoth(result1, set, range, length);
    TestUtil.testInBoth(result2, set, range, length);
  });
});
