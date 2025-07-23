import type { Metadata } from "next";
import { IndividualHeader } from "@/components/IndividualHeader";
import { IndividualSidebar } from "@/components/sidebars/IndividualSidebar";
import { SearchProvider } from "@/contexts/SearchContext";
import { MobileNavBar } from "@/components/MobileNavBar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    template: "%s - Iscan Individuals Dashboard",
    absolute: "Iscan Dashboard",
  },
  description:
    "Iscan Individuals Dashboard for managing your users, orders and settings.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SearchProvider>
      <div className="min-h-screen py-2 px-2 md:px-5 lg:px-10 pb-10 w-full max-w-7xl mx-auto space-y-10">
        <IndividualHeader />
        <div className="flex flex-1 md:gap-8">
          <IndividualSidebar />
          <main className="flex-1">{children}</main>
          <MobileNavBar />
        </div>
      </div>
      <Toaster />
    </SearchProvider>
  );
}
