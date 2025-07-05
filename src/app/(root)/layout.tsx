import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { SearchProvider } from "@/contexts/SearchContext";

const neuliss = localFont({
  src: "../../assets/fonts/neulis-alt-light.woff2",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Iscan Dashboard",
    absolute: "Iscan Dashboard",
  },
  description: "Iscan Dashboard for managing your users, orders and settings.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  console.log("lang", lang);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${neuliss.className} antialiased bg-[#F5F5F5] text-foreground`}
      >
        <SearchProvider>
        <div className="min-h-screen py-2 px-2 md:px-5 lg:px-10 pb-10 w-full max-w-7xl mx-auto space-y-10">
          <Header />
          <div className="flex flex-1 md:gap-8">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
        </SearchProvider>
      </body>
    </html>
  );
}
