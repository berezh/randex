import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexLength, RandexUsernameOptions } from "../interfaces";
import { randexRandom } from "./random";

export function randexUsername(options?: RandexUsernameOptions | RandexLength) {
  const length: RandexLength | undefined = RandexTypeParser.isLength(options) ? options : options?.length;
  const currentLength = RandexSetUtil.getLength(1, length, [6, 10]);

  return randexRandom(["english", "l"], [[["english", "l"], "number"], currentLength]);
}
