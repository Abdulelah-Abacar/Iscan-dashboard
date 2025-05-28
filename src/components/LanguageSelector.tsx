import { EarthIcon } from "lucide-react";

export function LanguageSelector() {
  return (
    <div className="bg-white p-2 flex items-center justify-center gap-1 rounded-full">
      <EarthIcon size={16} /> <span className="text-xs">English</span>
    </div>
  );
}
