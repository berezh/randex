import { random } from "../basic";

export function randomUsername() {
  return random("alphabetLower", [
    ["alphabetLower", "number"],
    [5, 10],
  ]);
}
