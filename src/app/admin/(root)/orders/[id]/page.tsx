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
  Check,
  X,
  ArrowRight,
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
import { useLocale, useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('orderDetails');
  const locale = useLocale();
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
  const [copied, setCopied] = useState(false);
  const [showOrdersOverlay, setShowOrdersOverlay] = useState(false);

  const orders = [
    {
      id: "ORD-001",
      date: "2024-06-15",
      status: "Delivered",
      items: "Scanning Device Pro, 2x Batteries",
      total: 1250.0,
      trackingNumber: "TN123456789",
    },
    {
      id: "ORD-002",
      date: "2024-06-28",
      status: "In Transit",
      items: "Software License, Support Package",
      total: 750.0,
      trackingNumber: "TN987654321",
    },
    {
      id: "ORD-003",
      date: "2024-07-02",
      status: "Processing",
      items: "Maintenance Kit, Documentation",
      total: 450.0,
      trackingNumber: "TN555666777",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-50";
      case "in transit":
        return "text-blue-600 bg-blue-50";
      case "processing":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTranslatedStatus = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return t('status.delivered');
      case "in transit":
        return t('status.inTransit');
      case "processing":
        return t('status.processing');
      default:
        return status;
    }
  };

  const handleEmailClick = () => {
    const email = "Email@iScan.sa";
    const subject = t('emailSubject');
    const body = t('emailBody');

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, "_blank");
  };

  const handlePhoneClick = () => {
    const phoneNumber = "+966509903532";
    window.open(`tel:${phoneNumber}`, "_self");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "966509903532";
    const message = t('whatsappMessage');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleViewMap = () => {
    const address = "1010 wien, Jeddah, Saudi Arabia";
    const encodedAddress = encodeURIComponent(address);

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      const appleMapsUrl = `http://maps.apple.com/?q=${encodedAddress}`;
      window.open(appleMapsUrl, "_blank");
    } else if (isAndroid) {
      const googleMapsUrl = `geo:0,0?q=${encodedAddress}`;
      window.open(googleMapsUrl, "_blank");
    } else {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  const handleOrdersClick = () => {
    setShowOrdersOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOrdersOverlay(false);
  };

  const handleCopyAddress = async () => {
    const address = "Dasw helos\n1010 wien\nJeddah\nSaudi arabia";

    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = address;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    orders: 3,
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
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 pt-4 lg:pt-20 gap-4 lg:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/orders"
              className="p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
            >
              {
                locale == 'ar' ? (<ArrowRight
                  size={24}
                  className="sm:w-[30px] sm:h-[30px] text-gray-600 group-hover:text-black"
                />) : (<ArrowLeft
                  size={24}
                  className="sm:w-[30px] sm:h-[30px] text-gray-600 group-hover:text-black"
                />)
              }
            </Link>
            <h1 className="text-2xl sm:text-3xl font-semibold">#4130</h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ml-0 sm:ml-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-white">
                <span className="w-2 h-2 mx-1 bg-green-500 rounded-full"></span>
                {t('header.paid')}
              </span>
              <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-white">
                <span className="w-2 h-2 mx-1 bg-orange-500 rounded-full"></span>
                {t('header.unfulfilled')}
              </span>
            </div>
            <span className="text-gray-500 text-xs sm:text-sm">
              April (4) 16, 2025 at 17:20 {t('header.orderFrom')}{" "}
              <span className="text-blue-500">{t('header.onlineStore')}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white hover:bg-gray-50 transition-colors">
              {t('header.refund')}
            </button>
            <button className="px-3 py-1.5 text-xs sm:text-sm rounded-full bg-white hover:bg-gray-50 transition-colors">
              {t('header.edit')}
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

      {/* Orders Overlay */}
      {showOrdersOverlay && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold">{t('ordersOverlay.title')}</h2>
              <button
                onClick={handleCloseOverlay}
                className="hover:text-gray-600 transition-colors cursor-pointer"
                title={t('ordersOverlay.close')}
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-x-auto max-h-[calc(90vh-120px)]">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                      <div className="flex items-center gap-2">
                        {t('ordersOverlay.orderId')}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                      <div className="flex items-center gap-2">
                        {t('ordersOverlay.date')}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                      {t('ordersOverlay.status')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                      {t('ordersOverlay.items')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                      <div className="flex items-center gap-2">
                        {t('ordersOverlay.total')}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                      {t('ordersOverlay.tracking')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {order.date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getTranslatedStatus(order.status)}
                        </span>
                      </td>
                      <td
                        className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate"
                        title={order.items}
                      >
                        {order.items}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600 font-mono">
                        {order.trackingNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {t('ordersOverlay.totalOrders')}: {orders.length}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {t('ordersOverlay.totalValue')}: $
                  {orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <section className="bg-gray-200 rounded-2xl sm:rounded-3xl p-2 sm:p-4">
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
          {/* Left side - Main Content */}
          <div className="flex-1 space-y-6 xl:space-y-10">
            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className={`py-3 text-center font-medium text-lg xl:text-xl ${locale == 'ar' ? "rounded-r-xl" : "rounded-l-xl"}`}>
                        {t('orderTable.items')}
                      </th>
                      <th className="py-3 text-center font-medium text-lg xl:text-xl">
                        {t('orderTable.unitPrice')}
                      </th>
                      <th className="py-3 text-center font-medium text-lg xl:text-xl">
                        {t('orderTable.quantity')}
                      </th>
                      <th className={`py-3 text-center font-medium text-lg xl:text-xl ${locale == 'en' ? "rounded-r-xl" : "rounded-l-xl"}`}>
                        {t('orderTable.total')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        iScan Card
                      </td>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        20
                      </td>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        x2
                      </td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-lg xl:text-xl">
                          <SaudiRiyal size={16} /> 40
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        iScan Card
                      </td>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        20
                      </td>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        x2
                      </td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-lg xl:text-xl">
                          <SaudiRiyal size={16} /> 40
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        iScan Card
                      </td>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        20
                      </td>
                      <td className="py-3 text-center text-lg xl:text-xl">
                        x2
                      </td>
                      <td className="py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-lg xl:text-xl">
                          <SaudiRiyal size={16} /> 40
                        </div>
                      </td>
                    </tr>

                    <tr className="bg-gray-50 border-b-[20px] border-b-white">
                      <td
                        colSpan={3}
                        className="py-2 text-2xl font-medium"
                      >
                        <div className="pl-12">{t('orderTable.cardTotal')}</div>
                      </td>
                      <td className="py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-xl xl:text-2xl font-medium">
                          <SaudiRiyal size={16} /> 120
                        </div>
                      </td>
                    </tr>

                    <tr className="bg-gray-50 border-b-[20px] border-b-white">
                      <td
                        colSpan={3}
                        className="py-2 text-2xl font-medium"
                      >
                        <div className="pl-12">{t('orderTable.shippingCost')}</div>
                      </td>
                      <td className="py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-xl xl:text-2xl font-medium">
                          <SaudiRiyal size={16} /> 9
                        </div>
                      </td>
                    </tr>

                    <tr className="bg-gray-50">
                      <td
                        colSpan={3}
                        className="py-2 text-2xl font-medium"
                      >
                        <div className="pl-12">{t('orderTable.totalAmount')}</div>
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

              <div className="lg:hidden p-4 space-y-4">
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
                        <span>{t('orderTable.unitPrice')}: 20</span>
                        <span>{t('orderTable.quantity')}: x2</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-base">
                    <span>{t('orderTable.cardTotal')}</span>
                    <div className="flex items-center gap-1 font-medium">
                      <SaudiRiyal size={14} />
                      <span>120</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-base">
                    <span>{t('orderTable.shippingCost')}</span>
                    <div className="flex items-center gap-1 font-medium">
                      <SaudiRiyal size={14} />
                      <span>9</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>{t('orderTable.totalAmount')}</span>
                    <div className="flex items-center gap-1">
                      <SaudiRiyal size={16} />
                      <span>129</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-5">
                <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer text-sm sm:text-base transition-colors">
                  {t('orderTable.changeStatus')}
                </button>
                <button className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 cursor-pointer text-sm sm:text-base transition-colors">
                  {t('orderTable.fulfillItem')}
                </button>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="overflow-hidden">
              <h2 className="text-xl sm:text-2xl mb-4">{t('timeline.title')}</h2>

              <div className="mb-4 relative z-20">
                <div className="relative">
                  <div>
                    <textarea
                      className="w-full py-2.5 px-4 sm:px-6 resize-none rounded-full bg-white focus:outline-none text-sm sm:text-base"
                      placeholder={t('timeline.commentPlaceholder')}
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
                              <p>{t('timeline.addEmoji')}</p>
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
                              <p>{t('timeline.mention')}</p>
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
                              <p>{t('timeline.hashtag')}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button className="p-1 hover:text-gray-700">
                                <Paperclip
                                  size={18}
                                  className="sm:w-5 sm:h-5"
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t('timeline.attach')}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="ml-auto">
                        <button
                          className="px-3 sm:px-4 py-1 bg-white rounded-md cursor-pointer text-xs sm:text-sm hover:bg-gray-50 transition-colors"
                          onClick={handlePostComment}
                        >
                          {t('timeline.post')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-10 relative">
                <div className={`absolute -top-[15%] ${locale == 'ar' ? "right-6" : "left-6"} sm:left-9 z-10 w-0.5 h-[120%] bg-black`} />
                {timeline.map((entry, index) => (
                  <div
                    key={index}
                    className="w-11/12 md:w-full lg:w-3/5 ml-3 relative z-20"
                  >
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
                            <strong className="text-xs sm:text-sm">
                              Admin
                            </strong>
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
                        <div className="text-xs sm:text-sm flex-1 min-w-0">
                          {entry.message}
                        </div>
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

          {/* Right side - Client Info */}
          <div className="w-full xl:w-72">
            <div className="bg-white rounded-2xl sm:rounded-4xl px-3 py-5 shadow-sm flex flex-col gap-3">
              <h2 className="text-2xl sm:text-3xl ml-2">{t('clientInfo.title')}</h2>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-blue-600">Dasw helos</span>
                <span
                  className="text-xs underline cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={handleOrdersClick}
                >
                  {t('clientInfo.orders', { count: client.orders })}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-medium ml-2">
                  {t('clientInfo.contactInfo')}
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm mb-1 inline-block">{t('clientInfo.email')}</span>
                    <div className="flex justify-between items-center">
                      <span className="text-sm truncate pr-2">
                        Email@iScan.sa
                      </span>
                      <button
                        onClick={handleEmailClick}
                        className="cursor-pointer flex-shrink-0 hover:text-blue-600 transition-colors"
                        title={t('emailTooltip')}
                      >
                        <Mail size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm mb-1 inline-block">{t('clientInfo.number')}</span>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">+966 50 990 3532</span>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={handlePhoneClick}
                          className="cursor-pointer hover:text-blue-600 transition-colors"
                          title={t('phoneTooltip')}
                        >
                          <Phone size={18} className="sm:w-5 sm:h-5" />
                        </button>
                        <button
                          onClick={handleWhatsAppClick}
                          className="cursor-pointer hover:text-blue-600 transition-colors"
                          title={t('whatsappTooltip')}
                        >
                          <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-medium ml-2">
                  {t('clientInfo.shippingAddress')}
                </h3>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Dasw helos</span>
                    <button
                      onClick={handleCopyAddress}
                      className="cursor-pointer hover:text-blue-600 transition-colors"
                      title={copied ? t('copiedTooltip') : t('copyTooltip')}
                    >
                      {copied ? (
                        <Check
                          size={18}
                          className="sm:w-5 sm:h-5 text-green-600"
                        />
                      ) : (
                        <Copy size={18} className="sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">1010 wien</span>
                    <span className="text-sm">Jeddah</span>
                    <span className="text-sm">Saudi arabia</span>
                  </div>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewMap();
                    }}
                    className="text-xs text-blue-600 underline flex items-center gap-1 mt-1 hover:text-blue-800 transition-colors"
                  >
                    {t('clientInfo.viewMap')}
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-medium ml-2">
                  {t('clientInfo.billingAddress')}
                </h3>
                <span className="text-sm text-gray-600">
                  {t('clientInfo.sameAsShipping')}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-4xl p-3 mt-5 shadow-sm">
              <p className="text-lg sm:text-xl mb-1">{t('clientInfo.clientNote')}</p>
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