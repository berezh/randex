import { Randex } from "../custom";
import { RandexNumberRange } from "../interfaces";
import { TestUtil } from "./test-util";

describe("phrase", () => {
  it("default", () => {
    TestUtil.loop(() => {
      const text = Randex.phrase();
      expect(TestUtil.isPhraseValid(text)).toBeTruthy();
    });
  });
  it("range", () => {
    const range: RandexNumberRange = [10, 20];
    TestUtil.loop(() => {
      const text = Randex.phrase(range);
      expect(TestUtil.isPhraseValid(text, range)).toBeTruthy();
    });
  });

  it("specific number", () => {
    const range: RandexNumberRange = 5;
    TestUtil.loop(() => {
      const text = Randex.phrase(range);
      expect(TestUtil.isPhraseValid(text, range)).toBeTruthy();
    });
  });

  it("many", () => {
    const count = 5;
    const phrases = Randex.many(count).phrase();

    for (let i = 0; i < count; i++) {
      expect(TestUtil.isPhraseValid(phrases[i])).toBeTruthy();
    }
  });
});
