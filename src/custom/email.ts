import { random } from "../basic";
import { RandexSetUtil } from "../basic/set";
import { RandexTypeParser } from "../basic/type";
import { RandexLength } from "../interfaces";

interface BasicEmailOptions {
  prefixLength?: RandexLength;
}

interface DomainLengthEmailOptions {
  hightDomainLength?: RandexLength;
  lowDomainLength?: RandexLength;
}

interface DomainEmailOptions {
  domain?: string;
}

export type RandexEmailOptions = BasicEmailOptions & (DomainLengthEmailOptions | DomainEmailOptions);

export function randomEmail(options?: RandexEmailOptions);
export function randomEmail(prefixLength: RandexLength, lowDomainLength?: RandexLength, hightDomainLength?: RandexLength);
export function randomEmail(domain: string);
export function randomEmail(p1?: any, p2?: any, p3?: any) {
  let prefixLength: RandexLength = RandexSetUtil.defaultEmailPrefixLength;
  let hightDomainLength: RandexLength = RandexSetUtil.defaultHightDomainEmailLength;
  let lowDomainLength: RandexLength = RandexSetUtil.defaultLowDomainEmailLength;
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
    domain = random([["english", "l"], lowDomainLength]) + "." + random([["english", "l"], hightDomainLength]);
  }

  return random([[["english", "l"], "number"], prefixLength]) + "@" + domain;
}
