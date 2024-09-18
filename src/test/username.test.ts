import { randomUsername } from "../custom/username";
import { TestUtil } from "./test-util";

describe("randomEmail", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const value = randomUsername();
      expect(TestUtil.isUsernameValid(value)).toBeTruthy();
    });
  });

  it("options", () => {
    let value = randomUsername({ length: 5 });
    expect(value.length).toBe(5);
    value = randomUsername(5);
    expect(value.length).toBe(5);
    //
    value = randomUsername({ length: [5, 5] });
    expect(value.length).toBe(5);
    value = randomUsername([5, 5]);
    expect(value.length).toBe(5);
    //
    value = randomUsername({ length: [1, 5] });
    expect(TestUtil.inNumberRange(value.length, [1, 5])).toBeTruthy();
    value = randomUsername([1, 5]);
    expect(TestUtil.inNumberRange(value.length, [1, 5])).toBeTruthy();
  });
});
