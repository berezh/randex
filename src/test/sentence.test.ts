import { Randex } from "../custom";
import { RandexRange } from "../interfaces";
import { TestUtil } from "./test-util";

describe("sentence", () => {
  it("default", () => {
    TestUtil.loop(() => {
      const text = Randex.sentence();
      expect(TestUtil.isSentenceValid(text)).toBeTruthy();
    });
  });
  it("range", () => {
    const range: RandexRange = [10, 20];
    TestUtil.loop(() => {
      const text = Randex.sentence(range);
      expect(TestUtil.isSentenceValid(text, range)).toBeTruthy();
    });
  });

  it("specific number", () => {
    const range: RandexRange = 5;
    TestUtil.loop(() => {
      const text = Randex.sentence(range);
      expect(TestUtil.isSentenceValid(text, range)).toBeTruthy();
    });
  });

  it("many", () => {
    const count = 5;
    const sentences = Randex.many(count).sentence();

    for (let i = 0; i < count; i++) {
      expect(TestUtil.isSentenceValid(sentences[i])).toBeTruthy();
    }
  });
});
