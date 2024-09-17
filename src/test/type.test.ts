import { RandexTypeParser } from "../basic/type";

function isLength(value: any, expectedResult = true) {
  const result = RandexTypeParser.isLength(value);
  expect(expectedResult).toBe(result);
}

function isSetSingle(value: any, expectedResult = true) {
  const result = RandexTypeParser.isSetSingle(value);
  expect(expectedResult).toBe(result);
}

function isSet(value: any, expectedResult = true) {
  const result = RandexTypeParser.isSet(value);
  expect(expectedResult).toBe(result);
}

describe("type", () => {
  it("isLength", () => {
    // true
    isLength(1);
    isLength([1, 2]);

    // false
    isLength([1, 2, 3], false);
    isLength("hi", false);
    isLength(null, false);
  });

  it("isSetSingle", () => {
    // true
    isSetSingle("english");
    isSetSingle("hex");
    isSetSingle(["english", "lower"]);

    // false
    isSetSingle("bric", false);
    isSetSingle("hexeron", false);
    isSetSingle(["bric", "lower"], false);
    isSetSingle(1, false);
    isSetSingle(null, false);
    isSetSingle(["lower", "english"], false);
  });

  it("RandomSet", () => {
    // true single
    isSet("english");
    isSet("hex");
    isSet(["english", "lower"]);
    // true array
    isSet(["english", "hex", ["english", "u"]]);

    // false single
    isSet("bric", false);
    isSet("hexeron", false);
    isSet(["bric", "lower"], false);
    isSet(1, false);
    isSet(null, false);
    // false array
    isSet(["hex", 2], false);
    isSet(["english", "hex", ["u", "english"]], false);
  });
});
