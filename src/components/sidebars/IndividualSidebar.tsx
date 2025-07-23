"use client";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "../ui/tooltip";
import { BarChart, CircleFadingPlus, CreditCard, Gift, PaintbrushVertical, Puzzle, Settings } from "lucide-react";

import HomeIcon from "@/assets/icons/Home";
import UserCircle from "@/assets/icons/UseCircle";
import { SidebarItem } from "../SidebarItem";

export function IndividualSidebar() {
  const currentPath = usePathname();

  const sidebarItems = [
    { path: "/individuals", icon: HomeIcon, label: "Home" },
    { path: "/individuals/theme", icon: PaintbrushVertical, label: "Theme", },
    { path: "/individuals/social-media", icon: CircleFadingPlus, label: "Social Media" },
    { path: "/individuals/contact", icon: UserCircle, label: "Contact" },
    { path: "/individuals/cards", icon: CreditCard, label: "Card" },
    { path: "/individuals/add-ons", icon: Puzzle, label: "Add Ons" },
    { path: "/individuals/elite-gifts", icon: Gift, label: "Elite Gifts" },
    { path: "/individuals/analytics", icon: BarChart, label: "Analytics" },
  ];

  return (
    <aside className="h-full hidden lg:flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-8 non invisible">S</h1>
      <div className="w-20 flex flex-col items-center gap-3">
        <TooltipProvider>
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <SidebarItem
                key={item.label}
                item={item}
                isActive={isActive}
                notificationCount={item.notificationCount}
              />
            );
          })}
        </TooltipProvider>
      </div>
    </aside>
  );
}
