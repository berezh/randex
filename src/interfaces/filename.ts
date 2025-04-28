import { RandexNumberRange } from "./base";

interface BasicFileNameOptions {
  fileNameLength?: RandexNumberRange;
}

interface ExtensionLengthFileNameOptions {
  extensionLength?: RandexNumberRange;
}

interface ExtensionFileNameOptions {
  extension?: string;
}

export type RandexFileNameOptions = BasicFileNameOptions & (ExtensionFileNameOptions | ExtensionLengthFileNameOptions);
