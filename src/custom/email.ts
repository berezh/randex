import { random } from "../basic";

export function randomEmail() {
  return (
    random("alphabetLower", [["alphabetLower", "number"], 10], "alphabetLower") +
    "@" +
    random("alphabetLower", ["alphabetLower", "-", [0, 5]], "alphabetLower") +
    "." +
    random(["alphabetLower", [2, 4]])
  );
}
