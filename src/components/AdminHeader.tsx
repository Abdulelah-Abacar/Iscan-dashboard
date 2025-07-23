"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Menu, ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/assets/logo.png";
import { SearchBar } from "./SearchBar";
import { AdminUserMenu } from "./AdminUserMenu";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSearch } from "@/contexts/SearchContext";
import { useTranslations, useLocale } from "next-intl";

export function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchMode } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("header");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleGoBack = () => {
    router.back();
  };

  // Define routes where header should be hidden
  const hiddenRoutes = [
    /^\/admin\/orders\/[^\/]+$/, // matches /orders/[id]
    /^\/admin\/clients\/[^\/]+$/, // matches /clients/[id]
    /^\/admin\/products\/create$/, // matches /product/create
    /^\/admin\/blogs\/create$/, // matches /blogs/create
  ];

  // Check if current route matches any hidden routes
  const shouldHideHeader = hiddenRoutes.some((route) => route.test(pathname));

  // Return null if header should be hidden
  if (shouldHideHeader) {
    return null;
  }

  // Navigation items for better maintainability
  const navigationItems = [
    { href: "/", label: t("navigation.home") },
    { href: "/orders", label: t("navigation.orders") },
    { href: "/products", label: t("navigation.products") },
    { href: "/clients", label: t("navigation.clients") },
    { href: "/rating", label: t("navigation.rating") },
    { href: "/analytics", label: t("navigation.analytics") },
    { href: "/discounts", label: t("navigation.discounts") },
    { href: "/blogs", label: t("navigation.blogs") },
    { href: "/settings", label: t("navigation.settings") },
    { href: "#", label: t("navigation.account") },
  ];

  return (
    <header className={`w-full relative px-4 md:px-6 py-2 md:py-0 ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Overlay for user menu when open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={toggleMenu}
        >
          <div
            className={`absolute top-0 z-40 ${
              isRTL 
                ? "right-4 md:right-[32%]" 
                : "left-4 md:left-[22%]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <AdminUserMenu />
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <div
            className={`bg-white w-4/5 max-w-xs h-full flex flex-col px-6 py-1 ${
              isRTL ? "mr-auto" : "ml-auto"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">{t("menu.title")}</span>
              <button onClick={toggleMobileMenu} className="p-2">
                {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </button>
            </div>

            {/* Mobile menu content */}
            <div className="flex items-center gap-2 mb-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <span className="text-lg">
                  {t("greeting.hello")}, <strong>{t("greeting.name")}</strong>
                </span>
                <br />
                <b className="text-gray-500 text-xs">{t("greeting.role")}</b>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 hover:bg-gray-100 rounded ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <nav className={`flex justify-between ${searchMode === "client" ? "items-start" : "items-center"} `}>
        {/* Mobile hamburger menu - only visible on small screens */}
        <button
          className="hidden md:flex lg:hidden items-center p-2"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>

        {/* User profile - hidden on mobile, visible on larger screens */}
        <div className={`hidden lg:flex gap-2 items-center relative z-30 ${
          isRTL 
            ? "pr-0 md:pr-12" 
            : "pl-0 md:pl-12"
        }`}>
          <Avatar className="w-10 h-10 md:w-14 md:h-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className={`flex gap-2 items-center justify-center`}>
            <div className={isRTL ? "text-right" : "text-left"}>
              <span className="text-base md:text-xl">
                {t("greeting.hello")}, <strong>{t("greeting.name")}</strong>
              </span>
              <br />
              <b className="text-gray-500 text-xs">{t("greeting.role")}</b>
            </div>
            <div
              className="bg-white rounded-full flex items-center justify-center p-0.5 scale-75 cursor-pointer"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </div>
          </div>
        </div>

        {/* Search bar - hidden on small screens, shown on medium and up */}
        <div className="hidden md:flex justify-center items-center flex-1 mx-4">
          <SearchBar />
        </div>

        {/* Logo area - centered on mobile, right aligned on desktop */}
        <div
          className="hidden md:flex items-center cursor-pointer"
          onClick={handleGoBack}
        >
          <Image
            src={Logo}
            alt={t("logo.alt")}
            className="h-8 w-auto md:h-12"
            height={48}
            width={48}
            priority
          />
        </div>
      </nav>

      {/* Mobile search bar - only visible below medium screens */}
      <div className="mt-4 md:hidden">
        <SearchBar isMobile={true} />
      </div>
    </header>
  );
}