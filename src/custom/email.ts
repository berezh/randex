import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexEmailOptions, RandexRange } from "../interfaces";
import { randexRandom } from "./random";

export function randexEmail(options?: RandexEmailOptions): string;

export function randexEmail(prefixLength: RandexRange, lowDomainLength?: RandexRange, hightDomainLength?: RandexRange): string;

export function randexEmail(domain: string): string;

export function randexEmail(p1?: any, p2?: any, p3?: any): string {
  let prefixLength: RandexRange = RandexSetUtil.defaultEmailPrefixLength;
  let hightDomainLength: RandexRange = RandexSetUtil.defaultHightDomainEmailLength;
  let lowDomainLength: RandexRange = RandexSetUtil.defaultLowDomainEmailLength;
  let domain = "";

  if (RandexTypeParser.isLength(p1)) {
    prefixLength = p1;
    if (RandexTypeParser.isLength(p2)) {
      lowDomainLength = p2;
    }
    if (RandexTypeParser.isLength(p3)) {
      hightDomainLength = p3;
    }
  } else if (typeof p1 === "string") {
    domain = p1;
  } else if (typeof p1 === "object") {
    if (p1.prefixLength) {
      prefixLength = p1.prefixLength;
    }
    if (p1.hightDomainLength) {
      hightDomainLength = p1.hightDomainLength;
    }
    if (p1.lowDomainLength) {
      lowDomainLength = p1.lowDomainLength;
    }
    if (p1.domain) {
      domain = p1.domain;
    }
  }

  if (!domain) {
    domain = randexRandom([["english", "l"], lowDomainLength]) + "." + randexRandom([["english", "l"], hightDomainLength]);
  }

  return randexRandom([[["english", "l"], "number"], prefixLength]) + "@" + domain;
}
