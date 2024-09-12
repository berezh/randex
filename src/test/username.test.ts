import { randomUsername } from "../custom/username";
import { TestUtil } from "./test-util";

describe("randomEmail", () => {
  it("simple", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomUsername();
      expect(TestUtil.isUsernameValid(value)).toBeTruthy();
    }
  });
});
