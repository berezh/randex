import { RandexRange } from "./base";

interface BasicEmailOptions {
  prefixLength?: RandexRange;
}

interface DomainLengthEmailOptions {
  hightDomainLength?: RandexRange;
  lowDomainLength?: RandexRange;
}

interface DomainEmailOptions {
  domain?: string;
}

export type RandexEmailOptions = BasicEmailOptions & (DomainLengthEmailOptions | DomainEmailOptions);
