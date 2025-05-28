import localFont from "next/font/local";
import Logo from "@/assets/logo.png";
import { SettingsSideBar } from "@/components/SettingsSideBar";
import "../globals.css";
import { SettingHeader } from "@/components/SettingHeader";
import { Metadata } from "next";

const neuliss = localFont({
  src: "../../assets/fonts/neulis-alt-light.woff2",
});

export const metadata: Metadata = {
  title: "Settings - iScan Dashboard",
  description: "Manage your account settings and preferences.",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"en"}>
      <body
        className={`${neuliss.className} antialiased bg-[#F5F5F5] text-foreground`}
      >
        <div className="min-h-screen py-2 px-2 md:px-5 lg:px-10 pb-10 w-full max-w-7xl mx-auto md:space-y-10">
          <SettingHeader />
          <div className="flex flex-1 md:gap-8">
            <SettingsSideBar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
