import { Randex } from "../custom";

describe("markdown", () => {
  it("random", () => {
    let value = Randex.random({
      set: "english",
      length: 3,
    });
    expect(value.length).toBe(3);
    value = Randex.random(["english", 3]);
    expect(value.length).toBe(3);
    //
    value = Randex.random({
      set: ["english", "lower"],
      length: 3,
    });
    expect(value.length).toBe(3);
    value = Randex.random([["english", "lower"], 3]);
    expect(value.length).toBe(3);
    //
    value = Randex.random({
      set: "english",
      length: [1, 3],
    });
    expect(value.length).toBeLessThanOrEqual(3);
    value = Randex.random(["english", [1, 3]]);
    expect(value.length).toBeLessThanOrEqual(3);
    //
    value = Randex.random({
      set: "number",
      length: 3,
    });
    expect(value.length).toBe(3);
    value = Randex.random(["number", 3]);
    expect(value.length).toBe(3);
    //
    value = Randex.random({
      charRange: "abc123",
      length: 3,
    });
    expect(value.length).toBe(3);

    //
    value = Randex.random({
      set: ["english", "number"],
      length: 3,
    });
    expect(value.length).toBe(3);
    value = Randex.random([["english", "number"], 3]);
    expect(value.length).toBe(3);
    //
    value = Randex.random(
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
    value = Randex.random(["english", 2], [["english", "number"], 2]);
    expect(value.length).toBe(4);
  });

  it("randomFileName", () => {
    let value = Randex.fileName();

    value = Randex.fileName({
      extension: "txt",
    });
    value = Randex.fileName("txt");

    value = Randex.fileName({
      fileNameLength: [7, 10],
      extensionLength: 5,
    });
    value = Randex.fileName([7, 10], 5);

    value = Randex.fileName({
      fileNameLength: 8,
      extension: "xml",
    });
    value = Randex.fileName(8, "xml");

    expect(value).toBeTruthy();
  });

  it("randomUsername", () => {
    const value = Randex.username();

    expect(value).toBeTruthy();
  });

  it("randomEmail", () => {
    let value = Randex.email();

    value = Randex.email({
      prefixLength: 8,
    });
    value = Randex.email(8);

    value = Randex.email({
      prefixLength: 8,
      lowDomainLength: 4,
      hightDomainLength: 2,
    });
    value = Randex.email(8, 4, 2);

    value = Randex.email({
      domain: "test.com",
    });
    value = Randex.email("test.com");

    expect(value).toBeTruthy();
  });

  it("singleName", () => {
    let value = Randex.singleName();
    expect(value).toBeTruthy();
    value = Randex.singleName({ alphabet: "french" });
    expect(value).toBeTruthy();
    value = Randex.singleName({ length: 5 });
    expect(value).toBeTruthy();
    value = Randex.singleName({ length: [2, 5] });
    expect(value).toBeTruthy();
  });

  it("randomFullName", () => {
    const value = Randex.fullName();
    expect(value).toBeTruthy();
  });
});
