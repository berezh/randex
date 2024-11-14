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
