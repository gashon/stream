import { useQuery } from "@tanstack/react-query";

import type { AnalyticsGetResponse } from "@/types";

const fetchAnalytics = async (): Promise<AnalyticsGetResponse> => {
  const res = await fetch(`/api/analytics`);
  const data: AnalyticsGetResponse = await res.json();

  return data;
};

export const useGetAnalyticsQuery = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    refetchOnWindowFocus: false,
  });
};
