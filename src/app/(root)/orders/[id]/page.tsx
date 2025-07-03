"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Smile,
  AtSign,
  Hash,
  Paperclip,
  SaudiRiyal,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo.png";
import Image from "next/image";

export default function ClientProfile() {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [timeline, setTimeline] = useState([
    {
      type: "admin",
      message: "Project status updated to In Progress",
      time: "2:30 PM",
    },
    {
      type: "system",
      message: "Scheduled a meeting with the design team",
      time: "1:45 PM",
    },
    {
      type: "admin",
      message: "New task assigned to John Doe",
      time: "11:20 AM",
    },
  ]);

  // Common emojis
  const commonEmojis = [
    "😀",
    "😂",
    "😊",
    "👍",
    "❤️",
    "🎉",
    "🔥",
    "👏",
    "🙌",
    "✅",
    "⭐",
    "💯",
  ];

  const client = {
    id: "client123",
    name: "Omar Bahattab",
    since: "November 2023",
    amountSpent: 399,
    orders: 1,
    customerSince: "1 Days",
    avatar: "/avatar.jpg",
    contact: {
      number: "+966 50 990 3532",
      email: "Email@iScan.sa",
    },
    notes: "Wants orders send via Fedex",
    storeCredit: 399,
  };

  const handlePostComment = () => {
    if (comment.trim() !== "") {
      const newEntry = {
        type: "admin",
        message: comment,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setTimeline([newEntry, ...timeline]);
      setComment("");
    }
  };

  const addEmoji = (emoji) => {
    setComment((prevComment) => prevComment + emoji);
    setShowEmojiPicker(false);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      {/* Header Section - Responsive */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 pt-4 lg:pt-20 gap-4 lg:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/orders"
              className="p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
            >
              <ArrowLeft
                size={24}
                className="sm:w-[30px] sm:h-[30px] text-gray-600 group-hover:text-black"
              />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-semibold">#4130</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ml-0 sm:ml-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-white">
                <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                Paid
              </span>
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-white">
                <span className="w-2 h-2 mr-1 bg-orange-500 rounded-full"></span>
                Unfulfilled
              </span>
            </div>
            <span className="text-gray-500 text-xs sm:text-sm">
              April (4) 16, 2025 at 17:20 from{" "}
              <span className="text-blue-500">Online store</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white hover:bg-gray-50 transition-colors">
              Refund
            </button>
            <button className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white hover:bg-gray-50 transition-colors">
              Edit
            </button>
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={handleGoBack}
          >
            <Image
              src={Logo}
              alt="logo"
              className="h-6 w-auto sm:h-8 md:h-12"
              height={48}
              width={48}
              priority
            />
          </div>
        </div>
      </div>

      {/* Main Content Section - Responsive Grid */}
      <section className="bg-gray-200 rounded-2xl sm:rounded-3xl p-2 sm:p-4">
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
          {/* Left side - Main Content */}
          <div className="flex-1 space-y-6 xl:space-y-10">
            {/* Orders Table - Responsive */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 text-center font-medium text-lg xl:text-xl rounded-l-xl">
                        Items
                      </th>
                      <th className="py-3 text-center font-medium text-lg xl:text-xl">
                        Unit price
                      </th>
                      <th className="py-3 text-center font-medium text-lg xl:text-xl">
                        Quantity
                      </th>
                      <th className="py-3 text-center font-medium text-lg xl:text-xl rounded-r-xl">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr>
                      <td className="py-3 text-center text-lg xl:text-xl">iScan Card</td>
                      <td className="py-3 text-center text-lg xl:text-xl">20</td>
                      <td className="py-3 text-center text-lg xl:text-xl">x2</td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-lg xl:text-xl">
                          <SaudiRiyal size={16} /> 40
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr>
                      <td className="py-3 text-center text-lg xl:text-xl">iScan Card</td>
                      <td className="py-3 text-center text-lg xl:text-xl">20</td>
                      <td className="py-3 text-center text-lg xl:text-xl">x2</td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-lg xl:text-xl">
                          <SaudiRiyal size={16} /> 40
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr>
                      <td className="py-3 text-center text-lg xl:text-xl">iScan Card</td>
                      <td className="py-3 text-center text-lg xl:text-xl">20</td>
                      <td className="py-3 text-center text-lg xl:text-xl">x2</td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-lg xl:text-xl">
                          <SaudiRiyal size={16} /> 40
                        </div>
                      </td>
                    </tr>

                    {/* Card Total Row */}
                    <tr className="bg-gray-50 border-b-[20px] border-b-white">
                      <td colSpan={3} className="py-2 text-2xl xl:text-3xl font-medium">
                        <div className="pl-12">Card Total</div>
                      </td>
                      <td className="py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-xl xl:text-2xl font-medium">
                          <SaudiRiyal size={16} /> 120
                        </div>
                      </td>
                    </tr>

                    {/* Shipping Cost Row */}
                    <tr className="bg-gray-50 border-b-[20px] border-b-white">
                      <td colSpan={3} className="py-2 text-2xl xl:text-3xl font-medium">
                        <div className="pl-12">Shipping cost</div>
                      </td>
                      <td className="py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-xl xl:text-2xl font-medium">
                          <SaudiRiyal size={16} /> 9
                        </div>
                      </td>
                    </tr>

                    {/* Total Row */}
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="py-2 text-2xl xl:text-3xl font-medium">
                        <div className="pl-12">Total</div>
                      </td>
                      <td className="py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-xl xl:text-2xl pr-5 font-medium">
                          <SaudiRiyal size={16} /> 129
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden p-4 space-y-4">
                {/* Item Cards */}
                <div className="space-y-3">
                  {[1, 2, 3].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-base">iScan Card</h3>
                        <div className="flex items-center gap-1 font-medium">
                          <SaudiRiyal size={14} />
                          <span>40</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Unit price: 20</span>
                        <span>Qty: x2</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-base">
                    <span>Card Total</span>
                    <div className="flex items-center gap-1 font-medium">
                      <SaudiRiyal size={14} />
                      <span>120</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>Shipping cost</span>
                    <div className="flex items-center gap-1 font-medium">
                      <SaudiRiyal size={14} />
                      <span>9</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <div className="flex items-center gap-1">
                      <SaudiRiyal size={16} />
                      <span>129</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-5">
                <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm sm:text-base transition-colors">
                  Change order status
                </button>
                <button className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer text-sm sm:text-base transition-colors">
                  Fulfill item
                </button>
              </div>
            </div>

            {/* Timeline Section - Responsive */}
            <div className="overflow-hidden">
              <h2 className="text-xl sm:text-2xl mb-4">Time Line</h2>

              {/* Comment Box - Responsive */}
              <div className="mb-4 relative z-20">
                <div className="relative">
                  <div>
                    <textarea
                      className="w-full py-2.5 px-4 sm:px-6 resize-none rounded-full bg-white focus:outline-none text-sm sm:text-base"
                      placeholder="Leave comment..."
                      rows={1}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex rounded-b-4xl -mt-7 items-center border-t border-gray-200 px-3 sm:px-4 py-2 pt-6 bg-gray-300">
                      <div className="flex space-x-2 sm:space-x-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                className="p-1 hover:text-gray-700 relative"
                                onClick={() =>
                                  setShowEmojiPicker(!showEmojiPicker)
                                }
                              >
                                <Smile size={18} className="sm:w-5 sm:h-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add emoji</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {showEmojiPicker && (
                          <div className="absolute bottom-14 left-0 bg-white shadow-lg rounded-lg p-2 grid grid-cols-6 gap-2 z-50">
                            {commonEmojis.map((emoji, index) => (
                              <button
                                key={index}
                                className="text-base sm:text-xl hover:bg-gray-100 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded"
                                onClick={() => addEmoji(emoji)}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        )}

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1 hover:text-gray-700">
                                <AtSign size={18} className="sm:w-5 sm:h-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mention someone</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1 hover:text-gray-700">
                                <Hash size={18} className="sm:w-5 sm:h-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add hashtag</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1 hover:text-gray-700">
                                <Paperclip size={18} className="sm:w-5 sm:h-5" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Attach file</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="ml-auto">
                        <button
                          className="px-3 sm:px-4 py-1 bg-white rounded-md cursor-pointer text-xs sm:text-sm hover:bg-gray-50 transition-colors"
                          onClick={handlePostComment}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline entries - Responsive */}
              <div className="space-y-6 sm:space-y-10 relative">
                <div className="absolute -top-[15%] left-6 sm:left-9 z-10 w-0.5 h-[120%] bg-black" />
                {timeline.map((entry, index) => (
                  <div key={index} className="w-11/12 md:w-full lg:w-3/5 ml-3 relative z-20">
                    {entry.type === "admin" ? (
                      <div className="flex items-start justify-between gap-2 sm:gap-4 pt-2 pb-1 px-3 sm:px-6 bg-white rounded-full">
                        <div className="flex gap-2 items-center min-w-0 flex-1">
                          <div className="flex-shrink-0">
                            <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 flex flex-col min-w-0">
                            <strong className="text-xs sm:text-sm">Admin</strong>
                            <small className="text-xs sm:text-sm text-gray-500 truncate">
                              {entry.message}
                            </small>
                          </div>
                        </div>
                        <time className="text-gray-500 text-xs flex-shrink-0">
                          {entry.time}
                        </time>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2 sm:gap-4 px-3 sm:px-6">
                        <div className="text-xs sm:text-sm flex-1 min-w-0">{entry.message}</div>
                        <time className="text-gray-800 text-xs flex-shrink-0">
                          {entry.time}
                        </time>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Client Info - Responsive */}
          <div className="w-full xl:w-72">
            <div className="bg-white rounded-2xl sm:rounded-4xl px-3 py-5 shadow-sm flex flex-col gap-3">
              <h2 className="text-2xl sm:text-3xl ml-2">Client</h2>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-blue-600">Dasw helos</span>
                <span className="text-xs underline cursor-pointer">3 orders</span>
              </div>

              {/* Contact Information - Responsive */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-medium ml-2">
                  Contact information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm mb-1 inline-block">Email</span>
                    <div className="flex justify-between items-center">
                      <span className="text-sm truncate pr-2">Email@iScan.sa</span>
                      <button className="cursor-pointer flex-shrink-0 hover:text-blue-600 transition-colors">
                        <Mail size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm mb-1 inline-block">Number</span>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">+966 50 990 3532</span>
                      <div className="flex gap-2 flex-shrink-0">
                        <button className="cursor-pointer hover:text-blue-600 transition-colors">
                          <Phone size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <button className="cursor-pointer hover:text-blue-600 transition-colors">
                          <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address - Responsive */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-medium ml-2">Shipping Address</h3>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Dasw helos</span>
                    <button className="cursor-pointer hover:text-blue-600 transition-colors">
                      <Copy size={18} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">1010 wien</span>
                    <span className="text-sm">Jeddah</span>
                    <span className="text-sm">Saudi arabia</span>
                  </div>
                  <Link
                    href="#"
                    className="text-xs text-blue-600 underline flex items-center gap-1 mt-1 hover:text-blue-800 transition-colors"
                  >
                    View Map
                  </Link>
                </div>
              </div>

              {/* Billing Address */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-medium ml-2">Billing Address</h3>
                <span className="text-sm text-gray-600">
                  Same as Shipping address
                </span>
              </div>
            </div>

            {/* Client Note - Responsive */}
            <div className="bg-white rounded-2xl sm:rounded-4xl p-3 mt-5 shadow-sm">
              <p className="text-lg sm:text-xl mb-1">Client Note</p>
              <div className="bg-gray-100 p-3 sm:p-4 text-sm sm:text-lg rounded-xl">
                <p className="text-gray-700">{client.notes}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
