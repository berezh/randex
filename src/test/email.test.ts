import { randomEmail } from "../custom/email";
import { TestUtil } from "./test-util";

describe("randomEmail", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const value = randomEmail();
      expect(TestUtil.isEmailValid(value)).toBeTruthy();
    });
  });
});
