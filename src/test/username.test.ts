import { randomUsername } from "../custom/username";
import { TestUtil } from "./test-util";

describe("randomEmail", () => {
  it("simple", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomUsername();
      expect(TestUtil.isUsernameValid(value)).toBeTruthy();
    }
  });

  it("options", () => {
    const value1 = randomUsername({ length: 5 });
    expect(value1.length).toBe(5);

    const value2 = randomUsername({ length: [5, 5] });
    expect(value2.length).toBe(5);

    const value3 = randomUsername({ length: [1, 5] });
    expect(TestUtil.inNumberRange(value3.length, [1, 5])).toBeTruthy();
  });
});
