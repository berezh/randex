import { Randex } from "../custom";
import { TestUtil } from "./test-util";

describe("word", () => {
  it("classic", () => {
    TestUtil.loop(() => {
      const w = Randex.word();
      expect(TestUtil.isWordValid(w, [2, 10])).toBeTruthy();
    });
  });
});
