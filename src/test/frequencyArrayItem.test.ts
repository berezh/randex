import { Randex } from "../custom";

describe("frequencyArrayItem", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("selects the item whose weight contains the random value", () => {
    jest.spyOn(Math, "random").mockReturnValue(2 / 3);

    expect(
      Randex.frequencyArrayItem([
        ["a", 2],
        ["b", 1],
      ])
    ).toBe("b");
  });

  it("does not select zero-weight items", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);

    expect(
      Randex.frequencyArrayItem([
        ["unused", 0],
        ["selected", 1],
      ])
    ).toBe("selected");
  });

  it("throws for an empty array", () => {
    expect(() => Randex.frequencyArrayItem([])).toThrow("Array is empty");
  });
});
