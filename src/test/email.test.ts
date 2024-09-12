import { randomEmail } from "../custom/email";
import { TestUtil } from "./test-util";

describe("randomEmail", () => {
  it("simple", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomEmail();
      expect(TestUtil.isEmailValid(value)).toBeTruthy();
    }
  });
});
