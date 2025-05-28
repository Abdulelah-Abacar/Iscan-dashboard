import { ArrowStatus } from "./ArrowStatus";
import { AnalyticsLink } from "./AnalyticsLink";
import { SectionTitle } from "./SectionTitle";

export const MetricCard = ({
  title,
  underlinedPart,
  value,
  percentChange,
  isPositive,
  subtitle,
  icon,
  linkTo = "/analytics",
}) => {
  return (
    <div className="bg-[#f0f0f0] p-6 rounded-[2.5rem]">
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title={title} underlinedPart={underlinedPart} />
        <AnalyticsLink to={linkTo} />
      </div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex gap-2 items-center text-4xl">
          {icon}
          <span>{value}</span>
        </div>
        <ArrowStatus isPositive={isPositive} status={percentChange} />
      </div>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
  );
};
