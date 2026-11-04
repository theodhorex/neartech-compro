import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NearTech — Teknologi yang dekat dengan bisnis Anda",
  description:
    "Mitra teknologi untuk bisnis yang sedang bertumbuh, dari strategi dan produk digital hingga rekayasa dan dukungan berkelanjutan.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} antialiased`}>
      <head>
        <link
          rel="preconnect"
          href="https://db.onlinewebfonts.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/9d4d074c9335825a23cce178ee03b498?family=P22+Mackinac+W01+Book"
        />
      </head>
      <body className="min-h-screen bg-white text-[#191919] font-sans antialiased overflow-x-hidden selection:bg-[#191919] selection:text-white">
        {children}
      </body>
    </html>
  );
}
