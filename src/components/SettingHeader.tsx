"use client";
import { useState } from "react";
import Image from "next/image";
import { Menu, ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SettingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className="w-full relative px-4 md:px-6 py-2 md:py-0">
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

            {/* We'd add navigation links here */}
            <nav className="flex flex-col gap-4">
              <Link href="/settings" className="px-2 hover:bg-gray-100 rounded">
                Settings
              </Link>
              <Link
                href="/settings/info"
                className="px-2 hover:bg-gray-100 rounded"
              >
                Info
              </Link>
            </nav>
          </div>
        </div>
      )}

      <nav className="flex items-center md:justify-end justify-between">
        {/* Mobile hamburger menu - only visible on small screens */}
        <button
          className="lg:hidden flex items-center p-2"
          onClick={toggleMobileMenu}
        >
          <Menu size={24} />
        </button>

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
    </header>
  );
}
