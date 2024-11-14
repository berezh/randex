import { Randex } from "../custom";
import { TestUtil } from "./test-util";

describe("randomName", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const value = Randex.singleName();
      expect(TestUtil.isNameValid(value)).toBeTruthy();
    });
  });

  it("options: length", () => {
    let value = Randex.singleName({ length: 5 });
    expect(value.length).toBe(5);
    value = Randex.singleName(5);
    expect(value.length).toBe(5);
    //
    value = Randex.singleName({ length: [5, 5] });
    expect(value.length).toBe(5);
    value = Randex.singleName([5, 5]);
    expect(value.length).toBe(5);
    //
    value = Randex.singleName({ length: [1, 5] });
    expect(TestUtil.inNumberRange(value.length, [1, 5])).toBeTruthy();
    value = Randex.singleName([1, 5]);
    expect(TestUtil.inNumberRange(value.length, [1, 5])).toBeTruthy();
  });

  it("options: alphabet", () => {
    let value = Randex.singleName({ alphabet: "russian", length: 5 });
    expect(value.length).toBe(5);
    value = Randex.singleName("french", 10);
    expect(value.length).toBe(10);
  });
});
