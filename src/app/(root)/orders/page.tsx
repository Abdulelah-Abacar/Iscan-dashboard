"use client";
import { useState } from "react";
import { Filter, ChevronDown, SaudiRiyal } from "lucide-react";
import { ArrowStatus } from "@/components/ArrowStatus";
import Image from "next/image";

export default function Orders() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const filters = [
    "All",
    "Unfulfilled",
    "Unpaid",
    "Return requests",
    "Local Delivery",
  ];

  const orders = [
    {
      id: "#4130",
      date: "22.4.2025",
      client: "Ahmed b.",
      total: "999",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
    },
    {
      id: "#4130",
      date: "22.4.2025",
      client: "Ahmed b.",
      total: "999",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
    },
    {
      id: "#4130",
      date: "22.4.2025",
      client: "Ahmed b.",
      total: "999",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
    },
    {
      id: "#4130",
      date: "22.4.2025",
      client: "Ahmed b.",
      total: "999",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
    },
    {
      id: "#4130",
      date: "22.4.2025",
      client: "Ahmed b.",
      total: "999",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
    },
    {
      id: "#4130",
      date: "22.4.2025",
      client: "Ahmed b.",
      total: "999",
      paymentStatus: "Paid",
      fulfillmentStatus: "Fulfilled",
    },
  ];

  const data = [
    { name: "Jan", value: 68 },
    { name: "Feb", value: 72 },
    { name: "Mar", value: 65 },
    { name: "Apr", value: 70 },
    { name: "May", value: 75 },
    { name: "Jun", value: 82 },
    { name: "Jul", value: 78 },
    { name: "Aug", value: 85 },
    { name: "Sep", value: 90 },
    { name: "Oct", value: 88 },
    { name: "Nov", value: 85 },
    { name: "Dec", value: 92 },
  ];

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
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
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className="hidden md:block absolute -left-13 top-5"
        />
        <h1 className="text-5xl font-normal">Orders</h1>
      </div>
      <section className="bg-gray-200 p-5 rounded-4xl mt-5 min-w-5xl">
        <div className="flex items-center justify-between gap-2">
          <div className="bg-gray-100 rounded-3xl flex-1 flex justify-between divide-x-4 divide-black">
            <div className="py-1 px-5 flex items-center flex-col justify-center">
              <span className="text-sm">Last</span>
              <div className="py-2 px-4 rounded-full bg-white text-xs">
                <span>30</span> <span>Days</span>
              </div>
            </div>
            <div className="p-1 flex items-center flex-col justify-center relative">
              <div className="flex items-center justify-between">
                <span className="text-sm">Orders</span>
                <div className="bg-white rounded-full py-1 px-2 scale-[40%]">
                  <ArrowStatus isPositive={true} status={"%21.4"} />
                </div>
              </div>
              <div className="w-20 h-6 relative">
                <span className="text-sm absolute -left-3 top-1/2 -translate-y-1/2 z-20">
                  1290
                </span>
                <MiniBarChart data={data} className="h-full opacity-50" />
              </div>
            </div>
            <div className="p-1 flex items-center flex-col justify-center">
              <span className="text-sm">Ordered items</span>
              <div className="flex items-center justify-between">
                <span>99</span>
                <div className="bg-white rounded-full py-1 px-2 scale-50">
                  <ArrowStatus isPositive={true} status={"%21.4"} />
                </div>
              </div>
            </div>
            <div className="p-1 flex items-center flex-col justify-center">
              <span className="text-sm">Returned items</span>
              <div className="flex items-center justify-between">
                <span>2</span>
                <div className="bg-white rounded-full py-1 px-2 scale-50">
                  <ArrowStatus isPositive={false} status={"%1.4"} />
                </div>
              </div>
            </div>
            <div className="p-1 w-fit flex items-center flex-col justify-center relative">
              <div className="flex items-center justify-center">
                <span className="text-sm">Fulfilled items</span>
                <div className="bg-white rounded-full py-1 px-2 scale-[40%]">
                  <ArrowStatus isPositive={true} status={"%21.4"} />
                </div>
              </div>
              <div className="w-20 h-6 relative">
                <span className="text-sm absolute -left-3 top-1/2 -translate-y-1/2 z-20">
                  1290
                </span>
                <MiniBarChart data={data} className="h-full opacity-50" />
              </div>
            </div>
            <div className="p-1 pr-5 flex items-center flex-col justify-center">
              <span className="text-sm">Delivered orders</span>
              <div className="flex items-center justify-between">
                <span>99</span>
                <div className="bg-white rounded-full py-1 px-2 scale-50">
                  <ArrowStatus isPositive={true} status={"%21.4"} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-gray-100 px-6 py-3 rounded-lg font-medium">
              Create order
            </button>
          </div>
        </div>

        {/* Orders */}
        <div className="mt-6 relative bg-white rounded-4xl">
          {/* Filters */}
          <div className="flex justify-between items-center mb-4 px-8 pt-3">
            <div className="flex space-x-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-6 py-1 rounded-full text-sm cursor-pointer ${
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
            <button className="p-2 bg-gray-100 rounded-full">
              <Filter className="h-5 w-5" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-center text-gray-500 border-b border-gray-200 bg-gray-100">
                  <th className="py-4 font-normal w-12 text-base">
                    <div className="flex items-center justify-center pl-6">
                      <input
                        type="checkbox"
                        className="rounded-md text-black focus:ring-black accent-black h-4 w-4"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  <th className="py-2 font-normal text-base">ID</th>
                  <th className="py-2 font-normal text-base">DATE</th>
                  <th className="py-2 font-normal text-base">Clients</th>
                  <th className="py-2 font-normal text-base">Total</th>
                  <th className="py-2 font-normal text-base">Payment status</th>
                  <th className="py-2 font-normal text-base">
                    Fulfillment status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className=" text-center">
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
                    <td className="py-2 font-medium">{order.id}</td>
                    <td className="py-2">{order.date}</td>
                    <td className="py-2">{order.client}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-center">
                        <SaudiRiyal />
                        <span className="ml-1 font-medium">{order.total}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center">
                        <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                          {order.paymentStatus}
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center">
                        <span className="px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                          {order.fulfillmentStatus}
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

const MiniBarChart = ({ data, className }) => {
  // This is a simplified version - in real implementation, you'd use the actual MiniBarChart component
  return (
    <div
      className={`flex items-end space-x-0.5 border-b-2 border-black ${className}`}
    >
      {data.map((item, i) => {
        // Create the tricolor effect with divs
        const height = item.value / 3;
        const section = height / 3;

        return (
          <div key={i} className="relative w-2">
            {/* Top section - light green */}
            <div
              className="absolute bottom-0 w-full rounded-t-sm bg-green-400"
              style={{ height: `${section}px`, bottom: `${section * 2}px` }}
            />
            {/* Middle section - medium green */}
            <div
              className="absolute bottom-0 w-full bg-green-500"
              style={{ height: `${section}px`, bottom: `${section}px` }}
            />
            {/* Bottom section - dark green */}
            <div
              className="absolute bottom-0 w-full bg-green-700"
              style={{ height: `${section}px` }}
            />
          </div>
        );
      })}
    </div>
  );
};
