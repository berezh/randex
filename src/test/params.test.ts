import { random } from "../basic";
import { TestUtil } from "./test-util";
import { RandexLength, RandexSet } from "../interfaces";

describe("random params", () => {
  it("array 1", () => {
    const set: RandexSet = "english";

    const result1 = random({ set });
    const result2 = random(set);

    TestUtil.testInSet(result1, set);
    TestUtil.testInSet(result2, set);
  });

  it("single: array", () => {
    const set: RandexSet = ["number", "english"];

    const result1 = random({ set });
    const result2 = random(set);

    TestUtil.testInSet(result1, set);
    TestUtil.testInSet(result2, set);
  });

  it("single: array, length", () => {
    const set: RandexSet = ["number", "english"];
    const length: RandexLength = 3;

    const result1 = random({ set, length });
    const result2 = random([set, length]);

    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("single: array, length as array", () => {
    const set: RandexSet = ["number", "english"];
    const length: RandexLength = [1, 4];

    const result1 = random({ set, length });
    const result2 = random([set, length]);

    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("array 2 (range)", () => {
    const set: RandexSet = "number";
    const range = "abcdefghijklmnopqrstuvwxyz";

    const result1 = random({ set, range });
    const result2 = random([set, range]);

    TestUtil.testInBoth(result1, set, range);
    TestUtil.testInBoth(result2, set, range);
  });

  it("array 2 (length)", () => {
    const set: RandexSet = "english";
    const length: RandexLength = 3;
    const result1 = random({ set, length });
    const result2 = random([set, length]);
    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("array 3", () => {
    const set: RandexSet = "number";
    const range = "abcdefghijklmnopqrstuvwxyz";
    const length: RandexLength = 3;

    const result1 = random({ set, range, length });
    const result2 = random([set, range, length]);

    TestUtil.testInBoth(result1, set, range, length);
    TestUtil.testInBoth(result2, set, range, length);
  });
});
