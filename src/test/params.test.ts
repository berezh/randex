import { TestUtil } from "./test-util";
import { RandexNumberRange, RandexSet } from "../interfaces";
import { Randex } from "../custom";

describe("random params", () => {
  it("array 1", () => {
    const set: RandexSet = "english";

    const result1 = Randex.random({ set });
    const result2 = Randex.random(set);

    TestUtil.testInSet(result1, set);
    TestUtil.testInSet(result2, set);
  });

  it("single: array", () => {
    const set: RandexSet = ["number", "english"];

    const result1 = Randex.random({ set });
    const result2 = Randex.random(set);

    TestUtil.testInSet(result1, set);
    TestUtil.testInSet(result2, set);
  });

  it("single: array, length", () => {
    const set: RandexSet = ["number", "english"];
    const length: RandexNumberRange = 3;

    const result1 = Randex.random({ set, length });
    const result2 = Randex.random([set, length]);

    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("single: array, length as array", () => {
    const set: RandexSet = ["number", "english"];
    const length: RandexNumberRange = [1, 4];

    const result1 = Randex.random({ set, length });
    const result2 = Randex.random([set, length]);

    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("array 2 (range)", () => {
    const set: RandexSet = "number";
    const range = "abcdefghijklmnopqrstuvwxyz";

    const result1 = Randex.random({ set, charRange: range });
    const result2 = Randex.random([set, range]);

    TestUtil.testInBoth(result1, set, range);
    TestUtil.testInBoth(result2, set, range);
  });

  it("array 2 (length)", () => {
    const set: RandexSet = "english";
    const length: RandexNumberRange = 3;
    const result1 = Randex.random({ set, length });
    const result2 = Randex.random([set, length]);
    TestUtil.testInSet(result1, set, length);
    TestUtil.testInSet(result2, set, length);
  });

  it("array 3", () => {
    const set: RandexSet = "number";
    const range = "abcdefghijklmnopqrstuvwxyz";
    const length: RandexNumberRange = 3;

    const result1 = Randex.random({ set, charRange: range, length });
    const result2 = Randex.random([set, range, length]);

    TestUtil.testInBoth(result1, set, range, length);
    TestUtil.testInBoth(result2, set, range, length);
  });
});
