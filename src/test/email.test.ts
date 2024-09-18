import { RandexSetUtil } from "../basic/set";
import { randomEmail } from "../custom/email";
import { RandexLength } from "../interfaces";
import { TestUtil } from "./test-util";

const r = RandexSetUtil;

function splitEmail(email: string) {
  const [prefix, domain] = email.split("@");
  const [lowDomain, hightDomain] = domain.split(".");
  return [prefix, domain, lowDomain, hightDomain];
}

function testEmail(options: { email: string; prefixLength?: RandexLength; hightDomainLength?: RandexLength; lowDomainLength?: RandexLength; domain?: string }) {
  const {
    email,
    prefixLength = r.defaultEmailPrefixLength,
    hightDomainLength = r.defaultHightDomainEmailLength,
    lowDomainLength = r.defaultLowDomainEmailLength,
    domain: emailDomain,
  } = options;

  const [prefix, domain, lowDomain, hightDomain] = splitEmail(email);

  // // last char only english
  TestUtil.testInSet(prefix, [["english", "l"], "number"], prefixLength);
  if (emailDomain) {
    expect(emailDomain).toBe(domain);
  } else {
    TestUtil.testInSet(lowDomain, ["english"], lowDomainLength);
    TestUtil.testInSet(hightDomain, ["english"], hightDomainLength);
  }
}

describe("randomEmail", () => {
  it("simple", () => {
    TestUtil.loop(() => {
      const email = randomEmail();
      testEmail({ email });
    });
  });

  it("options: prefixLength", () => {
    const prefixLength: RandexLength = [10, 15];
    TestUtil.loop(() => {
      let email = randomEmail({ prefixLength });
      testEmail({ email, prefixLength });

      email = randomEmail(prefixLength);
      testEmail({ email, prefixLength });
    });
  });

  it("options: hightDomainLength, lowDomainLength", () => {
    const hightDomainLength: RandexLength = 8;
    const lowDomainLength: RandexLength = 12;
    TestUtil.loop(() => {
      let email = randomEmail({ hightDomainLength, lowDomainLength });
      testEmail({ email, hightDomainLength, lowDomainLength });

      email = randomEmail(r.defaultEmailPrefixLength, lowDomainLength, hightDomainLength);
      testEmail({ email, hightDomainLength, lowDomainLength, prefixLength: r.defaultEmailPrefixLength });
    });
  });

  it("options: domain", () => {
    const domain = "delta.com";
    TestUtil.loop(() => {
      let email = randomEmail({ domain });
      testEmail({ email, domain });

      email = randomEmail(domain);
      testEmail({ email, domain });
    });
  });
});
