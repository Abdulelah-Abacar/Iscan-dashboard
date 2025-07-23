import { AdminSettingsSideBar } from "@/components/sidebars/AdminSettingsSideBar";
import { SettingHeader } from "@/components/SettingHeader";
import { Metadata } from "next";

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
        <div className="min-h-screen py-2 px-2 md:px-5 lg:px-10 pb-10 w-full max-w-7xl mx-auto md:space-y-10">
          <SettingHeader />
          <div className="flex flex-1 md:gap-8">
            <AdminSettingsSideBar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
  );
}
