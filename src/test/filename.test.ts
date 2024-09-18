import { RandexSetUtil } from "../basic/set";
import { randomFileName } from "../custom/filename";
import { RandexLength } from "../interfaces";
import { TestUtil } from "./test-util";

const r = RandexSetUtil;

function splitFileName(fullFileName: string) {
  const matches = fullFileName.match(/\.[a-z]+$/);
  let extension = matches?.[0] || "";
  const fileName = fullFileName.replace(extension, "");
  extension = extension.replace(/^\./, "");
  return [fileName, extension];
}

function testFileName(options: { fullFileName: string; fileNameLength?: RandexLength; extensionLength?: RandexLength; extension?: string }) {
  const { fullFileName, fileNameLength = r.defaultFileNameLength, extensionLength = r.defaultExtensionLength, extension } = options;

  const [fileName, fileExtension] = splitFileName(fullFileName);
  // last char only english
  TestUtil.testInSet(fileName[fileName.length - 1], ["english", "number"], 1);
  TestUtil.testInSetRange(fileName, ["english", "number"], r.fileNameExtraChars, fileNameLength);
  if (extension) {
    expect(extension).toBe(fileExtension);
  } else {
    TestUtil.testInSet(fileExtension, "english", extensionLength);
  }
}

describe("randomFileName", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const fullFileName = randomFileName();
      testFileName({ fullFileName });
    });
  });

  it("params: fileNameLength", () => {
    const fileNameLength: RandexLength = [10, 15];

    TestUtil.loop(() => {
      let fullFileName = randomFileName({ fileNameLength });
      testFileName({ fullFileName, fileNameLength });

      fullFileName = randomFileName(fileNameLength);
      testFileName({ fullFileName, fileNameLength });
    });
  });

  it("params: extensionLength", () => {
    const extensionLength: RandexLength = [10, 15];

    TestUtil.loop(() => {
      let fullFileName = randomFileName({ extensionLength });
      testFileName({ fullFileName, extensionLength });

      fullFileName = randomFileName(r.defaultFileNameLength, extensionLength);
      testFileName({ fullFileName, fileNameLength: r.defaultFileNameLength, extensionLength });
    });
  });

  it("params: extension", () => {
    const fileNameLength: RandexLength = [10, 15];
    const extension = "xml";

    TestUtil.loop(() => {
      let fullFileName = randomFileName({ extension });
      testFileName({ fullFileName, extension });

      fullFileName = randomFileName(extension);
      testFileName({ fullFileName, extension });

      fullFileName = randomFileName("." + extension);
      testFileName({ fullFileName, extension });

      fullFileName = randomFileName(fileNameLength, extension);
      testFileName({ fullFileName, fileNameLength, extension });
    });
  });
});
