import { RandexSetUtil } from "../basic/set";
import { RandexLength } from "../interfaces";

const defaultLength: RandexLength = [1, 10];

function getLength(reservedChars: number, length: RandexLength | undefined, resultLength: RandexLength) {
  const result = RandexSetUtil.getLength(reservedChars, length, defaultLength);
  if (typeof resultLength === "number") {
    expect(result).toBe(resultLength);
  } else {
    expect(result).toMatchObject(resultLength);
  }
}

describe("RandexSetUtil", () => {
  describe("getLength", () => {
    it("single", () => {
      getLength(0, 2, 2);
      getLength(1, 3, 2);

      getLength(0, undefined, defaultLength);
      getLength(5, 3, defaultLength);
    });

    it("array", () => {
      getLength(0, [1, 2], [1, 2]);
      getLength(1, [2, 3], [1, 2]);
      getLength(3, [1, 5], defaultLength);
    });
  });
});