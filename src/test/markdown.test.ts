import { random } from "../basic";
import { randomEmail, randomFileName, randomFullName, randomName, randomUsername } from "../custom";

describe("markdown", () => {
  it("random", () => {
    let value = random({
      set: "english",
      length: 3,
    });
    expect(value.length).toBe(3);
    value = random(["english", 3]);
    expect(value.length).toBe(3);
    //
    value = random({
      set: ["english", "lower"],
      length: 3,
    });
    expect(value.length).toBe(3);
    value = random([["english", "lower"], 3]);
    expect(value.length).toBe(3);
    //
    value = random({
      set: "english",
      length: [1, 3],
    });
    expect(value.length).toBeLessThanOrEqual(3);
    value = random(["english", [1, 3]]);
    expect(value.length).toBeLessThanOrEqual(3);
    //
    value = random({
      set: "number",
      length: 3,
    });
    expect(value.length).toBe(3);
    value = random(["number", 3]);
    expect(value.length).toBe(3);
    //
    value = random({
      range: "abc123",
      length: 3,
    });
    expect(value.length).toBe(3);

    //
    value = random({
      set: ["english", "number"],
      length: 3,
    });
    expect(value.length).toBe(3);
    value = random([["english", "number"], 3]);
    expect(value.length).toBe(3);
    //
    value = random(
      {
        set: "english",
        length: 2,
      },
      {
        set: ["english", "number"],
        length: 2,
      }
    );
    expect(value.length).toBe(4);
    value = random(["english", 2], [["english", "number"], 2]);
    expect(value.length).toBe(4);
  });

  it("randomFileName", () => {
    const value = randomFileName({
      extension: "txt",
    });

    expect(value).toBeTruthy();
  });

  it("randomUsername", () => {
    const value = randomUsername();

    expect(value).toBeTruthy();
  });

  it("randomEmail", () => {
    const value = randomEmail();

    expect(value).toBeTruthy();
  });

  it("randomName", () => {
    let value = randomName();
    expect(value).toBeTruthy();
    value = randomName({ alphabet: "french" });
    expect(value).toBeTruthy();
    value = randomName({ length: 5 });
    expect(value).toBeTruthy();
    value = randomName({ length: [2, 5] });
    expect(value).toBeTruthy();
  });

  it("randomFullName", () => {
    const value = randomFullName();
    expect(value).toBeTruthy();
  });
});
