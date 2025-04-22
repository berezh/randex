import { Randex } from "../custom";

function testNumber(min: number, max: number, count: number) {
  const value = Randex.many(count).number([min, max]);
  const uniqueResult: number[] = [];

  for (let i = 0; i < count; i++) {
    const uniqueValue = value[i];
    expect(value[i]).toBeGreaterThanOrEqual(min);
    expect(value[i]).toBeLessThanOrEqual(max);
    uniqueResult.push(uniqueValue);
  }
}

describe("random many number", () => {
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
    let value = Randex.many(count).number([min, max]);
    expect(value.length).toBe(count);

    // max length limit
    value = Randex.many(count + 10).number([min, max]);
    expect(value.length).toBe(count + 10);
  });

  it("range: fill all possible values", () => {
    const min = 5;
    const max = 10;
    const count = max - min + 1;
    const value = Randex.many(count + 10).number([min, max]);
    expect(value.length).toBe(count + 10);

    for (let i = min; i <= max; i++) {
      expect(value.find(x => x === i)).toBeTruthy();
    }
  });
});
