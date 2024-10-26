import { randomArrayItem } from "../custom/array-item";
import { TestUtil } from "./test-util";

describe("randomArrayItem", () => {
  it("param: number", () => {
    const array = [1, 2, 3, 4, 5, 6];

    const resultArray: { [key: number]: number } = {};

    TestUtil.loop(() => {
      const value = randomArrayItem(array);
      resultArray[value] = (resultArray[value] || 0) + 1;
    });

    for (const item of array) {
      expect(resultArray[item]).toBeTruthy();
    }
  });
});
