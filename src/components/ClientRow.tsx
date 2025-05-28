import { Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function ClientRow() {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Omar Bahattab</h3>
          <p className="text-xs text-gray-400">Saudi Arabia, Jeddah</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-4">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Type</p>
          <span className="px-6 py-2 bg-gray-200 rounded-full text-sm">
            Personal
          </span>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Plan</p>
          <span className="px-6 py-2 bg-gray-200 rounded-full text-sm">
            Pro
          </span>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Company</p>
          <span className="px-6 py-2 bg-gray-200 rounded-full text-sm">
            iScan
          </span>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Last Active</p>
          <span className="px-6 py-2 bg-gray-200 rounded-full text-sm">
            2 min ago
          </span>
        </div>

        <Link href={""} className="p-2.5 rounded-full bg-gray-200">
          <Info className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
