import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function SidebarItem({
  item,
  isActive,
  notificationCount = 0,
}: {
  item: any;
  isActive: boolean;
  notificationCount: number;
}) {
  return (
    <div className="relative">
      <Link
        href={item.path}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 ${
          isActive
            ? "bg-black text-white"
            : "text-black bg-white hover:bg-gray-100"
        }`}
      >
        <Tooltip>
          <TooltipTrigger>
            <item.icon
              className="w-8 aspect-square"
              color={isActive ? "#fff" : "#000"}
            />
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      </Link>
      <span
        className={`absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 ${
          !!notificationCount ? "flex" : "hidden"
        } items-center justify-center text-xs`}
      >
        {!!notificationCount && notificationCount}
      </span>
    </div>
  );
}
