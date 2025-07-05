"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Copy,
  Info,
  CheckCircle,
  ChevronRight,
  Smile,
  AtSign,
  Hash,
  Paperclip,
  Pencil,
  SaudiRiyal,
  Check,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import VerificationModel from "@/components/clients/VerificationModel";
import SuccessModel from "@/components/clients/SuccessModel";
import StoreCreditModel from "@/components/clients/StoreCreditModel";
import StoreCreditSummeryModel from "@/components/clients/StoreCreditSummeryModel";
import StoreCreditBalanceModel from "@/components/clients/StoreCreditBalanceModel";

export default function ClientProfile() {
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(null);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [isVerificationModelOpen, setIsVerificationModelOpen] = useState(false);
  const [isStoreCreditModelOpen, setIsStoreCreditModelOpen] = useState(false);
  const [isStoreCreditSummeryModelOpen, setIsStoreCreditSummeryModelOpen] =
    useState(false);
  const [isStoreCreditBalanceModelOpen, setIsStoreCreditBalanceModelOpen] =
    useState(false);
  const [adjustment, setAdjustment] = useState("credit");
  const [amount, setAmount] = useState("");
  const [expirationDate, setExpirationDate] = useState("2025-05-20");
  const [hasExpiration, setHasExpiration] = useState(false);
  const [customerCredit, setCustomerCredit] = useState(1222.0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeTab, setActiveTab] = useState("allTransactions");
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
  const [isSuccessModelOpen, setIsSuccessModelOpen] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const router = useRouter();

  const verificationLevels = [
    { id: "none", component: null, label: "No verification" },
    { id: "admin", fill: "yellow", label: "Platform admins verification" },
    { id: "charity", fill: "green", label: "Charity verification" },
    { id: "government", fill: "gray", label: "Government verification" },
    { id: "famous", fill: "blue", label: "Famous verification" },
  ];

  const handleOpenStoreCreditModel = () =>
    setIsStoreCreditModelOpen(!isStoreCreditModelOpen);
  const handleOpenStoreCreditSummeryModel = () =>
    setIsStoreCreditSummeryModelOpen(!isStoreCreditSummeryModelOpen);
  const handleOpenStoreCreditBalanceModel = () =>
    setIsStoreCreditBalanceModelOpen(!isStoreCreditBalanceModelOpen);

  const handleReviewChanges = () => {
    // In a real application, this would send the data to an API
    const newAmount = parseFloat(amount);

    if (isNaN(newAmount) || newAmount <= 0) return;

    const newTransaction = {
      id: timeline.length + 1,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      message: hasExpiration
        ? `You ${
            adjustment === "credit" ? "credited" : "debited"
          } this customer SAR${newAmount.toFixed(
            2
          )} in store credit with an expiry date of May 20, 2025 at 11:59 pm UTC+03:00.`
        : `You ${
            adjustment === "credit" ? "credited" : "debited"
          } this customer SAR${newAmount.toFixed(2)} in store credit.`,
    };

    setTimeline([newTransaction, ...timeline]);

    if (adjustment === "credit") {
      setCustomerCredit(customerCredit + newAmount);
    } else {
      setCustomerCredit(Math.max(0, customerCredit - newAmount));
    }

    handleOpenStoreCreditSummeryModel();
    setAmount("");
    setHasExpiration(false);
    setAdjustment("credit");
  };

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

  const orders = [
    { id: "#4130", date: "22.4.2025", total: 999, status: "Completed" },
    { id: "#4130", date: "22.4.2025", total: 999, status: "Refund" },
    { id: "#4130", date: "22.4.2025", total: 999, status: "Completed" },
    { id: "#4130", date: "22.4.2025", total: 999, status: "Completed" },
  ];

  const allOrders = [
    ...orders,
    { id: '006', date: '2024-01-10', total: '198.50', status: 'Completed' },
    { id: '007', date: '2024-01-09', total: '78.25', status: 'Pending' },
    { id: '008', date: '2024-01-08', total: '156.75', status: 'Completed' },
    { id: '009', date: '2024-01-07', total: '92.00', status: 'Refund' },
    { id: '010', date: '2024-01-06', total: '234.50', status: 'Completed' },
    { id: '011', date: '2024-01-05', total: '167.25', status: 'Pending' },
    { id: '012', date: '2024-01-04', total: '89.75', status: 'Completed' },
  ];

  const transactions = [
    {
      date: "8 May 2025 at 9:08 am",
      event: "Adjustment",
      source: "Omar B",
      debit: "-SAR 1,233.00",
      credit: "",
      balance: "SAR 0.00",
    },
    {
      date: "8 May 2025 at 9:08 am",
      event: "Adjustment",
      source: "Omar B",
      debit: "",
      credit: "SAR 11.00",
      balance: "SAR 1,233.00",
    },
    {
      date: "8 May 2025 at 6:35 am",
      event: "Adjustment",
      source: "Omar B",
      debit: "",
      credit: "SAR 1,111.00",
      balance: "SAR 1,222.00",
    },
    {
      date: "8 May 2025 at 6:34 am",
      event: "Adjustment",
      source: "Omar B",
      debit: "",
      credit: "SAR 11.00",
      balance: "SAR 111.00",
    },
    {
      date: "8 May 2025 at 6:34 am",
      event: "Adjustment",
      source: "Omar B",
      debit: "",
      credit: "SAR 100.00",
      balance: "SAR 100.00",
    },
    {
      date: "6 May 2025 at 6:01 pm",
      event: "Adjustment",
      source: "Omar B",
      debit: "-SAR 122.00",
      credit: "",
      balance: "SAR 0.00",
    },
    {
      date: "6 May 2025 at 6:00 pm",
      event: "Adjustment",
      source: "Omar B",
      debit: "",
      credit: "SAR 122.00",
      balance: "SAR 122.00",
    },
  ];

  const handleShowAllOrders = () => setShowAllOrders(!showAllOrders)

  const handleVerificationSelect = (id) => {
    setSelectedVerification(id);
  };

  const handleSaveVerification = () => {
    // Here you would typically make an API call to save the verification level
    console.log(`Saving verification level: ${selectedVerification}`);

    // Close the verification model and open the success model
    setIsVerificationModelOpen(false);
    setIsSuccessModelOpen(true);
  };

  const handleCloseSuccessModel = () => {
    setIsSuccessModelOpen(false);
  };

  const handleOpenVerificationModel = () =>
    setIsVerificationModelOpen(!isVerificationModelOpen);

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

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback method for older browsers
      fallbackCopyTextToClipboard(text, field);
    }
  };

  // Fallback method for browsers that don't support navigator.clipboard
  const fallbackCopyTextToClipboard = (text, field) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  return (
    <>
      <div
        className={`flex items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8`}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/clients"
            className="p-1.5 sm:p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
          >
            <ArrowLeft
              size={24}
              className="text-gray-600 group-hover:text-black sm:w-[30px] sm:h-[30px]"
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-medium">
            Back to Clients
          </h1>
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={handleGoBack}
        >
          <Image
            src={Logo}
            alt="logo"
            className="h-9 w-auto md:h-12"
            height={48}
            width={48}
            priority
          />
        </div>
      </div>

      {showAllOrders && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>
              <button
                onClick={handleShowAllOrders}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-auto max-h-[calc(90vh-80px)]">
              {/* Desktop Table */}
              <div className="hidden sm:block">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white">
                    <tr className="text-gray-400 uppercase bg-gray-100">
                      <th className="py-3 text-center font-medium text-xs lg:text-sm">
                        ID
                      </th>
                      <th className="py-3 text-center font-medium text-xs lg:text-sm">
                        DATE
                      </th>
                      <th className="py-3 text-center font-medium text-xs lg:text-sm">
                        TOTAL
                      </th>
                      <th className="py-3 text-center font-medium text-xs lg:text-sm">
                        STATUS
                      </th>
                      <th className="py-3 text-center font-medium text-xs lg:text-sm"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((order, index) => (
                      <tr key={index} className="border-b border-gray-50">
                        <td className="py-3 text-center text-sm">
                          {order.id}
                        </td>
                        <td className="py-3 text-center text-sm">
                          {order.date}
                        </td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <SaudiRiyal size={22} /> {order.total}
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <div className="flex justify-center">
                            <span
                              className={`inline-flex items-center justify-center px-3 lg:px-4 py-1 rounded-full text-xs font-medium min-w-[80px] lg:w-24 ${
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.status}{" "}
                              {order.status === "Completed" && (
                                <CheckCircle size={14} className="ml-1" />
                              )}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <button className="flex justify-center w-full">
                            <Info size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-3 p-4">
                {allOrders.map((order, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                      <button>
                        <Info size={20} className="text-gray-400" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <SaudiRiyal size={22} />
                        <span className="font-medium">{order.total}</span>
                      </div>
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                        {order.status === "Completed" && (
                          <CheckCircle size={12} className="ml-1" />
                        )}
                        {order.status === "Refund" && (
                          <span className="ml-1">▼</span>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Step Model */}
      {isVerificationModelOpen && (
        <VerificationModel
          handleOpenVerificationModel={handleOpenVerificationModel}
          selectedVerification={selectedVerification}
          handleVerificationSelect={handleVerificationSelect}
          verificationLevels={verificationLevels}
          handleSaveVerification={handleSaveVerification}
        />
      )}

      {/* Verification Success Model */}
      {isSuccessModelOpen && (
        <SuccessModel handleCloseSuccessModel={handleCloseSuccessModel} />
      )}

      {/* Store Credit Model */}
      {isStoreCreditModelOpen && (
        <StoreCreditModel
          handleOpenStoreCreditModel={handleOpenStoreCreditModel}
          handleOpenStoreCreditSummeryModel={handleOpenStoreCreditSummeryModel}
          adjustment={adjustment}
          setAdjustment={setAdjustment}
          hasExpiration={hasExpiration}
          setHasExpiration={setHasExpiration}
          amount={amount}
          setAmount={setAmount}
          customerCredit={customerCredit}
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
        />
      )}

      {/* Store Credit Summary Model */}
      {isStoreCreditSummeryModelOpen && (
        <StoreCreditSummeryModel
          setIsStoreCreditSummeryModelOpen={setIsStoreCreditSummeryModelOpen}
          handleReviewChanges={handleReviewChanges}
          customerCredit={customerCredit}
          adjustment={adjustment}
          amount={amount}
          hasExpiration={hasExpiration}
          expirationDate={expirationDate}
        />
      )}

      {/* Store Credit Balance Model */}
      {isStoreCreditBalanceModelOpen && (
        <StoreCreditBalanceModel
          handleOpenStoreCreditBalanceModel={handleOpenStoreCreditBalanceModel}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          transactions={transactions}
          handleOpenStoreCreditModel={handleOpenStoreCreditModel}
        />
      )}

      <section>
        <div className="bg-gray-200 rounded-2xl sm:rounded-3xl p-3 sm:p-4">
          <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
            {/* Left side */}
            <div className="flex-1 space-y-6 sm:space-y-8 lg:space-y-10">
              {/* Client Header */}
              <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="">
                    <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <strong className="text-lg sm:text-xl font-semibold text-gray-800 block truncate">
                      {client.name}
                    </strong>
                    <small className="text-sm text-gray-500">
                      Clients since {client.since}
                    </small>
                  </div>
                  <button
                    onClick={handleOpenVerificationModel}
                    className="p-1.5 sm:p-2 rounded-full bg-white cursor-pointer hover:scale-95 hover:bg-white/70 transition-all duration-300 flex-shrink-0"
                  >
                    <User size={20} className="sm:w-[26px] sm:h-[26px]" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 flex-1 bg-white rounded-full py-2 px-3 sm:px-6 lg:px-8">
                  <div className="flex-1 text-center">
                    <p className="text-xs text-gray-600">Amount spent</p>
                    <p className="text-xs sm:text-sm w-full font-bold flex items-center justify-center bg-gray-200 rounded-full px-2 sm:px-3 py-1 mt-1">
                      <SaudiRiyal size={17} className="flex-shrink-0" />
                      <span className="ml-1 truncate">
                        {client.amountSpent}
                      </span>
                    </p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-gray-600">Orders</p>
                    <p className="text-xs sm:text-sm w-full font-bold flex items-center justify-center bg-gray-200 rounded-full px-2 sm:px-3 py-1 mt-1">
                      {client.orders}
                    </p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-gray-600">Customer since</p>
                    <p className="text-xs sm:text-sm w-full font-bold flex items-center justify-center bg-gray-200 rounded-full px-2 sm:px-3 py-1 mt-1">
                      <span className="truncate">{client.customerSince}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl pb-4 shadow-sm overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden sm:block">
                  <table className="w-full">
                    <thead>
                      <tr className="text-gray-400 uppercase bg-gray-100 rounded-xl overflow-hidden">
                        <th className="py-3 text-center font-medium rounded-l-xl text-xs lg:text-sm">
                          ID
                        </th>
                        <th className="py-3 text-center font-medium text-xs lg:text-sm">
                          DATE
                        </th>
                        <th className="py-3 text-center font-medium text-xs lg:text-sm">
                          TOTAL
                        </th>
                        <th className="py-3 text-center font-medium text-xs lg:text-sm">
                          STATUS
                        </th>
                        <th className="py-3 text-center font-medium rounded-r-xl text-xs lg:text-sm"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={index}>
                          <td className="py-3 text-center text-sm">
                            {order.id}
                          </td>
                          <td className="py-3 text-center text-sm">
                            {order.date}
                          </td>
                          <td className="py-3 text-center">
                            <div className="flex items-center justify-center gap-1 text-sm">
                              <SaudiRiyal size={22} /> {order.total}
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <div className="flex justify-center">
                              <span
                                className={`inline-flex items-center justify-center px-3 lg:px-4 py-1 rounded-full text-xs font-medium min-w-[80px] lg:w-24 ${
                                  order.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {order.status}{" "}
                                {order.status === "Completed" && (
                                  <CheckCircle size={14} className="ml-1" />
                                )}
                                {/* {order.status === "Refund" && (
                                  <span className="ml-1">▼</span>
                                )} */}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <button className="flex justify-center w-full">
                              <Info size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-3 p-4">
                  {orders.map((order, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-900">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <button>
                          <Info size={20} className="text-gray-400" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <SaudiRiyal size={22} />
                          <span className="font-medium">{order.total}</span>
                        </div>
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status}
                          {order.status === "Completed" && (
                            <CheckCircle size={12} className="ml-1" />
                          )}
                          {order.status === "Refund" && (
                            <span className="ml-1">▼</span>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center px-4">
                  <button onClick={handleShowAllOrders} className="px-4 py-2 w-full sm:w-auto rounded-full bg-gray-100 cursor-pointer text-sm">
                    See all orders
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div className="overflow-hidden">
                <h2 className="text-xl sm:text-2xl mb-4">Time Line</h2>

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
                      <div className="flex rounded-b-3xl sm:rounded-b-4xl -mt-4 sm:-mt-7 items-center border-t border-gray-200 px-3 sm:px-4 py-2 pt-4 sm:pt-6 bg-gray-300">
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
                            <div className="absolute bottom-12 sm:bottom-14 left-0 bg-white shadow-lg rounded-lg p-2 grid grid-cols-6 gap-2 z-50">
                              {commonEmojis.map((emoji, index) => (
                                <button
                                  key={index}
                                  className="text-lg sm:text-xl hover:bg-gray-100 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded"
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
                                  <Paperclip
                                    size={18}
                                    className="sm:w-5 sm:h-5"
                                  />
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
                            className="px-3 sm:px-4 py-1 bg-white rounded-md cursor-pointer text-sm"
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
                <div className="space-y-6 sm:space-y-8 lg:space-y-10 relative">
                  <div className="absolute -top-[15%] left-6 sm:left-9 z-10 w-0.5 h-[120%] bg-black" />
                  {timeline.map((entry, index) => (
                    <div
                      key={index}
                      className="w-[95%] md:w-full lg:w-3/5 ml-3 relative z-20"
                    >
                      {entry.type === "admin" ? (
                        <div className="flex items-start justify-between gap-3 sm:gap-4 pt-2 pb-1 px-2 md:px-4 bg-white rounded-full">
                          <div className="flex gap-2 items-center min-w-0 flex-1">
                            <div className="flex-shrink-0">
                              <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1 flex flex-col min-w-0">
                              <strong className="text-sm text-gray-800">
                                Admin
                              </strong>
                              <small className="text-xs sm:text-sm text-gray-500 break-words">
                                {entry.message}
                              </small>
                            </div>
                          </div>
                          <time className="text-gray-500 text-xs flex-shrink-0">
                            {entry.time}
                          </time>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-3 sm:gap-4 px-4 sm:px-6">
                          <div className="text-sm flex-1 min-w-0 break-words">
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

            {/* Right side */}
            <div className="w-full xl:w-72 xl:flex-shrink-0">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">About Client</h2>
                  <button className="cursor-pointer bg-gray-200 p-2 rounded-full">
                    <Pencil size={14} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Number</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-gray-800 flex-1 min-w-0 break-all">
                        {client.contact.number}
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(client.contact.number, "number")
                        }
                        className={`cursor-pointer flex-shrink-0 transition-colors ${
                          copied === "number"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {copied === "number" ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-gray-800 flex-1 min-w-0 break-all">
                        {client.contact.email}
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(client.contact.email, "email")
                        }
                        className={`cursor-pointer flex-shrink-0 transition-colors ${
                          copied === "email"
                            ? "text-green-600"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {copied === "email" ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-lg sm:text-xl mb-1">Client Note</p>
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <p className="text-gray-700 text-sm sm:text-base break-words">
                        {client.notes}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xl sm:text-2xl">Store credit</p>
                      <button
                        onClick={handleOpenStoreCreditModel}
                        className="cursor-pointer bg-gray-200 p-2 rounded-full"
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-5 rounded-lg">
                      <div className="flex gap-2 items-center">
                        <SaudiRiyal size={34} className="flex-shrink-0" />
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                          {client.storeCredit}
                        </span>
                      </div>
                      <button
                        onClick={handleOpenStoreCreditBalanceModel}
                        className="cursor-pointer bg-gray-200 p-2 rounded-full flex-shrink-0"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
