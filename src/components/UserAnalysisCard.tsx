import { ArrowUpRight, Users } from "lucide-react";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";
import { MetricRow } from "./MetricRow";
import Company from "@/assets/icons/Company";

export const UserAnalysisCard = () => {
  return (
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
          icon={<Company className={"w-7 aspect-square"} color="#000" />}
          value="945M"
          percentChange="%19.5"
          isPositive={true}
        />
      </div>
    </Card>
  );
};
