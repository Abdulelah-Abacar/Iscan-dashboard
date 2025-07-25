"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Filter, ChevronDown, SaudiRiyal } from "lucide-react";
import { ArrowStatus } from "@/components/ArrowStatus";
import Image from "next/image";
import Link from "next/link";

export default function Orders() {
  const t = useTranslations('orders');
  const locale = useLocale();
  const [selectedFilter, setSelectedFilter] = useState(t('filters.all'));
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const filters = [
    t('filters.all'),
    t('filters.unfulfilled'),
    t('filters.unpaid'),
    t('filters.returnRequests'),
    t('filters.localDelivery'),
  ];

  const allOrders = [
    {
      id: "#4130",
      date: "22.4.2025",
      client: "Ahmed b.",
      total: "999",
      paymentStatus: t('status.paid'),
      fulfillmentStatus: t('status.fulfilled'),
    },
    {
      id: "#4131",
      date: "23.4.2025",
      client: "Sara A.",
      total: "1250",
      paymentStatus: t('status.unpaid'),
      fulfillmentStatus: t('status.unfulfilled'),
    },
    {
      id: "#4132",
      date: "24.4.2025",
      client: "Omar K.",
      total: "750",
      paymentStatus: t('status.paid'),
      fulfillmentStatus: t('status.unfulfilled'),
    },
    {
      id: "#4133",
      date: "25.4.2025",
      client: "Fatima H.",
      total: "2100",
      paymentStatus: t('status.unpaid'),
      fulfillmentStatus: t('status.fulfilled'),
    },
    {
      id: "#4134",
      date: "26.4.2025",
      client: "Hassan M.",
      total: "450",
      paymentStatus: t('status.paid'),
      fulfillmentStatus: t('status.fulfilled'),
      hasReturnRequest: true,
    },
    {
      id: "#4135",
      date: "27.4.2025",
      client: "Nour S.",
      total: "890",
      paymentStatus: t('status.paid'),
      fulfillmentStatus: t('status.fulfilled'),
      isLocalDelivery: true,
    },
  ];

  // Filter logic
  const getFilteredOrders = () => {
    if (selectedFilter === t('filters.all')) return allOrders;
    if (selectedFilter === t('filters.unfulfilled')) return allOrders.filter(o => o.fulfillmentStatus === t('status.unfulfilled'));
    if (selectedFilter === t('filters.unpaid')) return allOrders.filter(o => o.paymentStatus === t('status.unpaid'));
    if (selectedFilter === t('filters.returnRequests')) return allOrders.filter(o => o.hasReturnRequest);
    if (selectedFilter === t('filters.localDelivery')) return allOrders.filter(o => o.isLocalDelivery);
    return allOrders;
  };

  const orders = getFilteredOrders();

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
          className={`hidden lg:block absolute ${locale == 'ar' ? '-right-13 rotate-180' : '-left-13'} top-5`}
        />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal">{t('title')}</h1>
      </div>
      
      <section className="bg-gray-200 p-3 md:p-5 rounded-2xl md:rounded-4xl mt-5 w-full max-w-full overflow-hidden">
        {/* Stats Section - Responsive Grid */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 mb-4 lg:mb-0">
          {/* Stats Grid */}
          <div className="bg-gray-100 rounded-2xl md:rounded-3xl flex-1 overflow-hidden">
            {/* Mobile: Stack vertically */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-300">
              <div className="py-3 px-4 flex items-center flex-col justify-center">
                <span className="text-sm mb-2">{t('stats.last')}</span>
                <div className="py-2 px-4 rounded-full bg-white text-xs">
                  <span>30</span> <span>{t('stats.days')}</span>
                </div>
              </div>
              <div className="py-3 px-4 flex items-center flex-col justify-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-sm mr-2">{t('stats.orders')}</span>
                  <div className="bg-white rounded-full py-1 px-2 scale-75">
                    <ArrowStatus isPositive={true} status={"%21.4"} />
                  </div>
                </div>
                <div className="w-16 h-6 relative">
                  <span className="text-sm absolute -left-2 top-1/2 -translate-y-1/2 z-20">
                    1290
                  </span>
                  <MiniBarChart data={data} className="h-full opacity-50" />
                </div>
              </div>
            </div>
            
            {/* Mobile: Second row */}
            <div className="grid grid-cols-2 lg:hidden divide-x divide-gray-300 border-t border-gray-300">
              <div className="py-3 px-4 flex items-center flex-col justify-center">
                <span className="text-xs mb-2 text-center">{t('stats.orderedItems')}</span>
                <div className="flex items-center justify-center">
                  <span className="mr-2">99</span>
                  <div className="bg-white rounded-full py-1 px-2 scale-75">
                    <ArrowStatus isPositive={true} status={"%21.4"} />
                  </div>
                </div>
              </div>
              <div className="py-3 px-4 flex items-center flex-col justify-center">
                <span className="text-xs mb-2 text-center">{t('stats.returnedItems')}</span>
                <div className="flex items-center justify-center">
                  <span className="mr-2">2</span>
                  <div className="bg-white rounded-full py-1 px-2 scale-75">
                    <ArrowStatus isPositive={false} status={"%1.4"} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile: Third row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-300 border-t border-gray-300">
              <div className="py-3 px-4 flex items-center flex-col justify-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-xs mr-2 text-center">{t('stats.fulfilledItems')}</span>
                  <div className="bg-white rounded-full py-1 px-2 scale-75">
                    <ArrowStatus isPositive={true} status={"%21.4"} />
                  </div>
                </div>
                <div className="w-16 h-6 relative">
                  <span className="text-sm absolute -left-2 top-1/2 -translate-y-1/2 z-20">
                    1290
                  </span>
                  <MiniBarChart data={data} className="h-full opacity-50" />
                </div>
              </div>
              <div className="py-3 px-4 flex items-center flex-col justify-center">
                <span className="text-xs mb-2 text-center">{t('stats.deliveredOrders')}</span>
                <div className="flex items-center justify-center">
                  <span className="mr-2">99</span>
                  <div className="bg-white rounded-full py-1 px-2 scale-75">
                    <ArrowStatus isPositive={true} status={"%21.4"} />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Original horizontal layout */}
            <div className="hidden lg:flex justify-between divide-x-4 divide-black">
              <div className="py-1 px-5 flex items-center flex-col justify-center">
                <span className="text-sm">{t('stats.last')}</span>
                <div className="py-2 px-4 rounded-full bg-white text-xs">
                  <span>30</span> <span>{t('stats.days')}</span>
                </div>
              </div>
              <div className="p-1 flex items-center flex-col justify-center relative">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('stats.orders')}</span>
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
                <span className="text-sm">{t('stats.orderedItems')}</span>
                <div className="flex items-center justify-between">
                  <span>99</span>
                  <div className="bg-white rounded-full py-1 px-2 scale-50">
                    <ArrowStatus isPositive={true} status={"%21.4"} />
                  </div>
                </div>
              </div>
              <div className="p-1 flex items-center flex-col justify-center">
                <span className="text-sm">{t('stats.returnedItems')}</span>
                <div className="flex items-center justify-between">
                  <span>2</span>
                  <div className="bg-white rounded-full py-1 px-2 scale-50">
                    <ArrowStatus isPositive={false} status={"%1.4"} />
                  </div>
                </div>
              </div>
              <div className="p-1 w-fit flex items-center flex-col justify-center relative">
                <div className="flex items-center justify-center">
                  <span className="text-sm">{t('stats.fulfilledItems')}</span>
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
                <span className="text-sm">{t('stats.deliveredOrders')}</span>
                <div className="flex items-center justify-between">
                  <span>99</span>
                  <div className="bg-white rounded-full py-1 px-2 scale-50">
                    <ArrowStatus isPositive={true} status={"%21.4"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Create Order Button */}
          <div className="flex justify-center lg:justify-end">
            <button className="bg-gray-100 px-4 md:px-6 py-3 rounded-lg font-medium text-sm md:text-base w-full sm:w-auto">
              {t('createOrder')}
            </button>
          </div>
        </div>

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
                  <th className="py-2 font-normal text-sm lg:text-base">{t('table.id')}</th>
                  <th className="py-2 font-normal text-sm lg:text-base">{t('table.date')}</th>
                  <th className="py-2 font-normal text-sm lg:text-base">{t('table.clients')}</th>
                  <th className="py-2 font-normal text-sm lg:text-base">{t('table.total')}</th>
                  <th className="py-2 font-normal text-sm lg:text-base">{t('table.paymentStatus')}</th>
                  <th className="py-2 font-normal text-sm lg:text-base">{t('table.fulfillmentStatus')}</th>
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
                      <Link href={`/admin/orders/1`}>
                        {order.id}
                      </Link>
                    </td>
                    <td className="py-2 text-sm lg:text-base">{order.date}</td>
                    <td className="py-2 text-sm lg:text-base">{order.client}</td>
                    <td className="py-2">
                      <div className="flex items-center justify-center">
                        <SaudiRiyal />
                        <span className="ml-1 font-medium text-sm lg:text-base">{order.total}</span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center">
                        <span className={`px-3 lg:px-4 py-1.5 rounded-full text-xs lg:text-sm flex items-center ${
                          order.paymentStatus === t('status.paid') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center">
                        <span className={`px-3 lg:px-4 py-1.5 rounded-full text-xs lg:text-sm flex items-center ${
                          order.fulfillmentStatus === t('status.fulfilled') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.fulfillmentStatus}
                        </span>
                      </div>
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
                    <Link href={`/admin/orders/1`} className="font-medium text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      {order.id}
                    </Link>
                  </div>
                  <span className="text-xs text-gray-500">{order.date}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('table.client')}</span>
                    <span className="text-sm font-medium">{order.client}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('table.total')}</span>
                    <div className="flex items-center">
                      <SaudiRiyal />
                      <span className="ml-1 font-medium text-sm">{order.total}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('table.payment')}</span>
                    <span className={`px-3 py-1 rounded-full text-xs flex items-center ${
                      order.paymentStatus === t('status.paid') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('table.fulfillment')}</span>
                    <span className={`px-3 py-1 rounded-full text-xs flex items-center ${
                      order.fulfillmentStatus === t('status.fulfilled') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.fulfillmentStatus}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </span>
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