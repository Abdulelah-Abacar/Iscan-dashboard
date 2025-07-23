import { Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function ClientRow() {
  return (
    <div className="w-full p-4 border rounded-lg bg-white shadow-sm">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-3">
        {/* Client Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" alt="Omar Bahattab" />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              CN
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">Omar Bahattab</h3>
            <p className="text-sm text-gray-500 truncate">Saudi Arabia, Jeddah</p>
          </div>
          <Link href={"/admin/clients/1"}>
          <Info className="h-7 w-7 text-gray-400 flex-shrink-0" />
          </Link>
        </div>
        
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500">Type</span>
            <p className="font-medium text-gray-900">Personal</p>
          </div>
          <div>
            <span className="text-gray-500">Plan</span>
            <p className="font-medium text-gray-900">Pro</p>
          </div>
          <div>
            <span className="text-gray-500">Company</span>
            <p className="font-medium text-gray-900">iScan</p>
          </div>
          <div>
            <span className="text-gray-500">Last Active</span>
            <p className="font-medium text-gray-900">2 min ago</p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:items-center md:justify-between">
        {/* Left side - Client Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/api/placeholder/48/48" alt="Omar Bahattab" />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              CN
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 truncate">Omar Bahattab</h3>
            <p className="text-sm text-gray-500 truncate">Saudi Arabia, Jeddah</p>
          </div>
        </div>

        {/* Right side - Details */}
        <div className="flex items-center gap-8 lg:gap-12">
          <div className="text-center min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
            <p className="font-medium text-gray-900">Personal</p>
          </div>
          <div className="text-center min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Plan</p>
            <p className="font-medium text-gray-900">Pro</p>
          </div>
          <div className="text-center min-w-0 hidden lg:block">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Company</p>
            <p className="font-medium text-gray-900">iScan</p>
          </div>
          <div className="text-center min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Last Active</p>
            <p className="font-medium text-gray-900">2 min ago</p>
          </div>
          <Link href={"/admin/clients/1"}>
          <Info className="h-6 w-6 text-gray-400 flex-shrink-0 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}