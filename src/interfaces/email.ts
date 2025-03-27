import { RandexLength } from "./base";

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
