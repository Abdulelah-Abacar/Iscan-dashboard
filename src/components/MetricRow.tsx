import { ArrowStatus } from "./ArrowStatus";
import { IconWithBackground } from "./IconWithBackground";

export const MetricRow = ({ icon, value, percentChange, isPositive }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-2 items-center text-4xl">
        <IconWithBackground icon={icon} />
        <span>{value}</span>
      </div>
      <ArrowStatus isPositive={isPositive} status={percentChange} />
    </div>
  );
};
