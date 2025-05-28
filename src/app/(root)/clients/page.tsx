"use client";
import { useState } from "react";
import { ClientRow } from "@/components/ClientRow";
import { RefreshCw, Search, X } from "lucide-react";

export default function Clients() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <h1 className="text-5xl">Clients</h1>
      <section className="p-1.5 md:pl-3 lg:pl-5 mt-8">
        <div className="p-6 bg-gray-200 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl">Latest Clients</h2>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-white hover:bg-white/70 cursor-pointer">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-full bg-white hover:bg-white/70 cursor-pointer"
              >
                {!isSearchOpen ? (
                  <Search className="h-5 w-5" />
                ) : (
                  <X className="w-5 h-5" />
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
