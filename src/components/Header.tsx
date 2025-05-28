"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Menu, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/assets/logo.png";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    /^\/orders\/[^\/]+$/, // matches /orders/[id]
    /^\/clients\/[^\/]+$/, // matches /clients/[id]
    /^\/products\/create$/, // matches /product/create
    /^\/create-post$/, // matches /create-post
  ];

  // Check if current route matches any hidden routes
  const shouldHideHeader = hiddenRoutes.some((route) => route.test(pathname));

  // Return null if header should be hidden
  if (shouldHideHeader) {
    return null;
  }

  return (
    <header className="w-full relative px-4 md:px-6 py-2 md:py-0">
      {/* Overlay for user menu when open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={toggleMenu}
        >
          <div
            className="absolute top-0 left-4 md:left-[12%] z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <UserMenu />
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
            className="bg-white w-4/5 max-w-xs h-full flex flex-col px-6 py-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={toggleMobileMenu} className="p-2">
                <ArrowLeft size={20} />
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
                  Hello, <strong>Omar</strong>
                </span>
                <br />
                <b className="text-gray-500 text-xs">Main Admin</b>
              </div>
            </div>

            {/* We'd add navigation links here */}
            <nav className="flex flex-col gap-4">
              <Link href="/" className="px-2 hover:bg-gray-100 rounded">
                Home
              </Link>
              <Link href="/orders" className="px-2 hover:bg-gray-100 rounded">
                Orders
              </Link>
              <Link href="/products" className="px-2 hover:bg-gray-100 rounded">
                Product
              </Link>
              <Link href="/clients" className="px-2 hover:bg-gray-100 rounded">
                Clients
              </Link>
              <Link href="/rating" className="px-2 hover:bg-gray-100 rounded">
                Rating
              </Link>
              <Link
                href="/analytics"
                className="px-2 hover:bg-gray-100 rounded"
              >
                Analytics
              </Link>
              <Link href="discounts" className="px-2 hover:bg-gray-100 rounded">
                Discount
              </Link>
              <Link href="/blogs" className="px-2 hover:bg-gray-100 rounded">
                Blog
              </Link>
              <Link href="/settings" className="px-2 hover:bg-gray-100 rounded">
                Settings
              </Link>
              <Link href="#" className="px-2 hover:bg-gray-100 rounded">
                Account
              </Link>
            </nav>
          </div>
        </div>
      )}

      <nav className="flex items-center justify-between">
        {/* Mobile hamburger menu - only visible on small screens */}
        <button
          className="lg:hidden flex items-center p-2"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>

        {/* User profile - hidden on mobile, visible on larger screens */}
        <div className="hidden lg:flex gap-2 items-center relative z-30 pl-0 md:pl-12">
          <Avatar className="w-10 h-10 md:w-14 md:h-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex gap-2 items-center justify-center">
            <div>
              <span className="text-base md:text-xl">
                Hello, <strong>Omar</strong>
              </span>
              <br />
              <b className="text-gray-500 text-xs">Main Admin</b>
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
          className="flex items-center cursor-pointer"
          onClick={handleGoBack}
        >
          <Image
            src={Logo}
            alt="logo"
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
