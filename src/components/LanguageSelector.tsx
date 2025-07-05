"use client";

import { EarthIcon } from "lucide-react";
import { useState } from "react";

export function LanguageSelector() {
  const [lang, setLang] = useState('en');

  const handleClick = () => setLang(lang === "en" ? "ar" : "en")
  return (
    <button onClick={handleClick} className="bg-white p-2 flex items-center justify-center gap-1 rounded-full cursor-pointer hover:opacity-70">
      <EarthIcon size={16} /> <span className="text-xs">{lang === "en" ? "English" : "العربية"}</span>
    </button>
  );
}
