"use client";

import { useLocale } from 'next-intl';
import { EarthIcon } from "lucide-react";
import { useTransition } from 'react';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';

export function LanguageSelector() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const nextLocale = (locale === 'en' ? 'ar' : 'en') as Locale;
    
    startTransition(() => {
      setUserLocale(nextLocale);
    });
  };

  return (
    <button 
      onClick={handleClick} 
      disabled={isPending}
      className="bg-white p-2 flex items-center justify-center gap-1 rounded-full cursor-pointer hover:opacity-70 disabled:opacity-50 disabled:pointer-events-none"
    >
      <EarthIcon size={16} /> 
      <span className="text-xs">
        {locale === "en" ? "English" : "العربية"}
      </span>
    </button>
  );
}