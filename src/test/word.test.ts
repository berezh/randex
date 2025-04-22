import { DEFAULT_WORD_RANGE } from "../basic/const";
import { Randex } from "../custom";
import { RandexRange } from "../interfaces";
import { TestUtil } from "./test-util";

describe("word", () => {
  it("classic", () => {
    TestUtil.loop(() => {
      const w = Randex.word();
      expect(TestUtil.isWordValid(w, DEFAULT_WORD_RANGE)).toBeTruthy();
    });
  });

  it("many - number", () => {
    const count = 5;
    const ws = Randex.many(count).word();
    expect(ws.length).toBe(count);

    for (let i = 0; i < count; i++) {
      expect(TestUtil.isWordValid(ws[i], DEFAULT_WORD_RANGE)).toBeTruthy();
    }
  });

  it("many - range", () => {
    const count: RandexRange = [5, 10];
    const ws = Randex.many(count).word();
    expect(ws.length).toBeGreaterThanOrEqual(5);
    expect(ws.length).toBeLessThanOrEqual(10);
  });
});
