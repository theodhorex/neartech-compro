import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { hasLocale, routing, type Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};

  const t = await getTranslations({ locale, namespace: "metadata" });

  const ogLocales: Record<Locale, string> = {
    id: "id_ID",
    en: "en_US",
    zh: "zh_CN",
    "zh-TW": "zh_TW",
    ko: "ko_KR",
  };

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        id: "/id",
        en: "/en",
        zh: "/zh",
        "zh-TW": "/zh-TW",
        ko: "/ko",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: ogLocales[locale as Locale] ?? "id_ID",
      siteName: "NearTech",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} antialiased`}>
      <head>
        <link
          rel="preconnect"
          href="https://db.onlinewebfonts.com"
        />
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/9d4d074c9335825a23cce178ee03b498?family=P22+Mackinac+W01+Book"
        />
      </head>
      <body className="min-h-screen bg-bg text-ink font-sans antialiased overflow-x-hidden selection:bg-ink selection:text-bg">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
