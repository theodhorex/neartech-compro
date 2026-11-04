import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en", "zh", "zh-TW", "ko"] as const,
  defaultLocale: "id",
});

export type Locale = (typeof routing.locales)[number];

export const hasLocale = (locale: string): locale is Locale =>
  (routing.locales as readonly string[]).includes(locale);
