"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  CalendarIcon,
  Filter,
  Eye,
  MousePointer,
  TrendingUp,
  Info,
  LinkIcon,
  Percent,
  Link2,
  ChevronDownIcon,
} from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Sample data for the chart
const chartData = [
  { date: "Sat 28", views: 0, clicks: 0, uniqueViews: 0, uniqueClicks: 0 },
  { date: "Sun 29", views: 3, clicks: 3, uniqueViews: 3, uniqueClicks: 3 },
  { date: "Mon 30", views: 2, clicks: 2, uniqueViews: 2, uniqueClicks: 2 },
  { date: "Tue 01", views: 1, clicks: 1, uniqueViews: 1, uniqueClicks: 1 },
  { date: "Wed 02", views: 0, clicks: 0, uniqueViews: 0, uniqueClicks: 0 },
  { date: "Thu 03", views: 0, clicks: 0, uniqueViews: 0, uniqueClicks: 0 },
  { date: "Fri 04", views: 0, clicks: 0, uniqueViews: 0, uniqueClicks: 0 },
];

const Analytics = () => {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState("views");
  const [open, setOpen] = React.useState(false)
  const [dateRange, setDateRange] = React.useState({
    from: new Date(),
    to: undefined
  })
  const [selectedMetrics, setSelectedMetrics] = useState({
    views: true,
    uniqueViews: false,
    clicks: true,
    uniqueClicks: false,
  });

  const toggleMetric = (metric) => {
    setSelectedMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  const formatDate = (date) => {
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' : 
                               day % 10 === 2 && day !== 12 ? 'nd' : 
                               day % 10 === 3 && day !== 13 ? 'rd' : 'th');
    return `${month} ${dayWithSuffix}`;
  };

  const formatDateRange = () => {
    if (!dateRange?.from) {
      return "Select date range";
    }
    
    if (dateRange.from && !dateRange.to) {
      return formatDate(dateRange.from);
    }
    
    if (dateRange.from && dateRange.to) {
      return `${formatDate(dateRange.from)} to ${formatDate(dateRange.to)}`;
    }
    
    return "Select date range";
  };

  return (
    <>
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={70}
          height={75}
          className={`hidden lg:block absolute ${
            locale == "ar" ? "-right-13 rotate-180" : "-left-13"
          } top-5`}
        />
        <h1 className="text-3xl md:text-5xl font-normal">Analytics</h1>
      </div>

      <section className="bg-gray-200 p-3 md:p-5 rounded-4xl mt-5 mb-24 md:mb-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-light text-gray-900">Reports</h1>
          <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  className="flex items-center gap-5 text-sm border border-black text-gray-600 bg-white hover:bg-gray-50 px-8 py-2 rounded-md"
                >
                  <CalendarIcon size={34} />
                  {formatDateRange()}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="range"
                  selected={dateRange}
                  captionLayout="dropdown"
                  onSelect={(range) => {
                    setDateRange(range);
                    // Close popover when both dates are selected
                    if (range?.from && range?.to) {
                      setOpen(false);
                    }
                  }}
                  numberOfMonths={2}
                  disabled={(date) => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    tomorrow.setHours(0, 0, 0, 0);
                    return date >= tomorrow;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Life Time Stats */}
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-gray-900 mb-2">Life Time</h2>
          <div className="flex items-center justify-between gap-5 p-5 bg-gray-100 rounded-lg">
            {/* Views */}
            <div className="">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="bg-white p-2 rounded-full" size={50} />
                <span className="text-3xl font-bold text-gray-900">687</span>
                <span className="text-2xl">Views</span>
              </div>
            </div>

            {/* Clicks */}
            <div className="">
              <div className="flex items-center gap-3 mb-2">
                <Link2 className="bg-white p-2 rounded-full" size={50} />
                <span className="text-3xl font-bold text-gray-900">687</span>
                <span className="text-2xl">Clicks</span>
              </div>
            </div>

            {/* Click Rate */}
            <div className="">
              <div className="flex items-center gap-3 mb-2">
                <Percent className="bg-white p-2 rounded-full" size={50} />
                <span className="text-3xl font-bold text-gray-900">86%</span>
                <span className="text-2xl">Click rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          {/* Chart Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900">Activity</h3>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 mb-4">
              <button
                onClick={() => setActiveTab("views")}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "views"
                    ? "border-black text-black font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Views and clicks
              </button>
              <button
                onClick={() => setActiveTab("rate")}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "rate"
                    ? "border-black text-black font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                Click rate
              </button>
            </div>

            {/* Current Stats */}
            <div className="flex gap-8 text-sm">
              <div>
                <span className="text-gray-600">Views: </span>
                <span className="font-semibold">1</span>
              </div>
              <div>
                <span className="text-gray-600">Clicks: </span>
                <span className="font-semibold">0</span>
              </div>
              <div className="ml-auto text-gray-600">Daily</div>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    domain={[0, 4]}
                    ticks={[0, 2, 4]}
                  />
                  {selectedMetrics.views && (
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: "#3B82F6",
                        strokeWidth: 2,
                        fill: "#fff",
                      }}
                    />
                  )}
                  {selectedMetrics.clicks && (
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#EF4444"
                      strokeWidth={2}
                      dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: "#EF4444",
                        strokeWidth: 2,
                        fill: "#fff",
                      }}
                    />
                  )}
                  {selectedMetrics.uniqueViews && (
                    <Line
                      type="monotone"
                      dataKey="uniqueViews"
                      stroke="#06B6D4"
                      strokeWidth={2}
                      dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: "#06B6D4",
                        strokeWidth: 2,
                        fill: "#fff",
                      }}
                    />
                  )}
                  {selectedMetrics.uniqueClicks && (
                    <Line
                      type="monotone"
                      dataKey="uniqueClicks"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                      activeDot={{
                        r: 6,
                        stroke: "#F59E0B",
                        strokeWidth: 2,
                        fill: "#fff",
                      }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mt-6 pt-4 border-t">
              <button
                onClick={() => toggleMetric("views")}
                className="flex items-center gap-2 text-sm border border-black rounded-full py-1.5 px-5"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedMetrics.views ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={
                    selectedMetrics.views ? "text-gray-900" : "text-gray-500"
                  }
                >
                  Views
                </span>
                <div
                  className={`w-4 h-4 rounded border ${
                    selectedMetrics.views
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {selectedMetrics.views && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </button>

              <button
                onClick={() => toggleMetric("uniqueViews")}
                className="flex items-center gap-2 text-sm border border-black rounded-full py-1.5 px-5"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedMetrics.uniqueViews ? "bg-cyan-500" : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={
                    selectedMetrics.uniqueViews
                      ? "text-gray-900"
                      : "text-gray-500"
                  }
                >
                  Unique views
                </span>
                <div
                  className={`w-4 h-4 rounded border ${
                    selectedMetrics.uniqueViews
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {selectedMetrics.uniqueViews && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </button>

              <button
                onClick={() => toggleMetric("clicks")}
                className="flex items-center gap-2 text-sm border border-black rounded-full py-1.5 px-5"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedMetrics.clicks ? "bg-red-500" : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={
                    selectedMetrics.clicks ? "text-gray-900" : "text-gray-500"
                  }
                >
                  Clicks
                </span>
                <div
                  className={`w-4 h-4 rounded border ${
                    selectedMetrics.clicks
                      ? "bg-red-500 border-red-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {selectedMetrics.clicks && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </button>

              <button
                onClick={() => toggleMetric("uniqueClicks")}
                className="flex items-center gap-2 text-sm border border-black rounded-full py-1.5 px-5"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    selectedMetrics.uniqueClicks
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  }`}
                ></div>
                <span
                  className={
                    selectedMetrics.uniqueClicks
                      ? "text-gray-900"
                      : "text-gray-500"
                  }
                >
                  Unique clicks
                </span>
                <div
                  className={`w-4 h-4 rounded border ${
                    selectedMetrics.uniqueClicks
                      ? "bg-yellow-500 border-yellow-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {selectedMetrics.uniqueClicks && (
                    <span className="text-white text-xs">✓</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-8 relative">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Content</h3>
              <Info className="w-4 h-4 text-gray-400" />
            </div>

            {/* Content Tabs */}
            <div className="flex gap-6">
              <button className="pb-2 text-sm border-b-2 border-black text-black font-semibold">
                Links
              </button>
              <button className="pb-2 text-sm font-semibold border-b-2 border-transparent text-gray-600 hover:text-gray-900">
                Shop
              </button>
              <button className="pb-2 text-sm font-semibold border-b-2 border-transparent text-gray-600 hover:text-gray-900">
                Social Icons
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Content Items */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Link name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">121 Clicks</span>
                  <div className="w-16 h-2 bg-pink-200 rounded-full">
                    <div className="w-3/4 h-full bg-pink-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Link name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">69 Clicks</span>
                  <div className="w-16 h-2 bg-pink-200 rounded-full">
                    <div className="w-1/2 h-full bg-pink-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Link name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">69 Clicks</span>
                  <div className="w-16 h-2 bg-pink-200 rounded-full">
                    <div className="w-1/2 h-full bg-pink-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Link name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">69 Clicks</span>
                  <div className="w-16 h-2 bg-pink-200 rounded-full">
                    <div className="w-1/2 h-full bg-pink-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Link name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">69 Clicks</span>
                  <div className="w-16 h-2 bg-pink-200 rounded-full">
                    <div className="w-1/2 h-full bg-pink-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <MousePointer className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-gray-600 text-sm">Link name</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">69 Clicks</span>
                  <div className="w-16 h-2 bg-pink-200 rounded-full">
                    <div className="w-1/2 h-full bg-pink-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay with Example Data Notice */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/75 to-transparent flex items-end justify-center rounded-lg">
              <div className="text-center p-6 h-3/5 flex flex-col justify-center items-center py-10">
                <p className="text-gray-500 text-lg font-bold mb-2 flex-4/5">
                  Example data
                </p>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  See your top performing links and products
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Unlock powerful insights with a Pro 7-day free trial. Cancel
                  anytime.
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto">
                  <span>✨</span>
                  Try Pro for free
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sources Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-8 relative">
          <div className="p-6 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Sources</h3>
            <div className="flex gap-6 text-xs text-gray-500 mt-2 font-semibold">
              <span>Views</span>
              <span>Clicks</span>
              <span>Click rate</span>
            </div>
          </div>

          <div className="p-6">
            {/* Sources Items */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">ig</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      1. Instagram
                    </div>
                    <div className="text-xs text-gray-500">
                      21 Views • 102 Clicks • 68% Click rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">231 Views</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-full h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      2. Facebook
                    </div>
                    <div className="text-xs text-gray-500">
                      21 Views • 87 Clicks • 78% Click rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">124 Views</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-2/3 h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">𝕏</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      3. X
                    </div>
                    <div className="text-xs text-gray-500">
                      14 Views • 26 Clicks • 88% Click rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">116 Views</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-1/2 h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay with Example Data Notice */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/75 to-transparent flex items-end justify-center rounded-lg">
              <div className="text-center p-6 h-3/5 flex flex-col justify-center items-center py-10">
                <p className="text-gray-500 text-lg font-bold mb-2 flex-4/5">
                  Example data
                </p>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  See your top performing links and products
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Unlock powerful insights with a Pro 7-day free trial. Cancel
                  anytime.
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto">
                  <span>✨</span>
                  Try Pro for free
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Locations Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-8 relative">
          <div className="p-6 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Locations</h3>
            <div className="flex gap-6 text-xs text-gray-500 font-semibold">
              <span>Views</span>
              <span>Clicks</span>
              <span>Click rate</span>
            </div>
          </div>

          <div className="p-6">
            {/* Location Items */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-4 rounded-sm bg-gray-200 flex items-center justify-center">
                    <span className="text-xs">🇺🇸</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      1. United States
                    </div>
                    <div className="text-xs text-gray-500">
                      121 Views • 85 Clicks • 70% Click rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">287 Views</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-full h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-4 rounded-sm bg-gray-200 flex items-center justify-center">
                    <span className="text-xs">🇦🇺</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      2. Australia
                    </div>
                    <div className="text-xs text-gray-500">
                      45 Views • 32 Clicks • 71% Click rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">78 Views</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-1/3 h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-4 rounded-sm bg-gray-200 flex items-center justify-center">
                    <span className="text-xs">🇨🇦</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      3. Canada
                    </div>
                    <div className="text-xs text-gray-500">
                      38 Views • 25 Clicks • 66% Click rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">63 Views</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-1/4 h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay with Example Data Notice */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/75 to-transparent flex items-end justify-center rounded-lg">
              <div className="text-center p-6 h-3/5 flex flex-col justify-center items-center py-10">
                <p className="text-gray-500 text-lg font-bold mb-2 flex-4/5">
                  Example data
                </p>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  See your top performing links and products
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Unlock powerful insights with a Pro 7-day free trial. Cancel
                  anytime.
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto">
                  <span>✨</span>
                  Try Pro for free
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Devices Section */}
        <div className="bg-white rounded-lg shadow-sm border relative">
          <div className="p-6 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Devices</h3>
            <div className="flex gap-6 text-xs text-gray-500 font-semibold">
              <span>Views</span>
              <span>Clicks</span>
              <span>Click rate</span>
            </div>
          </div>

          <div className="p-6">
            {/* Device Items */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm">📱</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      1. Mobile
                    </div>
                    <div className="text-xs text-gray-500">
                      156 Views • 128 Clicks • 82% Click rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">381 Views</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-full h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-sm">💻</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      2. Desktop
                    </div>
                    <div className="text-xs text-gray-500">
                      89 Views • 62 Clicks • 70% Click rate
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">151 Views</span>
                  <div className="w-16 h-2 bg-blue-200 rounded-full">
                    <div className="w-2/5 h-full bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay with Example Data Notice */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/75 to-transparent flex items-end justify-center rounded-lg">
              <div className="text-center p-6 h-3/5 flex flex-col justify-center items-center py-10">
                <p className="text-gray-500 text-lg font-bold mb-2 flex-4/5">
                  Example data
                </p>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  See your top performing links and products
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Unlock powerful insights with a Pro 7-day free trial. Cancel
                  anytime.
                </p>
                <button className="bg-black text-white px-6 py-2 rounded-full text-base font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto">
                  <span>✨</span>
                  Try Pro for free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Analytics;
