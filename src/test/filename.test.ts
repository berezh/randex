import { RandexSetUtil } from "../basic/set";
import { Randex } from "../custom";
import { RandexRange } from "../interfaces";
import { TestUtil } from "./test-util";

const r = RandexSetUtil;

function splitFileName(fullFileName: string) {
  const matches = fullFileName.match(/\.[a-z]+$/);
  let extension = matches?.[0] || "";
  const fileName = fullFileName.replace(extension, "");
  extension = extension.replace(/^\./, "");
  return [fileName, extension];
}

function testFileName(options: { fullFileName: string; fileNameLength?: RandexRange; extensionLength?: RandexRange; extension?: string }) {
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
      const fullFileName = Randex.fileName();
      testFileName({ fullFileName });
    });
  });

  it("params: fileNameLength", () => {
    const fileNameLength: RandexRange = [10, 15];

    TestUtil.loop(() => {
      let fullFileName = Randex.fileName({ fileNameLength });
      testFileName({ fullFileName, fileNameLength });

      fullFileName = Randex.fileName(fileNameLength);
      testFileName({ fullFileName, fileNameLength });
    });
  });

  it("params: extensionLength", () => {
    const extensionLength: RandexRange = [10, 15];

    TestUtil.loop(() => {
      let fullFileName = Randex.fileName({ extensionLength });
      testFileName({ fullFileName, extensionLength });

      fullFileName = Randex.fileName(r.defaultFileNameLength, extensionLength);
      testFileName({ fullFileName, fileNameLength: r.defaultFileNameLength, extensionLength });
    });
  });

  it("params2: extension", () => {
    const fileNameLength: RandexRange = [10, 15];
    const extension = "xml";

    TestUtil.loop(() => {
      let fullFileName = Randex.fileName({ extension });
      testFileName({ fullFileName, extension });

      fullFileName = Randex.fileName(extension);
      testFileName({ fullFileName, extension });

      fullFileName = Randex.fileName("." + extension);
      testFileName({ fullFileName, extension });

      fullFileName = Randex.fileName(fileNameLength, extension);
      testFileName({ fullFileName, fileNameLength, extension });
    });
  });
});
