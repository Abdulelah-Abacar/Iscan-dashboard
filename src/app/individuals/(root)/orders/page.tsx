"use client";
import { useState } from "react";
import { Filter, ChevronDown, SaudiRiyal, Paperclip } from "lucide-react";
import Image from "next/image";

export default function Orders() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const filters = [
    "All",
    "Unfulfilled",
    "Unpaid",
    "Return Requests",
  ];

  const allOrders = [
    {
      id: "#4130",
      date: "22.4.2025",
      total: "999",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      hasAttachment: true,
    },
    {
      id: "#4131",
      date: "23.4.2025",
      total: "1250",
      paymentStatus: "Unpaid",
      fulfillmentStatus: "Unfulfilled",
      hasAttachment: false,
    },
    {
      id: "#4132",
      date: "24.4.2025",
      total: "750",
      paymentStatus: "Paid",
      fulfillmentStatus: "Unfulfilled",
      hasAttachment: true,
    },
    {
      id: "#4133",
      date: "25.4.2025",
      total: "2100",
      paymentStatus: "Unpaid",
      fulfillmentStatus: "Fulfilled",
      hasAttachment: false,
    },
    {
      id: "#4134",
      date: "26.4.2025",
      total: "450",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      hasReturnRequest: true,
      hasAttachment: true,
    },
    {
      id: "#4135",
      date: "27.4.2025",
      total: "890",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
      isLocalDelivery: true,
      hasAttachment: false,
    },
  ];

  // Filter logic
  const getFilteredOrders = () => {
    if (selectedFilter === "All") return allOrders;
    if (selectedFilter === "Unfulfilled") return allOrders.filter(o => o.fulfillmentStatus === "Unfulfilled");
    if (selectedFilter === "Unpaid") return allOrders.filter(o => o.paymentStatus === "Unpaid");
    if (selectedFilter === "Return Requests") return allOrders.filter(o => o.hasReturnRequest);
    if (selectedFilter === "Local Delivery") return allOrders.filter(o => o.isLocalDelivery);
    return allOrders;
  };

  const orders = getFilteredOrders();

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setSelectedOrders([]);
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectOrder = (index) => {
    if (selectedOrders.includes(index)) {
      setSelectedOrders(selectedOrders.filter((i) => i !== index));
      setSelectAll(false);
    } else {
      setSelectedOrders([...selectedOrders, index]);
      if (selectedOrders.length + 1 === orders.length) {
        setSelectAll(true);
      }
    }
  };

  return (
    <>
      <div className="flex items-center relative px-4 md:px-0">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className={`hidden lg:block absolute -left-13 top-5`}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">Orders</h1>
      </div>
      
      <section className="bg-gray-200 p-3 md:p-5 rounded-2xl md:rounded-4xl mt-5 w-full max-w-full overflow-hidden">
        {/* Orders Table Section */}
        <div className="mt-4 lg:mt-6 relative bg-white rounded-2xl md:rounded-4xl overflow-hidden">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 px-4 md:px-8 pt-3">
            <div className="flex flex-wrap gap-1 w-full sm:w-auto">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-3 md:px-6 py-1 rounded-full text-xs md:text-sm cursor-pointer whitespace-nowrap ${
                    selectedFilter === filter
                      ? "bg-gray-100"
                      : "hover:bg-gray-100/70"
                  }`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button className="p-2 bg-gray-100 rounded-full flex-shrink-0">
              <Filter className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-center text-gray-500 border-b border-gray-200 bg-gray-100">
                  <th className="py-4 font-normal w-12 text-sm lg:text-base">
                    <div className="flex items-center justify-center pl-6">
                      <input
                        type="checkbox"
                        className="rounded-md text-black focus:ring-black accent-black h-4 w-4"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th className="py-2 font-normal text-sm lg:text-base">Order ID</th>
                  <th className="py-2 font-normal text-sm lg:text-base">Date</th>
                  <th className="py-2 font-normal text-sm lg:text-base">Total</th>
                  <th className="py-2 font-normal text-sm lg:text-base">Payment</th>
                  <th className="py-2 font-normal text-sm lg:text-base">Fulfillment</th>
                  <th className="py-2 font-normal text-sm lg:text-base">Attachments</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className="text-center hover:bg-gray-100 cursor-pointer">
                    <td className="py-2">
                      <div className="flex items-center justify-center pl-6">
                        <input
                          type="checkbox"
                          className="rounded-md text-black focus:ring-black accent-black h-4 w-4"
                          checked={selectedOrders.includes(index)}
                          onChange={() => handleSelectOrder(index)}
                        />
                      </div>
                    </td>
                    <td className="py-2 font-medium text-sm lg:text-base">
                      {order.id}
                    </td>
                    <td className="py-2 text-sm lg:text-base">{order.date}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-center">
                        <SaudiRiyal />
                        <span className="ml-1 font-medium text-sm lg:text-base">{order.total}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center">
                        <span className={`px-3 lg:px-4 py-1.5 rounded-sm text-xs lg:text-sm font-bold flex items-center gap-2 ${
                          order.paymentStatus === "Paid" ? 'bg-green-100 text-green-700 border-2 border-green-700' : 'bg-yellow-100 text-yellow-700 border-2 border-yellow-700'
                        }`}>
                        <span className={`w-2 h-2 rounded-full ${order.paymentStatus === "Paid" ? "bg-green-700" : "bg-yellow-700"}`} />
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center">
                        <span className={`px-3 lg:px-4 py-1.5 rounded-sm text-xs lg:text-sm font-bold flex items-center gap-2 ${
                          order.fulfillmentStatus === "Fulfilled" ? 'bg-green-100 text-green-700 border-2 border-green-700' : 'bg-red-100 text-red-700 border-2 border-red-700'
                        }`}>
                        <span className={`w-2 h-2 rounded-full ${order.fulfillmentStatus === "Fulfilled" ? "bg-green-700" : "bg-red-700"}`} />
                          {order.fulfillmentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-2">
                      {order.hasAttachment ? (
                        <div className="flex justify-center">
                          <Paperclip className="text-gray-500" />
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden px-4 space-y-4 pb-4">
            {orders.map((order, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded-md text-black focus:ring-black accent-black h-4 w-4"
                      checked={selectedOrders.includes(index)}
                      onChange={() => handleSelectOrder(index)}
                    />
                      {order.id}
                  </div>
                  <span className="text-xs text-gray-500">{order.date}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total</span>
                    <div className="flex items-center">
                      <SaudiRiyal />
                      <span className="ml-1 font-medium text-sm">{order.total}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Payment</span>
                    <span className={`px-3 py-1 rounded-full text-xs flex items-center ${
                      order.paymentStatus === "Paid" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Fulfillment</span>
                    <span className={`px-3 py-1 rounded-full text-xs flex items-center ${
                      order.fulfillmentStatus === "Fulfilled" ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.fulfillmentStatus}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Attachments</span>
                    {order.hasAttachment ? (
                      <Paperclip className="text-gray-500" />
                    ) : (
                      <span className="text-gray-400 text-sm">None</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}