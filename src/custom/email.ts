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
