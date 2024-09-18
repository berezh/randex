import { randomFullName } from "../custom";
import { TestUtil } from "./test-util";

describe("randomFullName", () => {
  it("simple", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomFullName();
      expect(TestUtil.isFullNameValid(value)).toBeTruthy();
    }
  });
});
