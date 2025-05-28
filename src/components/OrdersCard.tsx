import { Users } from "lucide-react";
import { AnalyticsLink } from "./AnalyticsLink";
import { Card } from "./Card";
import { MetricRow } from "./MetricRow";
import { SectionTitle } from "./SectionTitle";
import Company from "@/assets/icons/Company";

export const OrdersCard = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title="Orders" />
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
  );
};
