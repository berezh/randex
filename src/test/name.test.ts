import { randomName } from "../custom/name";
import { TestUtil } from "./test-util";

describe("randomName", () => {
  it("simple", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomName();
      expect(TestUtil.isNameValid(value)).toBeTruthy();
    }
  });

  it("options", () => {
    const value1 = randomName({ length: 5 });
    expect(value1.length).toBe(5);

    const value2 = randomName({ length: [5, 5] });
    expect(value2.length).toBe(5);

    const value3 = randomName({ length: [1, 5] });
    expect(TestUtil.inNumberRange(value3.length, [1, 5])).toBeTruthy();
  });
});
