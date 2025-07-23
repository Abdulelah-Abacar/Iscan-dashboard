"use client";
import { useState } from "react";
import { Home, ShoppingBag, Users, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define routes where mobile nav should be hidden
  const hiddenRoutes = [
    /^\/orders\/[^\/]+$/, // matches /orders/[id]
    /^\/clients\/[^\/]+$/, // matches /clients/[id]
    /^\/products\/create$/, // matches /product/create
    /^\/blogs\/create$/, // matches /blogs/create
  ];

  // Check if current route matches any hidden routes
  const shouldHideNavBar = hiddenRoutes.some((route) => route.test(pathname));

  // Return null if nav bar should be hidden
  if (shouldHideNavBar) {
    return null;
  }

  // Check if current path matches the nav item
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for hamburger menu when open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleMenu}
        >
          <div
            className="bg-white w-4/5 max-w-xs h-full flex flex-col px-6 py-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-800">Menu</span>
              <button 
                onClick={toggleMenu} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col gap-2">
              <Link 
                href="/products" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <ShoppingBag size={20} className="text-gray-600" />
                <span className="text-gray-800">Products</span>
              </Link>
              
              <Link 
                href="/rating" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-gray-600">⭐</span>
                </div>
                <span className="text-gray-800">Rating</span>
              </Link>
              
              <Link 
                href="/analytics" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-gray-600">📊</span>
                </div>
                <span className="text-gray-800">Analytics</span>
              </Link>
              
              <Link 
                href="/discounts" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-gray-600">🏷️</span>
                </div>
                <span className="text-gray-800">Discounts</span>
              </Link>
              
              <Link 
                href="/blogs" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-gray-600">📝</span>
                </div>
                <span className="text-gray-800">Blog</span>
              </Link>
              
              <Link 
                href="/settings" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-gray-600">⚙️</span>
                </div>
                <span className="text-gray-800">Settings</span>
              </Link>
              
              <Link 
                href="#" 
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <span className="text-gray-600">👤</span>
                </div>
                <span className="text-gray-800">Account</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar - Only visible on small screens */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30 md:hidden">
        <div className="flex items-center justify-around px-4 py-2">
          
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${
              isActive("/")
                ? "bg-blue-50 text-blue-600 scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <Home size={22} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </Link>

          {/* Orders */}
          <Link
            href="/orders"
            className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${
              isActive("/orders")
                ? "bg-blue-50 text-blue-600 scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <ShoppingBag size={22} />
            <span className="text-xs mt-1 font-medium">Orders</span>
          </Link>

          {/* Clients */}
          <Link
            href="/clients"
            className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${
              isActive("/clients")
                ? "bg-blue-50 text-blue-600 scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <Users size={22} />
            <span className="text-xs mt-1 font-medium">Clients</span>
          </Link>

          {/* Menu */}
          <button
            onClick={toggleMenu}
            className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-all duration-200 ${
              isMenuOpen
                ? "bg-blue-50 text-blue-600 scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            <Menu size={22} />
            <span className="text-xs mt-1 font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Add padding to body content to prevent overlap with fixed nav */}
      <div className="h-16 md:hidden" />
    </>
  );
}