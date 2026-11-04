import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NearTech | Teknologi yang dekat dengan bisnis Anda",
  description:
    "Mitra teknologi untuk bisnis yang sedang bertumbuh, dari strategi dan produk digital hingga rekayasa dan dukungan berkelanjutan.",
  openGraph: {
    title: "NearTech | Teknologi yang dekat dengan bisnis Anda",
    description:
      "Mitra teknologi untuk bisnis yang sedang bertumbuh, dari strategi dan produk digital hingga rekayasa dan dukungan berkelanjutan.",
    type: "website",
    locale: "id_ID",
    siteName: "NearTech",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className={`${inter.variable} antialiased`}>
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
