import { Randex } from "../custom";
import { TestUtil } from "./test-util";

describe("randomFullName", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const value = Randex.fullName();
      expect(TestUtil.isFullNameValid(value)).toBeTruthy();
    });
  });
});
