import { Randex } from "../custom";

function testUniqueArray<T>(array: T[], count: number) {
  const value = Randex.array(array, count);
  const uniqueResult: T[] = [];

  for (let i = 0; i < count; i++) {
    const uniqueValue = value[i];
    expect(uniqueResult.find(x => x === uniqueValue)).toBeFalsy();
    uniqueResult.push(uniqueValue);
  }
}

describe("randomNumberArray", () => {
  it("param: number", () => {
    testUniqueArray([1, 2, 3, 4, 5, 6], 6);
  });

  it("param: string", () => {
    testUniqueArray(["1", "2", "3", "4", "5", "6"], 6);
  });

  it("max count - array count", () => {
    testUniqueArray([1, 2, 3, 4, 5, 6], 8);
  });
});
