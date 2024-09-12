import { random } from "../basic";

export interface RandomFileNameOptions {
  extension?: string;
}

export function randomFileName(options?: RandomFileNameOptions) {
  const { extension } = options || {};

  return random([["alphabet", "number"], "_.", [5, 10]]) + random(["alphabet", "number"]) + "." + (extension ? extension : random(["alphabetLower", [2, 5]]));
}
