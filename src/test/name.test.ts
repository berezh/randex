import { randomName } from "../custom/name";
import { TestUtil } from "./test-util";

describe("randomName", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const value = randomName();
      expect(TestUtil.isNameValid(value)).toBeTruthy();
    });
  });

  it("options: length", () => {
    let value = randomName({ length: 5 });
    expect(value.length).toBe(5);
    value = randomName(5);
    expect(value.length).toBe(5);
    //
    value = randomName({ length: [5, 5] });
    expect(value.length).toBe(5);
    value = randomName([5, 5]);
    expect(value.length).toBe(5);
    //
    value = randomName({ length: [1, 5] });
    expect(TestUtil.inNumberRange(value.length, [1, 5])).toBeTruthy();
    value = randomName([1, 5]);
    expect(TestUtil.inNumberRange(value.length, [1, 5])).toBeTruthy();
  });

  it("options: alphabet", () => {
    let value = randomName({ alphabet: "russian", length: 5 });
    expect(value.length).toBe(5);
    value = randomName("french", 10);
    expect(value.length).toBe(10);
  });
});
