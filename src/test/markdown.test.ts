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
    let value = randomFileName();

    value = randomFileName({
      extension: "txt",
    });
    value = randomFileName("txt");

    value = randomFileName({
      fileNameLength: [7, 10],
      extensionLength: 5,
    });
    value = randomFileName([7, 10], 5);

    value = randomFileName({
      fileNameLength: 8,
      extension: "xml",
    });
    value = randomFileName(8, "xml");

    expect(value).toBeTruthy();
  });

  it("randomUsername", () => {
    const value = randomUsername();

    expect(value).toBeTruthy();
  });

  it("randomEmail", () => {
    let value = randomEmail();

    value = randomEmail({
      prefixLength: 8,
    });
    value = randomEmail(8);

    value = randomEmail({
      prefixLength: 8,
      lowDomainLength: 4,
      hightDomainLength: 2,
    });
    value = randomEmail(8, 4, 2);

    value = randomEmail({
      domain: "test.com",
    });
    value = randomEmail("test.com");

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
