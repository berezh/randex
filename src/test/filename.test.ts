import { randomFileName } from "../custom/filename";
import { TestUtil } from "./test-util";

describe("randomFileName", () => {
  it("simple", () => {
    for (let i = 0; i < 100; i++) {
      const email = randomFileName();
      expect(TestUtil.isUsernameValid(email)).toBeTruthy();
    }
  });
});
