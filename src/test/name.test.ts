import { randomName } from "../custom/name";
import { TestUtil } from "./test-util";

describe("randomName", () => {
  it("simple", () => {
    for (let i = 0; i < 100; i++) {
      const value = randomName();
      expect(TestUtil.isNameValid(value)).toBeTruthy();
    }
  });
});
