import { RandexFrequencySpread } from "../index";

describe("RandexFrequencySpread", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("selects using fractional weights and their boundaries", () => {
    const spreader = new RandexFrequencySpread([
      ["a", 0.25],
      ["b", 0.75],
    ]);
    const randomSpy = jest.spyOn(Math, "random");
    randomSpy.mockReturnValueOnce(0).mockReturnValueOnce(0.249).mockReturnValueOnce(0.25).mockReturnValueOnce(0.999);

    expect(spreader.isEmpty).toBe(false);
    expect(spreader.spread(4)).toEqual(["a", "a", "b", "b"]);
    expect(randomSpy).toHaveBeenCalledTimes(4);
    expect(spreader.isEmpty).toBe(false);
  });

  it("draws independently across calls without depleting weights", () => {
    const spreader = new RandexFrequencySpread([
      ["a", 2],
      ["b", 1],
    ]);
    jest.spyOn(Math, "random").mockReturnValue(0);

    expect(spreader.spread()).toEqual(["a"]);
    expect(spreader.spread(6)).toEqual(["a", "a", "a", "a", "a", "a"]);
    expect(spreader.isEmpty).toBe(false);
    expect(spreader.spread(2)).toEqual(["a", "a"]);
    expect(spreader.isEmpty).toBe(false);
  });

  it("uses relative weights rather than requiring a total of one", () => {
    const spreader = new RandexFrequencySpread([
      ["a", 0.5],
      ["b", 1.5],
      ["c", 3],
    ]);
    jest.spyOn(Math, "random").mockReturnValueOnce(0.099).mockReturnValueOnce(0.1).mockReturnValueOnce(0.4);

    expect(spreader.spread(3)).toEqual(["a", "b", "c"]);
  });

  it("matches the specified probabilities over evenly spaced draws", () => {
    const spreader = new RandexFrequencySpread([
      ["a", 0.5],
      ["b", 1.5],
    ]);
    let draw = 0;
    jest.spyOn(Math, "random").mockImplementation(() => (draw++ + 0.5) / 1000);

    const result = spreader.spread(1000);
    expect(result.filter(item => item === "a")).toHaveLength(250);
    expect(result.filter(item => item === "b")).toHaveLength(750);
  });

  it("skips zero frequencies and preserves item references", () => {
    const item = { name: "a" };
    const spreader = new RandexFrequencySpread([
      [{ name: "unused" }, 0],
      [item, 2],
      [{ name: "also unused" }, 0],
    ]);
    jest.spyOn(Math, "random").mockReturnValue(0);

    expect(spreader.spread(4)).toEqual([item, item, item, item]);
    expect(spreader.spread()[0]).toBe(item);
    jest.spyOn(Math, "random").mockReturnValue(0.999);
    expect(spreader.spread()[0]).toBe(item);
  });

  it("returns empty results for empty pools and non-positive counts", () => {
    const empty = new RandexFrequencySpread();
    const zero = new RandexFrequencySpread([["a", 0]]);
    const spreader = new RandexFrequencySpread([["a", 1]]);

    expect(empty.isEmpty).toBe(true);
    expect(empty.spread(3)).toEqual([]);
    expect(zero.isEmpty).toBe(true);
    expect(zero.spread()).toEqual([]);
    expect(spreader.spread(0)).toEqual([]);
    expect(spreader.spread(-1)).toEqual([]);
    expect(spreader.isEmpty).toBe(false);
  });

  it("snapshots input frequencies and items", () => {
    const items: [string, number][] = [["a", 2]];
    const spreader = new RandexFrequencySpread(items);
    items[0][0] = "b";
    items[0][1] = 0;
    items.push(["c", 1]);

    expect(spreader.spread(4)).toEqual(["a", "a", "a", "a"]);
  });

  it("accepts readonly tuples and large frequencies without expanding the pool", () => {
    const items = [["a", Number.MAX_VALUE]] as const;
    const spreader = new RandexFrequencySpread(items);

    expect(spreader.spread()).toEqual(["a"]);
    expect(spreader.isEmpty).toBe(false);
  });

  it("preserves duplicate entries", () => {
    const spreader = new RandexFrequencySpread([
      ["a", 1],
      ["a", 2],
    ]);

    expect(spreader.spread(3)).toEqual(["a", "a", "a"]);
    expect(spreader.isEmpty).toBe(false);
  });

  it.each([-1, NaN, Infinity, -Infinity])("rejects invalid frequency %s", frequency => {
    expect(() => new RandexFrequencySpread([["a", frequency]])).toThrow(RangeError);
  });

  it("rejects overflowing total frequencies", () => {
    expect(
      () =>
        new RandexFrequencySpread([
          ["a", Number.MAX_VALUE],
          ["b", Number.MAX_VALUE],
        ])
    ).toThrow(RangeError);
  });

  it.each([1.5, NaN, Infinity, -Infinity, Number.MAX_SAFE_INTEGER + 1])("rejects invalid count %s", count => {
    const spreader = new RandexFrequencySpread([["a", 1]]);

    expect(() => spreader.spread(count)).toThrow(RangeError);
    expect(spreader.isEmpty).toBe(false);
  });
});
