import { random } from "../basic";

export function randomName() {
  return random("alphabetUpper", ["alphabetLower", [1, 10]]);
}

export function randomFullName() {
  return randomName() + " " + randomName();
}
