import { ArrowDown, ArrowUp } from "lucide-react";

export const ArrowStatus = ({ isPositive, status }) => {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <div
        className={`p-1 rounded-full ${
          isPositive ? "bg-[#22C55E]" : "bg-red-500"
        } text-white`}
      >
        {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      </div>
      <span>{status}</span>
    </div>
  );
};
