"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Menu, ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/assets/logo.png";
import { SearchBar } from "./SearchBar";
import { IndividualUserMenu } from "./IndividualUserMenu";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSearch } from "@/contexts/SearchContext";
import { useTranslations, useLocale } from "next-intl";

export function IndividualHeader() {
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
            <IndividualUserMenu />
          </div>
        </div>
      )}

      <nav className={`flex justify-between ${searchMode === "client" ? "items-start" : "items-center"} `}>

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