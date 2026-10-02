import { Randex } from "../custom";

describe("shuffle", () => {
  it("shuffles the array in place and returns it", () => {
    const array = [1, 2, 3];
    const randomSpy = jest.spyOn(Math, "random");
    randomSpy.mockReturnValueOnce(0).mockReturnValueOnce(0.5).mockReturnValueOnce(0.99);

    const result = Randex.shuffle(array);

    expect(result).toBe(array);
    expect(array).toEqual([3, 2, 1]);
    randomSpy.mockRestore();
  });
});
