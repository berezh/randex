import Randex, { RandexFrequencySpreader } from "../index";
import { RandexSetUtil } from "../basic/set";

describe("RandexFrequencySpreader", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("selects remaining occurrences with exact frequencies per cycle", () => {
    const spreader = new RandexFrequencySpreader([
      ["a", 2],
      ["b", 1],
    ]);
    const randomSpy = jest.spyOn(RandexSetUtil, "randomSingleNumber");
    randomSpy.mockReturnValueOnce(2).mockReturnValueOnce(1).mockReturnValueOnce(0);

    expect(spreader.isEmpty).toBe(false);
    expect(spreader.spread(3)).toEqual(["b", "a", "a"]);
    expect(randomSpy.mock.calls).toEqual([[3], [2], [1]]);
    expect(spreader.isEmpty).toBe(true);
  });

  it("persists the cycle across calls and refills automatically", () => {
    const spreader = new RandexFrequencySpreader([
      ["a", 2],
      ["b", 1],
    ]);
    jest.spyOn(RandexSetUtil, "randomSingleNumber").mockReturnValue(0);

    expect(spreader.spread()).toEqual(["a"]);
    expect(spreader.spread(6)).toEqual(["a", "b", "a", "a", "b", "a"]);
    expect(spreader.isEmpty).toBe(false);
    expect(spreader.spread(2)).toEqual(["a", "b"]);
    expect(spreader.isEmpty).toBe(true);
    expect(spreader.spread()).toEqual(["a"]);
  });

  it("never selects zero-frequency entries and preserves references", () => {
    const item = { name: "a" };
    const spreader = new RandexFrequencySpreader([
      [{ name: "unused" }, 0],
      [item, 2],
      [{ name: "also unused" }, 0],
    ]);

    expect(spreader.spread(4)).toEqual([item, item, item, item]);
    expect(spreader.spread()[0]).toBe(item);
  });

  it("returns empty arrays for empty pools and non-positive counts", () => {
    const empty = new RandexFrequencySpreader();
    const zero = new RandexFrequencySpreader([["a", 0]]);
    const spreader = new RandexFrequencySpreader([["a", 1]]);

    expect(empty.isEmpty).toBe(true);
    expect(empty.spread(3)).toEqual([]);
    expect(zero.isEmpty).toBe(true);
    expect(zero.spread()).toEqual([]);
    expect(spreader.spread(0)).toEqual([]);
    expect(spreader.spread(-1)).toEqual([]);
    expect(spreader.isEmpty).toBe(false);
  });

  it("snapshots inputs for subsequent cycles", () => {
    const items: [string, number][] = [["a", 2]];
    const spreader = new RandexFrequencySpreader(items);
    items[0][0] = "b";
    items[0][1] = 0;
    items.push(["c", 1]);

    expect(spreader.spread(4)).toEqual(["a", "a", "a", "a"]);
  });

  it("accepts readonly inputs and large frequencies without expanding the pool", () => {
    const items = [["a", Number.MAX_SAFE_INTEGER]] as const;
    const spreader = new RandexFrequencySpreader(items);

    expect(spreader.spread()).toEqual(["a"]);
    expect(spreader.isEmpty).toBe(false);
  });

  it("preserves duplicate entries", () => {
    const spreader = new RandexFrequencySpreader([
      ["a", 1],
      ["a", 2],
    ]);

    expect(spreader.spread(3)).toEqual(["a", "a", "a"]);
    expect(spreader.isEmpty).toBe(true);
  });

  it.each([-1, 0.5, NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1])("rejects invalid frequency %s", frequency => {
    expect(() => new RandexFrequencySpreader([["a", frequency]])).toThrow(RangeError);
  });

  it("rejects unsafe total frequencies", () => {
    expect(
      () =>
        new RandexFrequencySpreader([
          ["a", Number.MAX_SAFE_INTEGER],
          ["b", 1],
        ])
    ).toThrow(RangeError);
  });

  it.each([0.5, NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1])("rejects invalid count %s", count => {
    const spreader = new RandexFrequencySpreader([["a", 1]]);

    expect(() => spreader.spread(count)).toThrow(RangeError);
    expect(spreader.isEmpty).toBe(false);
  });

  it("uses the frequency spreader through the Randex wrapper", () => {
    jest.spyOn(RandexSetUtil, "randomSingleNumber").mockReturnValue(0);

    expect(
      Randex.frequencySpread(
        [
          ["a", 2],
          ["b", 1],
        ],
        4
      )
    ).toEqual(["a", "a", "b", "a"]);
  });
});
