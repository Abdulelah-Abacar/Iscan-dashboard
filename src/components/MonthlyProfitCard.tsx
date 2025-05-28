import { AnalyticsLink } from "./AnalyticsLink";
import { ArrowStatus } from "./ArrowStatus";
import { Card } from "./Card";
import { RiyalIcon } from "./RiyalIcon";
import { SectionTitle } from "./SectionTitle";

export const MonthlyProfitCard = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title="Profit" underlinedPart="Monthly" />
        <AnalyticsLink />
      </div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex gap-2 items-center text-4xl">
          <RiyalIcon />
          <span>695K</span>
        </div>
        <ArrowStatus isPositive={true} status={"%21.4"} />
      </div>
      <p className="text-gray-500 text-sm">This Month ( April 2025 )</p>
    </Card>
  );
};
