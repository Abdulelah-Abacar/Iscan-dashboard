"use client";
import { Bell, Filter, Search, X } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";
import { useEffect, useRef } from "react";
import { useSearch } from "@/contexts/SearchContext"; // Import the context

export function SearchBar({ isMobile = false }) {
  const searchInputRef = useRef(null);
  const { 
    searchMode, 
    searchQuery, 
    setSearchQuery, 
    switchToGlobalSearch 
  } = useSearch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+S (Windows/Linux) or Cmd+S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Prevent browser's default save action
        searchInputRef.current?.focus();
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (searchMode === 'client') {
      switchToGlobalSearch();
    }
  };

  // Conditionally render based on search mode
  if (searchMode === 'client') {
    return (
      <ClientSearchBar 
        isMobile={isMobile} 
        searchInputRef={searchInputRef}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
    );
  }

  return (
    <GlobalSearchBar 
      isMobile={isMobile} 
      searchInputRef={searchInputRef}
      searchQuery={searchQuery}
      handleSearch={handleSearch}
      handleClearSearch={handleClearSearch}
    />
  );
}

const GlobalSearchBar = ({ 
  isMobile, 
  searchInputRef, 
  searchQuery, 
  handleSearch, 
  handleClearSearch 
}) => (
  <div className={`flex-1 items-center w-full ${isMobile ? "" : "max-w-md"}`}>
    <div className="p-2 md:p-3.5 lg:p-5 bg-[#f0f0f0] rounded-full max-w-[550px] mx-auto flex justify-center items-center gap-2">
      <div className="bg-white p-2 rounded-full">
        <Bell />
      </div>
      <div className="flex-1 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={16} />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="outline-0 border-0 bg-[#F5F5F5] py-2 pl-8 pr-20 w-full rounded-full"
          placeholder="Search..."
        />
        {searchQuery ? (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={16} />
          </button>
        ) : (
          <div className="hidden sm:block absolute right-3 top-1/2 transform -translate-y-1/2 scale-75 pointer-events-none">
            <span className="p-2 rounded-full bg-white text-xs">⌘</span> +{" "}
            <span className="p-2 px-3 rounded-full bg-white text-xs">S</span>
          </div>
        )}
      </div>
      <LanguageSelector />
    </div>
  </div>
);

const ClientSearchBar = ({ 
  isMobile, 
  searchInputRef, 
  searchQuery, 
  handleSearch, 
  handleClearSearch 
}) => (
  <div className={`flex-1 items-center w-full ${isMobile ? "" : "max-w-md"}`}>
    <div className="p-5 bg-[#f0f0f0] rounded-3xl flex flex-col justify-center items-center gap-2">
      <div className="w-full relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={16} />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="outline-0 border-0 bg-[#F5F5F5] py-2 pl-8 pr-20 w-full rounded-full"
          placeholder="Search clients..."
        />
        {searchQuery ? (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full">
            <Filter className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center mt-2 p-5">
        <Search className="h-8 w-8 text-gray-600" />
        <h2 className="text-xl text-gray-800 font-medium ml-2">
          Search Clients
        </h2>
      </div>
    </div>
  </div>
);

export default SearchBar;