import { randomNumberArray } from "../custom/number-array";

function testNumber(min: number, max: number, count: number) {
  const value = randomNumberArray([min, max], count);
  const uniqueResult: number[] = [];

  for (let i = 0; i < count; i++) {
    const uniqueValue = value[i];
    expect(uniqueResult.find(x => x === uniqueValue)).toBeFalsy();
    expect(value[i]).toBeGreaterThanOrEqual(min);
    expect(value[i]).toBeLessThanOrEqual(max);
  }
}

describe("randomNumberArray", () => {
  it("param: number", () => {
    testNumber(0, 2, 0);
    testNumber(1, 5, 1);
    testNumber(5, 10, 2);
  });

  it("param: big number", () => {
    testNumber(50, 500, 50);
  });

  it("max count - unique", () => {
    testNumber(10, 20, 11);
  });

  it("count limit", () => {
    const min = 5;
    const max = 10;
    const count = max - min + 1;
    let value = randomNumberArray([min, max], count);
    expect(value.length).toBe(count);

    // max length limit
    value = randomNumberArray([min, max], count + 10);
    expect(value.length).toBe(count);
  });

  it("range: fill all possible values", () => {
    const min = 5;
    const max = 10;
    const count = max - min + 1;
    const value = randomNumberArray([min, max], count);
    expect(value.length).toBe(count);

    for (let i = min; i <= max; i++) {
      expect(value.find(x => x === i)).toBeTruthy();
    }
  });
});
