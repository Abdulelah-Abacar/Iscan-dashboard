import { MonthlyProfitCard } from "@/components/MonthlyProfitCard";
import { YearlyProfitCard } from "@/components/YearlyProfitCard";
import { OrdersCard } from "@/components/OrdersCard";
import { CharityWorksCard } from "@/components/CharityWorksCard";
import { GraphicsCard } from "@/components/GraphicsCard";
import { UserAnalysisCard } from "@/components/UserAnalysisCard";
import { SeeAllColumn } from "@/components/SeeAllColumn";
import Image from "next/image";

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
          <MonthlyProfitCard />

          {/* Yearly Profit Card */}
          <YearlyProfitCard />

          {/* Orders Card */}
          <OrdersCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 mt-4">
          {/* Charity Works Section */}
          <CharityWorksCard />

          {/* Graphics Section */}
          <GraphicsCard />

          <div className="col-span-12 lg:col-span-5 gap-4 grid grid-cols-1 md:grid-cols-5">
            {/* User Analysis Section */}
            <UserAnalysisCard />

            {/* See All Column */}
            <SeeAllColumn />
          </div>
        </div>
      </section>
    </>
  );
}
