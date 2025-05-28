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
  X,
  Verified,
  CheckCircle2Icon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiyalIcon } from "@/components/RiyalIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logo.png";

export default function ClientProfile() {
  const [comment, setComment] = useState("");
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
    { id: "government", fill: "blue", label: "Government verification" },
    { id: "company", fill: "green", label: "Company verification" },
    { id: "paid", fill: "gray", label: "Paid user verification" },
    { id: "admin", fill: "yellow", label: "Platform admin verification" },
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

  return (
    <>
      <div className={`flex items-center justify-between gap-4 mb-8`}>
        <div className="flex items-center gap-4">
          <Link
            href="/clients"
            className="p-2 bg-white rounded-full group hover:scale-105 transition-all duration-700"
          >
            <ArrowLeft
              size={30}
              className="text-gray-600 group-hover:text-black"
            />
          </Link>
          <h1 className="text-5xl">Back to Clients</h1>
        </div>
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
      {/* Verification Step Model */}
      {isVerificationModelOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-gray-200 rounded-3xl space-y-8 py-4 px-8 text-center relative max-w-md w-full">
            <button
              onClick={handleOpenVerificationModel}
              className="absolute cursor-pointer p-1 bg-white rounded-full top-4 right-4"
            >
              <X size={12} />
            </button>
            <h1 className="text-2xl font-medium">Account verification</h1>
            <div className="flex justify-center items-center gap-5 py-2 px-8 bg-white rounded-lg">
              <button
                className={`cursor-pointer p-1 rounded-full ${
                  selectedVerification === "none"
                    ? "bg-blue-200"
                    : "bg-gray-300"
                }`}
                onClick={() => handleVerificationSelect("none")}
              >
                <X size={26} />
              </button>

              {verificationLevels.slice(1).map((level) => (
                <VerifiedIcon
                  key={level.id}
                  fill={level.fill}
                  size={46}
                  stroke="white"
                  className="rounded-full"
                  onClick={() => handleVerificationSelect(level.id)}
                  isSelected={selectedVerification === level.id}
                />
              ))}
            </div>

            {selectedVerification && (
              <p className="text-gray-700">
                Selected:{" "}
                {
                  verificationLevels.find((v) => v.id === selectedVerification)
                    ?.label
                }
              </p>
            )}

            <div className="flex gap-8 justify-center items-center">
              <button
                onClick={handleOpenVerificationModel}
                className="rounded-full py-2 px-5 text-white bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveVerification}
                className="rounded-full py-2 px-5 text-white bg-cyan-500 cursor-pointer"
                disabled={!selectedVerification}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Success Model */}
      {isSuccessModelOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-gray-200 rounded-3xl space-y-8 py-4 px-8 text-center relative max-w-md w-full">
            <div>
              <CheckCircle2Icon
                fill="green"
                stroke="#e5e7eb"
                size={150}
                className="mx-auto"
              />
            </div>
            <h1 className="text-2xl">Authentication status updated</h1>

            <div className="flex gap-8 justify-center items-center">
              <button
                onClick={handleCloseSuccessModel}
                className="rounded-md w-32 py-2 px-5 text-white bg-blue-500 cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Store Credit Model */}
      {isStoreCreditModelOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-40">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">Edit balance</h3>
              <button
                onClick={handleOpenStoreCreditModel}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Adjustment</p>
                <div className="flex">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-blue-600"
                      checked={adjustment === "credit"}
                      onChange={() => setAdjustment("credit")}
                    />
                    <span className="ml-2">Credit</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-blue-600"
                      checked={adjustment === "debit"}
                      onChange={() => {
                        setAdjustment("debit");
                        setHasExpiration(false); // Reset expiration when switching to debit
                      }}
                    />
                    <span className="ml-2">Debit</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <div className="w-1/2 pr-2">
                    <p className="text-gray-700 mb-2">Currency</p>
                    <div className="relative">
                      <input
                        type="text"
                        value="Saudi Riyal (SAR)"
                        className="border border-gray-300 rounded-md px-4 py-2 pl-10 w-full"
                        readOnly
                        disabled
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2 pl-2">
                    <p className="text-gray-700 mb-2">Amount</p>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-l-md px-4 py-2 pl-16 w-full"
                          placeholder="0.00 SAR"
                          value={amount}
                          onChange={(e) => {
                            // Only allow numbers and decimal point
                            const value = e.target.value;
                            if (/^[0-9]*\.?[0-9]*$/.test(value)) {
                              setAmount(value);
                            }
                          }}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">+ SAR</span>
                        </div>
                      </div>
                      <div className="bg-gray-100 border border-gray-300 border-l-0 rounded-r-md px-3 py-2 text-gray-700">
                        SAR
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  Current balance is SAR {customerCredit.toFixed(2)}
                </div>
              </div>

              {/* Expiration date section - only show for credit */}
              {adjustment === "credit" && (
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">Expiration date</p>
                  <p className="text-sm text-gray-500 mb-2">
                    Countries have different laws for store credit expiration
                    dates. Check the laws for your country before changing this
                    date.
                  </p>

                  <div className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        checked={!hasExpiration}
                        onChange={() => setHasExpiration(false)}
                      />
                      <span className="ml-2">No expiration date</span>
                    </label>
                  </div>

                  <div className="mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio h-4 w-4 text-blue-600"
                        checked={hasExpiration}
                        onChange={() => setHasExpiration(true)}
                      />
                      <span className="ml-2">Set expiration date</span>
                    </label>
                  </div>

                  {/* Date picker that appears when "Set expiration date" is selected */}
                  {hasExpiration && (
                    <div className="mt-3 ml-6">
                      <div className="flex flex-col space-y-2">
                        <label
                          htmlFor="expiration-date"
                          className="text-sm text-gray-600"
                        >
                          Select expiration date
                        </label>
                        <div className="relative w-full">
                          <input
                            id="expiration-date"
                            type="date"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={expirationDate}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]} // Set min date to today
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Credit will expire at 11:59 PM on the selected date
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md mr-2 hover:bg-gray-200"
                onClick={handleOpenStoreCreditModel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                onClick={() => {
                  handleOpenStoreCreditSummeryModel();
                  handleOpenStoreCreditModel();
                }}
              >
                Review changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Store Credit Summary Model */}
      {isStoreCreditSummeryModelOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-30">
          <div className="bg-white rounded-lg shadow-lg w-96 max-w-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">Review changes</span>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsStoreCreditSummeryModelOpen(false)}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Summary
              </h3>

              {/* Balance */}
              <div className="flex justify-between items-center py-2 text-sm">
                <span className="text-gray-600">Balance</span>
                <span className="font-medium">
                  SAR {customerCredit.toFixed(2)}
                </span>
              </div>

              {/* Amount to credit/debit */}
              <div className="flex justify-between items-center py-2 text-sm border-b pb-4">
                <span className="text-gray-600">Amount to {adjustment}</span>
                <span
                  className={`font-medium ${
                    adjustment === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {adjustment === "credit" ? "+" : "-"}SAR{" "}
                  {parseFloat(amount || 0).toFixed(2)}
                </span>
              </div>

              {/* New balance */}
              <div className="flex justify-between items-center py-4 text-sm">
                <span className="text-gray-600">New balance</span>
                <span className="font-medium">
                  SAR{" "}
                  {(adjustment === "credit"
                    ? customerCredit + parseFloat(amount || 0)
                    : customerCredit - parseFloat(amount || 0)
                  ).toFixed(2)}
                </span>
              </div>

              {/* Expiration info - only show if credit with expiration */}
              {adjustment === "credit" && hasExpiration && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Expiration date</span>
                    <span className="font-medium">
                      {new Date(expirationDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end p-4 space-x-2 border-t">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                onClick={() => setIsStoreCreditSummeryModelOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleReviewChanges}
                className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm ${
                  adjustment === "credit"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {adjustment === "credit" ? "Credit" : "Debit"} SAR{" "}
                {parseFloat(amount || 0).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Store Credit Balance Model */}
      {isStoreCreditBalanceModelOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm z-30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-medium">
                  Store credit for OAM SDD
                </span>
              </div>
              <button
                onClick={handleOpenStoreCreditBalanceModel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Balance Summary */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50">
              <div className="bg-white rounded-md shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">Balance</div>
                <div className="font-medium text-lg">SAR 0.00</div>
              </div>
              <div className="bg-white rounded-md shadow-sm p-4">
                <div className="text-sm text-gray-500 mb-1">
                  Expirable amounts
                </div>
                <div className="font-medium text-lg">SAR 0.00</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-6">
              <button
                className={`py-3 px-4 text-sm font-medium ${
                  activeTab === "allTransactions"
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("allTransactions")}
              >
                All transactions
              </button>
              <button
                className={`py-3 px-4 text-sm font-medium ${
                  activeTab === "expirableAmounts"
                    ? "border-b-2 border-indigo-600 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("expirableAmounts")}
              >
                Expirable amounts
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-grow">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span>Date</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Event
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Source
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Expired
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Debit
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Credit
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-4">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {transaction.date}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {transaction.event}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {transaction.source}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900"></td>
                      <td className="py-3 px-4 text-sm text-red-600">
                        {transaction.debit}
                      </td>
                      <td className="py-3 px-4 text-sm text-green-600">
                        {transaction.credit}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {transaction.balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t text-center text-sm text-gray-500">
              <span>Learn more about </span>
              <a href="#" className="text-blue-600 hover:underline">
                store credit
              </a>
            </div>

            {/* Action Button */}
            <div className="p-4 border-t flex justify-end">
              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium"
                onClick={handleOpenStoreCreditModel}
              >
                Edit balance
              </button>
            </div>
          </div>
        </div>
      )}

      <section>
        <div className="bg-gray-200 rounded-3xl p-4">
          <div className="flex gap-6">
            {/* Left side */}
            <div className="flex-1 space-y-10">
              {/* Client Header */}
              <div className="flex justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <strong className="text-xl font-semibold text-gray-800">
                      {client.name}
                    </strong>
                    <br />
                    <small className="text-sm text-gray-500">
                      Clients since {client.since}
                    </small>
                  </div>
                  <button
                    onClick={handleOpenVerificationModel}
                    className="p-2 rounded-full bg-white cursor-pointer hover:scale-95 hover:bg-white/70 transition-all duration-300"
                  >
                    <User size={26} />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-12 bg-white rounded-full py-2 px-8">
                  <div className="flex-1 text-center min-w-fit">
                    <p className="text-xs">Amount spent</p>
                    <p className="text-sm w-full font-bold flex items-center justify-center bg-gray-200 rounded-full px-3 py-1">
                      <RiyalIcon size={12} />
                      {client.amountSpent}
                    </p>
                  </div>
                  <div className="flex-1 text-center min-w-fit">
                    <p className="text-xs">Orders</p>
                    <p className="text-sm w-full font-bold flex items-center justify-center bg-gray-200 rounded-full px-3 py-1">
                      {client.orders}
                    </p>
                  </div>
                  <div className="flex-1 text-center min-w-fit">
                    <p className="text-xs">Customer since</p>
                    <p className="text-sm w-full font-bold flex items-center justify-center bg-gray-200 rounded-full px-3 py-1">
                      {client.customerSince}
                    </p>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl pb-4 shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 uppercase bg-gray-100 rounded-xl overflow-hidden">
                      <th className="py-3 text-center font-medium rounded-l-xl">
                        ID
                      </th>
                      <th className="py-3 text-center font-medium">DATE</th>
                      <th className="py-3 text-center font-medium">TOTAL</th>
                      <th className="py-3 text-center font-medium">STATUS</th>
                      <th className="py-3 text-center font-medium rounded-r-xl"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index}>
                        <td className="py-3 text-center">{order.id}</td>
                        <td className="py-3 text-center">{order.date}</td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <RiyalIcon size={12} /> {order.total}
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <div className="flex justify-center">
                            <span
                              className={`inline-flex items-center justify-center px-4 py-1 rounded-full text-xs font-medium w-24 ${
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {order.status}{" "}
                              {order.status === "Completed" && (
                                <CheckCircle size={14} className="ml-1" />
                              )}
                              {order.status === "Refund" && (
                                <span className="ml-1">▼</span>
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
                <div className="mt-4 text-center">
                  <button className="px-4 py-1 w-54 rounded-full bg-gray-100 cursor-pointer text-sm">
                    See all orders
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
                              <strong className="text-sm text-gray-800">
                                Admin
                              </strong>
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
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">About Client</h2>
                  <button className="cursor-pointer bg-gray-200 p-2 rounded-full">
                    <Pencil size={14} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Number</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-800">{client.contact.number}</p>
                      <button className="cursor-pointer">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-800">{client.contact.email}</p>
                      <button className="cursor-pointer">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xl mb-1">Client Note</p>
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <p className="text-gray-700">{client.notes}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-2xl">Store credit</p>
                      <button
                        onClick={handleOpenStoreCreditModel}
                        className="cursor-pointer bg-gray-200 p-2 rounded-full"
                      >
                        <Pencil size={14} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-5 rounded-lg">
                      <div className="flex gap-2 items-center">
                        <RiyalIcon />
                        <span className="text-4xl font-bold">
                          {client.storeCredit}
                        </span>
                      </div>
                      <button
                        onClick={handleOpenStoreCreditBalanceModel}
                        className="cursor-pointer bg-gray-200 p-2 rounded-full"
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

const VerifiedIcon = ({
  fill,
  size,
  stroke,
  className,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${className} ${
        isSelected ? "border-4 border-black" : ""
      } cursor-pointer`}
    >
      {/* <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill={fill} />
        <path 
          d="M8 12L10.5 14.5L16 9" 
          stroke={stroke} 
          strokeWidth="2" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg> */}
      <Verified fill={fill} size={size} stroke={stroke} />
    </div>
  );
};
