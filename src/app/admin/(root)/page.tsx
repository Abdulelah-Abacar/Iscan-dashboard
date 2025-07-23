"use client";

import { useDashboard } from '@/hooks/useDashboard';
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
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  const { data, loading, error } = useDashboard();

  if (loading) {
    return <div className="p-8">{t('loading')}</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{t('error', { error })}</div>;
  }

  return (
    <>
      <div className="flex items-center relative">
        <h1 className="text-5xl font-normal xl:pl-10">{t('title')}</h1>
      </div>
      <section className="p-1.5 md:p-3 xl:p-5 xl:pl-10 mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Monthly Profit Card */}
          <Card className="flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <SectionTitle title="Profit" underlinedPart="Monthly" />
              <AnalyticsLink />
            </div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex gap-2 items-center text-4xl">
                <SaudiRiyal size={40} />
                <span>{(data.monthlyProfit.amount / 1000).toFixed(0)}K</span>
              </div>
              <ArrowStatus 
                isPositive={data.monthlyProfit.isPositive} 
                status={`%${data.monthlyProfit.percentageChange}`} 
              />
            </div>
            <p className="text-gray-500 text-sm">
              {t('monthlyProfit.period', { period: data.monthlyProfit.period })}
            </p>
          </Card>

          {/* Yearly Profit Card */}
          <Card className="flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <SectionTitle title="Profit" underlinedPart="Yearly" />
              <AnalyticsLink />
            </div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex gap-2 items-center text-4xl">
                <SaudiRiyal size={40} />
                <span>{(data.yearlyProfit.amount / 1000000).toFixed(0)}M</span>
              </div>
              <ArrowStatus 
                isPositive={data.yearlyProfit.isPositive} 
                status={`%${data.yearlyProfit.percentageChange}`} 
              />
            </div>
            <p className="text-gray-500 text-sm">
              {t('yearlyProfit.period', { period: data.yearlyProfit.period })}
            </p>
          </Card>

          {/* Orders Card */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <SectionTitle title={t('orders.title')} underlinedPart={""} />
              <AnalyticsLink to="orders" />
            </div>
            <div className="flex flex-col gap-4">
              <MetricRow
                icon={<Users size={30} className="text-black" />}
                value={`${(data.orders.individuals.count / 1000000).toFixed(0)}M`}
                percentChange={`%${data.orders.individuals.percentageChange}`}
                isPositive={data.orders.individuals.isPositive}
              />
              <MetricRow
                icon={<Company className={"w-7 aspect-square"} color="#000" />}
                value={`${(data.orders.companies.count / 1000000).toFixed(0)}M`}
                percentChange={`%${data.orders.companies.percentageChange}`}
                isPositive={data.orders.companies.isPositive}
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
            {data.charityWorks.map((work, index) => (
              <div key={index} className="flex items-center gap-4 mt-4">
                <IconWithBackground
                  icon={<SaudiRiyal size={24} />}
                  size="small"
                />
                <div>
                  <div className="text-3xl xl:text-4xl">{work.amount}</div>
                </div>
              </div>
            ))}
          </Card>

          {/* Graphics Section with API data */}
          <GraphicsCard analyticsData={data.analytics} />

          {/* Rest of the components remain the same */}
          <div className="col-span-12 lg:col-span-5 gap-4 grid grid-cols-1 md:grid-cols-5">
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
                  value={`${(data.orders.individuals.count / 1000000).toFixed(0)}M`}
                  percentChange={`%${data.orders.individuals.percentageChange}`}
                  isPositive={data.orders.individuals.isPositive}
                />
                <MetricRow
                  icon={<Company className={"w-7 aspect-square"} color="#000" />}
                  value={`${(data.orders.companies.count / 1000000).toFixed(0)}M`}
                  percentChange={`%${data.orders.companies.percentageChange}`}
                  isPositive={data.orders.companies.isPositive}
                />
              </div>
            </Card>

            <div className="flex items-center md:flex-col justify-between gap-2 md:gap-16 col-span-1 bg-[#f0f0f0] rounded-[1.5rem] p-4">
              <div className="flex justify-center">
                <div className="mt-2">
                  <Link
                    href={"analytics"}
                    role="link"
                    className="text-5xl block md:mt-12 transform md:rotate-90 whitespace-nowrap border-b-2 border-black pb-1 origin-center"
                  >
                    {t('seeAll')}
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