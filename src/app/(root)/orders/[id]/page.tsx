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
      <div className="flex justify-between items-center mb-4">
        <div className={`flex items-center gap-4`}>
          <Link
            href="/orders"
            className="p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
          >
            <ArrowLeft
              size={30}
              className="text-gray-600 group-hover:text-black"
            />
          </Link>
          <h1 className="text-3xl">#4130</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-white">
              <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
              Paid
            </span>
            <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-white">
              <span className="w-2 h-2 mr-1 bg-orange-500 rounded-full"></span>
              Unfulfilled
            </span>
            <span className="text-gray-500 text-sm">
              April (4) 16, 2025 at 17:20 from{" "}
              <span className="text-blue-500">Online store</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-1.5 text-sm rounded-full bg-white">
            Refund
          </button>
          <button className="px-4 py-1.5 text-sm rounded-full bg-white">
            Edit
          </button>
          <div
            className="flex items-center cursor-pointer"
            onClick={handleGoBack}
          >
            <Image
              src={Logo}
              alt="logo"
              className="h-8 w-auto md:h-12"
              height={48}
              width={48}
              priority
            />
          </div>
        </div>
      </div>

      <section className="bg-gray-200 rounded-3xl p-4">
        <div className="flex gap-6">
          {/* Left side */}
          <div className="flex-1 space-y-10">
            {/* Orders Table */}
            <div className="bg-white rounded-xl pb-4 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 rounded-xl overflow-hidden">
                    <th className="py-3 text-center font-medium text-xl rounded-l-xl">
                      Items
                    </th>
                    <th className="py-3 text-center font-medium text-xl">
                      Unit price
                    </th>
                    <th className="py-3 text-center font-medium text-xl">
                      Quantity
                    </th>
                    <th className="py-3 text-center font-medium text-xl rounded-r-xl">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td className="py-3 text-center text-xl">iScan Card</td>
                    <td className="py-3 text-center text-xl">20</td>
                    <td className="py-3 text-center text-xl">x2</td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-xl">
                        <SaudiRiyal size={16} /> 40
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td className="py-3 text-center text-xl">iScan Card</td>
                    <td className="py-3 text-center text-xl">20</td>
                    <td className="py-3 text-center text-xl">x2</td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-xl">
                        <SaudiRiyal size={16} /> 40
                      </div>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td className="py-3 text-center text-xl">iScan Card</td>
                    <td className="py-3 text-center text-xl">20</td>
                    <td className="py-3 text-center text-xl">x2</td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-xl">
                        <SaudiRiyal size={16} /> 40
                      </div>
                    </td>
                  </tr>

                  {/* Card Total Row */}
                  <tr className="bg-gray-50 border-b-[20px] border-b-white">
                    <td colSpan={3} className="py-2 text-3xl font-medium">
                      <div className="pl-12">Card Total</div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-2xl font-medium">
                        <SaudiRiyal size={16} /> 120
                      </div>
                    </td>
                  </tr>

                  {/* Shipping Cost Row */}
                  <tr className="bg-gray-50 border-b-[20px] border-b-white">
                    <td colSpan={3} className="py-2 text-3xl font-medium">
                      <div className="pl-12">Shipping cost</div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-2xl font-medium">
                        <SaudiRiyal size={16} /> 9
                      </div>
                    </td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="py-2 text-3xl font-medium">
                      <div className="pl-12">Total</div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-2xl pr-5 font-medium">
                        <SaudiRiyal size={16} /> 129
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-4 flex items-center justify-end-safe gap-5">
                <button className="px-4 py-1 rounded-full bg-gray-100 cursor-pointer text-base">
                  Change order status
                </button>
                <button className="px-4 py-1 rounded-full bg-black text-white cursor-pointer text-base">
                  Fulfill item
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="overflow-hidden">
              <h2 className="text-2xl">Time Line</h2>

              <div className="mb-4 relative z-20">
                <div className="relative">
                  <div>
                    <textarea
                      className="w-full py-2.5 px-6 resize-none rounded-full bg-white focus:outline-none"
                      placeholder="Leave comment..."
                      rows={1}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex rounded-b-4xl -mt-7 items-center border-t border-gray-200 px-4 py-2 pt-6 bg-gray-300">
                      <div className="flex space-x-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                className="p-1 hover:text-gray-700 relative"
                                onClick={() =>
                                  setShowEmojiPicker(!showEmojiPicker)
                                }
                              >
                                <Smile size={20} />
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
                                className="text-xl hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded"
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
                                <AtSign size={20} />
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
                                <Hash size={20} />
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
                                <Paperclip size={20} />
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
                          className="px-4 py-1 bg-white rounded-md cursor-pointer text-sm"
                          onClick={handlePostComment}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline entries */}
              <div className="space-y-10 relative">
                <div className="absolute -top-[15%] left-9 z-10 w-0.5 h-[120%] bg-black" />
                {timeline.map((entry, index) => (
                  <div key={index} className="w-3/5 ml-5 relative z-20">
                    {entry.type === "admin" ? (
                      <div className="flex items-start justify-between gap-4 pt-2 pb-1 px-6 bg-white rounded-full">
                        <div className="flex gap-2 items-center">
                          <div className="">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 flex flex-col">
                            <strong className="text-sm">Admin</strong>
                            <small className="text-sm text-gray-500">
                              {entry.message}
                            </small>
                          </div>
                        </div>
                        <time className="text-gray-500 text-xs">
                          {entry.time}
                        </time>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-4 px-6">
                        <div className="text-sm">{entry.message}</div>
                        <time className="text-gray-800 text-xs">
                          {entry.time}
                        </time>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="w-72">
            <div className="bg-white rounded-4xl px-3 py-5 shadow-sm flex flex-col gap-3">
              <h2 className="text-3xl ml-2">Client</h2>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-blue-600">Dasw helos</span>
                <span className="text-xs underline">3 orders</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium ml-2">
                  Contact information
                </h3>
                <div>
                  <span className="text-sm mb-1 inline-block">Email</span>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email@iScan.sa</span>
                    <button className="cursor-pointer">
                      <Mail size={20} />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-sm mb-1 inline-block">Number</span>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">+966 50 990 3532</span>
                    <div className="flex gap-2">
                      <button className="cursor-pointer">
                        <Phone size={20} />
                      </button>
                      <button className="cursor-pointer">
                        <MessageCircle size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium ml-2">Shipping Adress</h3>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Dasw helos</span>
                    <button className="cursor-pointer">
                      <Copy size={20} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">1010 wien</span>
                    <span className="text-sm">Jeddah</span>
                    <span className="text-sm">Saudi arabia</span>
                  </div>
                  <Link
                    href="#"
                    className="text-xs text-blue-600 underline flex items-center gap-1 mt-1"
                  >
                    View Map
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-medium ml-2">Billing Adress</h3>
                <span className="text-sm text-gray-600">
                  Same as Shipping address
                </span>
              </div>
            </div>
            <div className="bg-white rounded-4xl p-3 mt-5 shadow-sm">
              <p className="text-xl mb-1">Client Note</p>
              <div className="bg-gray-100 p-4  text-lg rounded-xl">
                <p className="text-gray-700">{client.notes}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
