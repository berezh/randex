import { random } from "../basic";

export interface RandomFileNameOptions {
  extension?: string;
}

export function randomFileName(options?: RandomFileNameOptions) {
  const { extension } = options || {};

  return (
    random([["english", "number"], "_.", [5, 10]]) +
    random(["english", "number"]) +
    "." +
    (extension
      ? extension
      : random([
          ["english", "l"],
          [2, 5],
        ]))
  );
}
