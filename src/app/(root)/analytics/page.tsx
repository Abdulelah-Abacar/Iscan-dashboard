"use client";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ArrowUpRight, SaudiRiyal, Users, X } from "lucide-react";
import { ArrowStatus } from "@/components/ArrowStatus";
import { MetricRow } from "@/components/MetricRow";
import Company from "@/assets/icons/Company";
import { useState } from "react";
import Image from "next/image";

const MiniBarChart = ({ data, className }) => {
  return (
    <div
      className={`flex items-end space-x-0.5 h-8 border-b-2 border-black ${className}`}
    >
      {data.map((item, i) => {
        const height = Math.max(
          4,
          (item.value / Math.max(...data.map((d) => d.value))) * 32
        );
        const section = height / 3;

        return (
          <div key={i} className="relative w-1.5">
            <div
              className="absolute bottom-0 w-full rounded-t-sm bg-green-400"
              style={{ height: `${section}px`, bottom: `${section * 2}px` }}
            />
            <div
              className="absolute bottom-0 w-full bg-green-500"
              style={{ height: `${section}px`, bottom: `${section}px` }}
            />
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

const MetricCard = ({
  title,
  value,
  chart,
  status = false,
  className = "",
}) => (
  <div className={`bg-white rounded-4xl p-3 ${className}`}>
    <div className="flex items-center mb-2">
      <h3 className="text-lg">{title}</h3>
      {status && (
        <div className="bg-gray-300 -ml-3 min-w-fit rounded-full py-1 px-2 scale-50">
          <ArrowStatus isPositive={true} status={"%21.4"} />
        </div>
      )}
    </div>
    <div className="flex items-end justify-between">
      <div className="text-2xl flex items-center gap-1">
        <SaudiRiyal size={24} />
        <span className="text-4xl">{value}</span>
      </div>
      {chart}
    </div>
  </div>
);

const StatCard = ({ label, value, className = "", currency = false }) => (
  <div
    className={`bg-gray-100 flex justify-between items-center rounded-lg py-2 px-4 ${className}`}
  >
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <div className="flex items-center gap-0.5">
      {!currency && <SaudiRiyal size={24} />}
      <span className="text-lg">{value}</span>
    </div>
  </div>
);

export default function Analytics() {
  const [isLiabilitiesModelOpen, setIsLiabilitiesModelOpen] = useState(false);
  const [isSadacaModelOpen, setIsSadacaModelOpen] = useState(false);

  const miniChartData = [
    { value: 20 },
    { value: 25 },
    { value: 30 },
    { value: 28 },
    { value: 35 },
    { value: 32 },
    { value: 40 },
    { value: 38 },
    { value: 45 },
    { value: 42 },
    { value: 48 },
    { value: 50 },
  ];

  const sadacaData = [
    { date: "20.04.2025", amount: "90" },
    { date: "20.04.2025", amount: "90" },
    { date: "20.04.2025", amount: "90" },
    { date: "20.04.2025", amount: "90" },
    { date: "20.04.2025", amount: "90" },
    { date: "20.04.2025", amount: "90" },
    { date: "20.04.2025", amount: "90" },
  ];

  const salesData = [
    { month: "Jan", value: 0 },
    { month: "Feb", value: 100 },
    { month: "Mar", value: 120 },
    { month: "Apr", value: 110 },
    { month: "May", value: 130 },
    { month: "Jun", value: 140 },
    { month: "Jul", value: 135 },
  ];

  const chartConfig = {
    value: {
      label: "Sales",
      color: "#22d3ee",
    },
  } satisfies ChartConfig;

  const avgOrderChartConfig = {
    value: {
      label: "Average Order Value",
      color: "#22d3ee",
    },
  };

  const avgOrderData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 38 },
    { month: "Apr", value: 61 },
    { month: "May", value: 55 },
    { month: "Jun", value: 67 },
    { month: "Jul", value: 58 },
    { month: "Aug", value: 63 },
    { month: "Sep", value: 41 },
    { month: "Oct", value: 56 },
    { month: "Nov", value: 49 },
    { month: "Dec", value: 64 },
  ];

  const handleLiabilitiesModelClose = () => {
    setIsLiabilitiesModelOpen(!isLiabilitiesModelOpen);
  };
  const handleSadacaModelClose = () => {
    setIsSadacaModelOpen(!isSadacaModelOpen);
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
        <h1 className="text-3xl md:text-5xl font-normal">Analytics</h1>
      </div>
      {isLiabilitiesModelOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-gray-200 rounded-3xl space-y-8 py-4 px-8 text-center relative max-w-md w-full mx-4">
            <button
              onClick={handleLiabilitiesModelClose}
              className="absolute cursor-pointer p-1 bg-white rounded-full top-4 right-4"
            >
              <X size={12} />
            </button>
            <h1 className="text-2xl font-medium">Financial Liabilities</h1>
            <div className="w-fit flex justify-self-center justify-center items-center gap-2 py-2 px-8 bg-white rounded-lg">
              <SaudiRiyal size={24} />
              <span className="text-4xl">99</span>
            </div>

            <div className="flex gap-8 justify-center items-center">
              <button
                onClick={handleLiabilitiesModelClose}
                className="rounded-full py-2 px-5 text-white bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button className="rounded-full py-2 px-5 text-white bg-cyan-500 cursor-pointer">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isSadacaModelOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 flex items-center justify-center">
          <div className="bg-gray-200 rounded-3xl py-8 px-8 text-center relative max-w-2xl w-full mx-4 mb-28 md:mb-0">
            <button
              onClick={handleSadacaModelClose}
              className="absolute cursor-pointer p-1 bg-white rounded-full top-4 right-4 hover:bg-white/70 transition-colors"
            >
              <X size={20} />
            </button>

            <h1 className="text-3xl mb-4">Sadaca</h1>

            <div className="flex flex-col md:flex-row mb-4 justify-center items-center gap-4">
              <div className="flex w-full md:w-1/3 relative justify-center items-center gap-2">
                <SaudiRiyal
                  size={24}
                  className="absolute top-1/2 -translate-y-1/2 left-8"
                />
                <input
                  type="text"
                  className="text-lg w-full text-center py-3 px-4 bg-white rounded-full outline-none border-none"
                />
              </div>
              <button className="rounded-full py-2 px-5 text-white bg-cyan-500 cursor-pointer w-full md:w-auto">
                Save
              </button>
            </div>

            <div className="bg-white rounded-4xl w-full md:w-4/5 mx-auto">
              <div className="grid grid-cols-2 bg-gray-100 py-3 px-6 rounded-full">
                <div className="text-left">Date</div>
                <div className="text-right">Amount</div>
              </div>

              <div className="max-h-64 overflow-y-auto no-scrollbar">
                {sadacaData.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 py-3 px-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left">{item.date}</div>
                    <div className="text-right flex items-center justify-end gap-2">
                      <SaudiRiyal size={24} />{" "}
                      <span className="text-2xl">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="bg-gray-200 p-3 md:p-5 rounded-4xl mt-5 mb-24 md:mb-0">
        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <MetricCard
            title="Gross Sales"
            value="967 M"
            chart={<MiniBarChart data={miniChartData} />}
            status={true}
          />
          <MetricCard
            title="Total net profit"
            value="967 M"
            chart={<MiniBarChart data={miniChartData} />}
          />
          <MetricCard
            title="Subscription Revenue"
            value="967 M"
            chart={<MiniBarChart data={miniChartData} />}
          />
          <div className="bg-white rounded-4xl p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">
                Financial Liabilities
              </h3>
              <button
                onClick={handleLiabilitiesModelClose}
                className="bg-gray-200 rounded-full p-2 cursor-pointer outline-none border-none"
              >
                <ArrowUpRight className="w-5 h-5 font-bold" />
              </button>
            </div>
            <div className="mt-2">
              <div className="text-2xl flex items-center gap-1">
                <SaudiRiyal size={24} />
                <span className="text-4xl">99</span>
              </div>
            </div>
          </div>
        </div>
        {/* Main Layout - Left to Right */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          {/* Left Section - Charts (4/6 width) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Sales Chart */}
            <Card className="rounded-4xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Total sales over time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <RechartsLineChart
                    accessibilityLayer
                    data={salesData}
                    margin={{
                      left: 20,
                      right: 12,
                      top: 12,
                      bottom: 12,
                    }}
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-sm text-gray-500"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={4}
                      className="text-sm text-gray-500"
                      tickFormatter={(value) => `${value}k SAR`}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Line
                      dataKey="value"
                      type="monotone"
                      stroke="var(--color-value)"
                      strokeWidth={3}
                      dot={{
                        fill: "var(--color-value)",
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />
                  </RechartsLineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Bottom Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Average Order Value */}
              <div className="bg-white rounded-4xl p-6">
                <h3 className="text-lg font-bold mb-4">Average Order Value</h3>
                <div className="text-3xl flex items-center gap-2 mb-6">
                  <SaudiRiyal size={24} />
                  <span>967 M</span>
                </div>
                <div className="h-32">
                  <ChartContainer config={avgOrderChartConfig}>
                    <RechartsLineChart
                      data={avgOrderData}
                      margin={{
                        left: 5,
                        right: 5,
                        top: 5,
                        bottom: 20,
                      }}
                    >
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                      />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        className="text-xs text-gray-500"
                        interval={1}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Line
                        dataKey="value"
                        type="monotone"
                        stroke="var(--color-value)"
                        strokeWidth={3}
                        dot={{
                          fill: "var(--color-value)",
                          strokeWidth: 2,
                          r: 4,
                        }}
                        activeDot={{
                          r: 6,
                        }}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                </div>
              </div>

              {/* User Analysis */}
              <div className="bg-white rounded-4xl p-6">
                <div className="">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">User Analysis</h3>
                  </div>
                  <div className="flex flex-col">
                    <MetricRow
                      icon={
                        <Users
                          size={50}
                          className="text-black bg-gray-200 p-2 rounded-full"
                        />
                      }
                      value="495M"
                      percentChange="%17.7"
                      isPositive={true}
                    />
                    <MetricRow
                      icon={
                        <Company
                          className={
                            "w-14 aspect-square bg-gray-200 p-2 rounded-full"
                          }
                          color="#000"
                        />
                      }
                      value="945M"
                      percentChange="%19.5"
                      isPositive={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Stats Panel (2/6 width) */}
          <div className="lg:col-span-2 space-y-4 flex flex-col">
            {/* Stats Cards */}
            <div className="bg-white p-4 rounded-4xl space-y-4 flex-2/5">
              <StatCard label="Shipping costs" value="1000" />
              <StatCard label="Taxes" value="0" />
              <StatCard label="Orders" value="0" currency />
              <StatCard label="Total refunds" value="0" currency />
            </div>

            {/* Total Sadaca */}
            <div className="bg-white rounded-4xl p-6 flex-2/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Total Sadaca</h3>
                <button
                  onClick={handleSadacaModelClose}
                  className="bg-gray-200 rounded-full p-2 cursor-pointer outline-none border-none"
                >
                  <ArrowUpRight className="w-5 h-5 font-bold" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg">Total Donations</span>
                  <div className="text-3xl flex items-center justify-center gap-2">
                    <SaudiRiyal size={24} />
                    <span>900 M</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">Due Charities</span>
                  <div className="text-3xl flex items-center justify-center gap-2">
                    <SaudiRiyal size={24} />
                    <span>900</span>
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
