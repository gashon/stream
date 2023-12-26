import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useGetAnalyticsQuery } from "@/features/analytics";
import { LoadingSkeleton } from "@/components";
import type { UserAnalytic, AnalyticsGetResponse } from "@/types";

const AnalyticItem: FC<{ analytic: UserAnalytic }> = ({ analytic }) => {
  let views;
  if (typeof analytic.views === "number") {
    views = analytic.views;
  }

  return (
    <div className="my-5  w-full border-b py-2 border-gray-500">
      <div className="flex justify-between">
        <p className="opacity-50 text-sm">
          {new Date(analytic.created_at).toDateString()}{" "}
        </p>
      </div>
      <div className="flex flex-col justify-between mt-1">
        {/* Sanitized by DOMPurify */}
        <div className="text-md flex flex-col">
          <div className="flex justify-between w-full flex-row">
            <p>User_id: {analytic.user_id}</p>
            {/* @ts-ignore TODO */}
            <p>Views: {analytic.views}</p>
          </div>
          <p className="opacity-25 text-md font-semibold">IP: {analytic.ip}</p>
          <p className="opacity-25 text-md underline">
            User Agent: {analytic.ua}
          </p>
        </div>

        <div className="flex justify-end mt-1">
          <div className="cursor-pointer opacity-75"></div>
        </div>
      </div>
    </div>
  );
};

export const AnalyticsList: FC = () => {
  const { data, isFetching, error } = useGetAnalyticsQuery();

  if (isFetching) {
    return <LoadingSkeleton num={15} />;
  }

  if (!data) {
    return <div>Error fetching posts</div>;
  }

  return (
    <div className="w-full p-0">
      {Object.values(data.data)
        .reverse()
        .map((analytic) => (
          <AnalyticItem
            key={`analytics:${analytic.user_id}`}
            analytic={analytic}
          />
        ))}
    </div>
  );
};
