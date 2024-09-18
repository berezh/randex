import { random } from "../basic";
import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexLength } from "../interfaces";

export interface RandexUsernameOptions {
  length?: RandexLength;
}

export function randomUsername(options?: RandexUsernameOptions | RandexLength) {
  const length: RandexLength | undefined = RandexTypeParser.isLength(options) ? options : options?.length;
  const currentLength = RandexSetUtil.getLength(1, length, [6, 10]);

  return random(["english", "l"], [[["english", "l"], "number"], currentLength]);
}
