import { random } from "../basic";
import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexLength } from "../interfaces";

interface BasicFileNameOptions {
  fileNameLength?: RandexLength;
}

interface ExtensionLengthFileNameOptions {
  extensionLength?: RandexLength;
}

interface ExtensionFileNameOptions {
  extension?: string;
}

export type RandexFileNameOptions = BasicFileNameOptions & (ExtensionFileNameOptions | ExtensionLengthFileNameOptions);

export function randomFileName(options?: RandexFileNameOptions);
export function randomFileName(fileNameLength: RandexLength, extensionLength?: RandexLength);
export function randomFileName(fileNameLength: RandexLength, extension: string);
export function randomFileName(extension: string);
export function randomFileName(p1?: any, p2?: any) {
  let fileNameLength: RandexLength = RandexSetUtil.getLength(1, RandexSetUtil.defaultFileNameLength, RandexSetUtil.defaultFileNameLength);
  let extensionLength: RandexLength = RandexSetUtil.defaultExtensionLength;
  let extension = "";

  if (RandexTypeParser.isLength(p1)) {
    fileNameLength = p1;
    if (RandexTypeParser.isLength(p2)) {
      extensionLength = p2;
    } else if (typeof p2 === "string") {
      extension = p2;
    }
  } else if (typeof p1 === "string") {
    extension = p1;
  } else if (typeof p1 === "object") {
    if (p1.fileNameLength) {
      fileNameLength = p1.fileNameLength;
    }
    if (p1.extensionLength) {
      extensionLength = p1.extensionLength;
    }
    if (p1.extension) {
      extension = p1.extension;
    }
  }

  if (!extension) {
    extension = random([["english", "l"], extensionLength]);
  }

  return (
    random([["english", "number"], RandexSetUtil.fileNameExtraChars, fileNameLength]) +
    random(["english", "number"]) +
    "." +
    (extension ? extension.replace(/^\./, "") : random([["english", "l"], extensionLength]))
  );
}
