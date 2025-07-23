"use client";
import { useState } from "react";
import { ClientRow } from "@/components/clients/ClientRow";
import { RefreshCw, Search, X } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";
import { useTranslations } from "next-intl";

export default function Clients() {
  const t = useTranslations("Clients")
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const { searchMode, switchToClientSearch, switchToGlobalSearch } = useSearch();

  const handleSearchToggle = () => {
    if (searchMode === 'client') {
      // If already in client mode, switch back to global
      switchToGlobalSearch();
      setIsSearchOpen(false);
    } else {
      // Switch to client search mode
      switchToClientSearch();
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <h1 className="text-5xl">{t('title')}</h1>
      <section className="p-1.5 md:pl-3 lg:pl-5 mt-8">
        <div className="p-6 bg-gray-200 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl">{t('latestClients')}</h2>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-white hover:bg-white/70 cursor-pointer" aria-label={t('refreshButton.ariaLabel')}>
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={handleSearchToggle}
                className="p-2 rounded-full bg-white hover:bg-white/70 cursor-pointer"
                aria-label={t('searchToggle.ariaLabel')}
              >
                {searchMode === 'client' ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <ClientRow key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
