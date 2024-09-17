import { random } from "../basic";

export function randomEmail() {
  return (
    random(["english", "l"], [[["english", "l"], "number"], 10], ["english", "l"]) +
    "@" +
    random(["english", "l"], [["english", "l"], "-", [0, 5]], ["english", "l"]) +
    "." +
    random([
      ["english", "l"],
      [2, 4],
    ])
  );
}
