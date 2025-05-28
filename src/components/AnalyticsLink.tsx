import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const AnalyticsLink = ({
  to = "/analytics",
  dir = "upRight",
  className = "",
}) => {
  return (
    <Link
      href={to}
      className={`p-2 bg-white max-w-fit ${className} rounded-full group hover:scale-105 transition-all duration-700`}
    >
      {dir === "upRight" ? (
        <ArrowUpRight
          size={24}
          className="text-gray-600 group-hover:text-black"
        />
      ) : (
        <ArrowRight
          size={24}
          className="text-gray-600 group-hover:text-black"
        />
      )}
    </Link>
  );
};
