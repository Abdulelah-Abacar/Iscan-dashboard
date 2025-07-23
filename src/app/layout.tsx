import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

const neuliss = localFont({
  src: "../assets/fonts/neulis-alt-light.woff2",
});

export const metadata: Metadata = {
  title: "Iscan",
  description: "Iscan Home",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${neuliss.className} antialiased bg-[#F5F5F5] text-foreground`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
