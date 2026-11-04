import type idMessages from "../../messages/id.json";

type MessagesType = typeof idMessages;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends MessagesType {}
}

declare module "use-intl" {
  interface AppConfig {
    Messages: MessagesType;
  }
}

declare module "next-intl" {
  interface AppConfig {
    Messages: MessagesType;
  }
}
