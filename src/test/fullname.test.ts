import { randomFullName } from "../custom";
import { TestUtil } from "./test-util";

describe("randomFullName", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const value = randomFullName();
      expect(TestUtil.isFullNameValid(value)).toBeTruthy();
    });
  });
});
