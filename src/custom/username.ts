import { random } from "../basic";
import { RandexSetUtil } from "../basic/set";
import { RandexLength } from "../interfaces";

export interface RandexUsernameOptions {
  length?: RandexLength;
}

export function randomUsername(options?: RandexUsernameOptions) {
  const { length } = options || {};
  const currentLength = RandexSetUtil.getLength(1, length, [6, 10]);

  return random(["english", "l"], [[["english", "l"], "number"], currentLength]);
}
