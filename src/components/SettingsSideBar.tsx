"use client";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "./ui/tooltip";
import { UserCircle, UserPenIcon } from "lucide-react";

import { SidebarItem } from "./SidebarItem";

export function SettingsSideBar() {
  const currentPath = usePathname();

  const sidebarItems = [
    { path: "/settings", icon: UserCircle, label: "Setting" },
    { path: "/settings/info", icon: UserPenIcon, label: "Info" },
  ];

  return (
    <aside className="h-full hidden md:flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-32 non invisible">S</h1>
      <div className="w-20 flex flex-col items-center gap-3">
        <TooltipProvider>
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <SidebarItem key={item.label} item={item} isActive={isActive} />
            );
          })}
        </TooltipProvider>
      </div>
    </aside>
  );
}
