import { RandexRange } from "./base";

interface BasicFileNameOptions {
  fileNameLength?: RandexRange;
}

interface ExtensionLengthFileNameOptions {
  extensionLength?: RandexRange;
}

interface ExtensionFileNameOptions {
  extension?: string;
}

export type RandexFileNameOptions = BasicFileNameOptions & (ExtensionFileNameOptions | ExtensionLengthFileNameOptions);
