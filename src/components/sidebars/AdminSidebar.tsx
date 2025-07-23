"use client";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "../ui/tooltip";
import { BarChart, Calculator, Rocket } from "lucide-react";

import HomeIcon from "@/assets/icons/Home";
import Product from "@/assets/icons/Product";
import Discount from "@/assets/icons/Discount";
import Inbox from "@/assets/icons/Inbox";
import Pencil from "@/assets/icons/Pencil";
import UserCircle from "@/assets/icons/UseCircle";
import Star from "@/assets/icons/Star";
import { SidebarItem } from "../SidebarItem";

export function AdminSidebar() {
  const currentPath = usePathname();

  const sidebarItems = [
    { path: "/admin", icon: HomeIcon, label: "Home" },
    { path: "/admin/orders", icon: Inbox, label: "Orders", notificationCount: 6 },
    { path: "/admin/products", icon: Product, label: "Products" },
    { path: "/admin/clients", icon: UserCircle, label: "Clients" },
    { path: "/admin/rating", icon: Star, label: "Rating" },
    { path: "/admin/analytics", icon: BarChart, label: "Analytics" },
    { path: "/admin/activator", icon: Rocket, label: "Activator" },
    { path: "/admin/calculator", icon: Calculator, label: "Calculator" },
    { path: "/admin/discounts", icon: Discount, label: "Discounts" },
    { path: "/admin/blogs", icon: Pencil, label: "Blog" },
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
