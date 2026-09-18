import { RandexSetUtil } from "../basic/set";
import { RandexSpreader } from "../utils/spreader";

describe("RandexSpreader", () => {
  it("spreads from temp items without replacement", () => {
    const picker = new RandexSpreader(["a", "b", "c"]);
    const randomSpy = jest.spyOn(RandexSetUtil, "randomSingleNumber");

    randomSpy.mockReturnValueOnce(1).mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(picker.spread(3)).toEqual(["b", "a", "c"]);
    expect((picker as any)._tempItems).toEqual([]);

    randomSpy.mockRestore();
  });

  it("keeps refilling until it returns the requested count", () => {
    const picker = new RandexSpreader([1, 2]);
    const randomSpy = jest.spyOn(RandexSetUtil, "randomSingleNumber");

    randomSpy.mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(picker.spread(5)).toEqual([1, 2, 2, 1, 1]);
    expect((picker as any)._tempItems).toEqual([2]);

    randomSpy.mockRestore();
  });

  it("refills temp items until the requested count is reached", () => {
    const picker = new RandexSpreader(["x", "y"]);
    const randomSpy = jest.spyOn(RandexSetUtil, "randomSingleNumber");

    randomSpy.mockReturnValueOnce(1).mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(picker.spread(3)).toEqual(["y", "x", "x"]);
    expect((picker as any)._tempItems).toEqual(["y"]);

    randomSpy.mockRestore();
  });
});
