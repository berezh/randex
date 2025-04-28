import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexNumberRange, RandexUsernameOptions } from "../interfaces";
import { randexRandom } from "./random";

export function randexUsername(options?: RandexUsernameOptions | RandexNumberRange) {
  const length: RandexNumberRange | undefined = RandexTypeParser.isLength(options) ? options : options?.length;
  const currentLength = RandexSetUtil.getLength(1, length, [6, 10]);

  return randexRandom(["english", "l"], [[["english", "l"], "number"], currentLength]);
}
