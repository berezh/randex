import { randomNumber } from "../custom/number";
import { TestUtil } from "./test-util";

function testNumber(max: number) {
  const value = randomNumber(max);
  expect(value).toBeGreaterThanOrEqual(0);
  expect(value).toBeLessThanOrEqual(max);
}

function testNumberWithArray(range: [number, number], two = false) {
  const [min, max] = range;
  const value = two ? randomNumber(range) : randomNumber(min, max);
  expect(value).toBeGreaterThanOrEqual(min);
  expect(value).toBeLessThanOrEqual(max);
}

describe("randomNumber", () => {
  it("param: number", () => {
    testNumber(0);
    testNumber(1);
    testNumber(5);
  });

  it("much range", () => {
    const max = 4;
    const result: Record<number, number> = {};
    TestUtil.loop(() => {
      const value = randomNumber(max);
      result[value] = (result[value] || 0) + 1;
    });

    for (let i = 0; i <= max; i++) {
      expect(result[i]).toBeGreaterThan(0);
    }
  });

  it("param: number array", () => {
    TestUtil.loop(() => {
      testNumberWithArray([10, 15]);
    });
  });

  it("param: two numbers", () => {
    TestUtil.loop(() => {
      testNumberWithArray([10, 15], true);
    });
  });

  it("two numbers with decimals", () => {
    let count = 0;
    TestUtil.loop(() => {
      const value = randomNumber(1, 10, { decimals: 2 });
      if (/\.\d{2}$/g.test(value.toString())) {
        count++;
      }
    });

    expect(count).toBeGreaterThan(1);
  });

  it("a number with decimals", () => {
    let count = 0;
    TestUtil.loop(() => {
      const value = randomNumber(10, { decimals: 2 });
      if (/\.\d{2}$/g.test(value.toString())) {
        count++;
      }
    });

    expect(count).toBeGreaterThan(1);
  });
});
