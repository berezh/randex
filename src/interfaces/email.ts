import { RandexNumberRange } from "./base";

interface BasicEmailOptions {
  prefixLength?: RandexNumberRange;
}

interface DomainLengthEmailOptions {
  hightDomainLength?: RandexNumberRange;
  lowDomainLength?: RandexNumberRange;
}

interface DomainEmailOptions {
  domain?: string;
}

export type RandexEmailOptions = BasicEmailOptions & (DomainLengthEmailOptions | DomainEmailOptions);
