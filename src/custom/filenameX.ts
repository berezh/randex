import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexFileNameOptions, RandexNumberRange } from "../interfaces";
import { randexRandom } from "./random";

export function randexFileName(options?: RandexFileNameOptions): string;

export function randexFileName(fileNameLength: RandexNumberRange, extensionLength?: RandexNumberRange): string;

export function randexFileName(fileNameLength: RandexNumberRange, extension: string): string;

export function randexFileName(extension: string): string;

export function randexFileName(p1?: any, p2?: any): string {
  let fileNameLength = RandexSetUtil.defaultFileNameLength;
  let extensionLength: RandexNumberRange = RandexSetUtil.defaultExtensionLength;
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

  fileNameLength = RandexSetUtil.getLength(1, fileNameLength, fileNameLength);

  if (!extension) {
    extension = randexRandom([["english", "l"], extensionLength]);
  }

  return (
    randexRandom([["english", "number"], RandexSetUtil.fileNameExtraChars, fileNameLength]) +
    randexRandom(["english", "number"]) +
    "." +
    (extension ? extension.replace(/^\./, "") : randexRandom([["english", "l"], extensionLength]))
  );
}
