import { randomFileName } from "../custom/filename";
import { TestUtil } from "./test-util";

describe("randomFileName", () => {
  it("simple", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomFileName();
      expect(TestUtil.isFileNameValid(value)).toBeTruthy();
    }
  });
});
