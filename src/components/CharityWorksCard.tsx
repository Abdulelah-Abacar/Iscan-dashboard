import { AnalyticsLink } from "./AnalyticsLink";
import { Card } from "./Card";
import { IconWithBackground } from "./IconWithBackground";
import { RiyalIcon } from "./RiyalIcon";
import { SectionTitle } from "./SectionTitle";

export const CharityWorksCard = () => {
  return (
    <Card className="col-span-12 lg:col-span-3">
      <div className="flex justify-between items-center mb-4">
        <SectionTitle title="Works" underlinedPart="Charity" />
        <AnalyticsLink />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <IconWithBackground icon={<RiyalIcon size={20} />} size="small" />
        <div>
          <div className="text-3xl xl:text-4xl">139.30</div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <IconWithBackground icon={<RiyalIcon size={20} />} size="small" />
        <div>
          <div className="text-3xl xl:text-4xl">139.30</div>
        </div>
      </div>
    </Card>
  );
};
