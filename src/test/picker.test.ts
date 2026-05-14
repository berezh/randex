import { RandexSetUtil } from "../basic/set";
import { RandexPicker } from "../utils/picker";

describe("RandexPicker", () => {
  it("picks from temp items without replacement", () => {
    const picker = new RandexPicker(["a", "b", "c"]);
    const randomSpy = jest.spyOn(RandexSetUtil, "randomSingleNumber");

    randomSpy.mockReturnValueOnce(1).mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(picker.pick(3)).toEqual(["b", "a", "c"]);
    expect((picker as any)._tempItems).toEqual([]);

    randomSpy.mockRestore();
  });

  it("keeps refilling until it returns the requested count", () => {
    const picker = new RandexPicker([1, 2]);
    const randomSpy = jest.spyOn(RandexSetUtil, "randomSingleNumber");

    randomSpy.mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(picker.pick(5)).toEqual([1, 2, 2, 1, 1]);
    expect((picker as any)._tempItems).toEqual([2]);

    randomSpy.mockRestore();
  });

  it("refills temp items until the requested count is reached", () => {
    const picker = new RandexPicker(["x", "y"]);
    const randomSpy = jest.spyOn(RandexSetUtil, "randomSingleNumber");

    randomSpy.mockReturnValueOnce(1).mockReturnValueOnce(0).mockReturnValueOnce(0);

    expect(picker.pick(3)).toEqual(["y", "x", "x"]);
    expect((picker as any)._tempItems).toEqual(["y"]);

    randomSpy.mockRestore();
  });
});
