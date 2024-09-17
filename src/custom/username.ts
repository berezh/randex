import { random } from "../basic";

export function randomUsername() {
  return random(
    ["english", "l"],
    [
      [["english", "l"], "number"],
      [5, 10],
    ]
  );
}
