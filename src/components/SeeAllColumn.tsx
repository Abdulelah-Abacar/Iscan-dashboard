import Link from "next/link";
import { AnalyticsLink } from "./AnalyticsLink";

export const SeeAllColumn = () => {
  return (
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
  );
};
