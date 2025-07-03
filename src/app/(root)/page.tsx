import Image from "next/image";
import { GraphicsCard } from "@/components/GraphicsCard";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { AnalyticsLink } from "@/components/AnalyticsLink";
import { ArrowStatus } from "@/components/ArrowStatus";
import { ArrowUpRight, SaudiRiyal, Users } from "lucide-react";
import { MetricRow } from "@/components/MetricRow";
import Company from "@/assets/icons/Company";
import { IconWithBackground } from "@/components/IconWithBackground";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center relative">
        <Image
          src={"/hand_drawn_arrow.webp"}
          alt="arrow icon"
          width={80}
          height={75}
          className="hidden md:block absolute -left-13 xl:-left-4 top-5"
        />
        <h1 className="text-5xl font-normal xl:pl-10">Home</h1>
      </div>
      <section className="p-1.5 md:p-3 xl:p-5 xl:pl-10 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Monthly Profit Card */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <SectionTitle title="Profit" underlinedPart="Monthly" />
              <AnalyticsLink />
            </div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex gap-2 items-center text-4xl">
                <SaudiRiyal size={40} />
                <span>695K</span>
              </div>
              <ArrowStatus isPositive={true} status={"%21.4"} />
            </div>
            <p className="text-gray-500 text-sm">This Month ( April 2025 )</p>
          </Card>

          {/* Yearly Profit Card */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <SectionTitle title="Profit" underlinedPart="Yearly" />
              <AnalyticsLink />
            </div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex gap-2 items-center text-4xl">
                <SaudiRiyal size={40} />
                <span>995M</span>
              </div>
              <ArrowStatus isPositive={true} status={"%12.3"} />
            </div>
            <p className="text-gray-500 text-sm">This Year ( 2025 )</p>
          </Card>

          {/* Orders Card */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <SectionTitle title="Orders" underlinedPart={""} />
              <AnalyticsLink to="orders" />
            </div>
            <div className="flex flex-col gap-4">
              <MetricRow
                icon={<Users size={30} className="text-black" />}
                value="495M"
                percentChange="%17.7"
                isPositive={true}
              />
              <MetricRow
                icon={<Company className={"w-7 aspect-square"} color="#000" />}
                value="945M"
                percentChange="%19.5"
                isPositive={true}
              />
            </div>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mt-4">
          {/* Charity Works Section */}
          <Card className="col-span-12 lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <SectionTitle title="Works" underlinedPart="Charity" />
              <AnalyticsLink />
            </div>
            <div className="flex items-center gap-4 mt-4">
              <IconWithBackground
                icon={<SaudiRiyal size={24} />}
                size="small"
              />
              <div>
                <div className="text-3xl xl:text-4xl">139.30</div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <IconWithBackground
                icon={<SaudiRiyal size={24} />}
                size="small"
              />
              <div>
                <div className="text-3xl xl:text-4xl">139.30</div>
              </div>
            </div>
          </Card>

          {/* Graphics Section */}
          <GraphicsCard />

          <div className="col-span-12 lg:col-span-5 gap-4 grid grid-cols-1 md:grid-cols-5">
            {/* User Analysis Section */}
            <Card className="col-span-4 h-full">
              <div className="flex justify-between items-center mb-4">
                <SectionTitle title="Analysis" underlinedPart="User" />
                <div className="p-2 bg-white rounded-full group">
                  <ArrowUpRight
                    size={30}
                    className="text-gray-600 group-hover:text-black"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <MetricRow
                  icon={<Users size={30} className="text-black" />}
                  value="495M"
                  percentChange="%17.7"
                  isPositive={true}
                />
                <MetricRow
                  icon={
                    <Company className={"w-7 aspect-square"} color="#000" />
                  }
                  value="945M"
                  percentChange="%19.5"
                  isPositive={true}
                />
              </div>
            </Card>

            {/* See All Column */}
            <div className="flex items-center md:flex-col justify-between gap-2 md:gap-16 col-span-1 bg-[#f0f0f0] rounded-[1.5rem] p-4">
              <div className="flex justify-center">
                <div className="mt-2">
                  <Link
                    href={"analytics"}
                    role="link"
                    className="text-5xl block md:mt-12 transform md:rotate-90 whitespace-nowrap border-b-2 border-black pb-1 origin-center"
                  >
                    See all
                  </Link>
                </div>
              </div>
              <AnalyticsLink className="mx-auto" dir="right" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
