"use client";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "./ui/tooltip";
import { BarChart } from "lucide-react";

import HomeIcon from "@/assets/icons/Home";
import Product from "@/assets/icons/Product";
import Discount from "@/assets/icons/Discount";
import Inbox from "@/assets/icons/Inbox";
import Pencil from "@/assets/icons/Pencil";
import UserCircle from "@/assets/icons/UseCircle";
import Star from "@/assets/icons/Star";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  const currentPath = usePathname();

  const sidebarItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/orders", icon: Inbox, label: "Orders", notificationCount: 6 },
    { path: "/products", icon: Product, label: "Products" },
    { path: "/clients", icon: UserCircle, label: "Clients" },
    { path: "/rating", icon: Star, label: "Rating" },
    { path: "/analytics", icon: BarChart, label: "Analytics" },
    { path: "/discounts", icon: Discount, label: "Discounts" },
    { path: "/blogs", icon: Pencil, label: "Blog" },
  ];

  return (
    <aside className="h-full hidden md:flex flex-col items-center justify-center">
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
