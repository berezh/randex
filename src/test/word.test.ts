import { Randex } from "../custom";
import { TestUtil } from "./test-util";

describe("word", () => {
  it("classic", () => {
    TestUtil.loop(() => {
      const w = Randex.word();
      expect(TestUtil.isWordValid(w, [2, 10])).toBeTruthy();
    });
  });

  it("many", () => {
    const count = 5;
    const ws = Randex.many(count).word();
    expect(ws.length).toBe(count);

    for (let i = 0; i < count; i++) {
      expect(TestUtil.isWordValid(ws[i], [2, 10])).toBeTruthy();
    }
  });
});
