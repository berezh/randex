import { Randex } from "../custom";
import { TestUtil } from "./test-util";

describe("randomEmail", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const value = Randex.username();
      expect(TestUtil.isUsernameValid(value)).toBeTruthy();
    });
  });

  it("options", () => {
    let value = Randex.username({ length: 5 });
    expect(value.length).toBe(5);
    value = Randex.username(5);
    expect(value.length).toBe(5);
    //
    value = Randex.username({ length: [5, 5] });
    expect(value.length).toBe(5);
    value = Randex.username([5, 5]);
    expect(value.length).toBe(5);
    //
    value = Randex.username({ length: [1, 5] });
    expect(TestUtil.inNumberRange(value.length, [1, 5])).toBeTruthy();
    value = Randex.username([1, 5]);
    expect(TestUtil.inNumberRange(value.length, [1, 5])).toBeTruthy();
  });
});
