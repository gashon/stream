import { AiFillStar } from "react-icons/ai";

import { AnalyticsList } from "@/features/analytics";
import { PageLayout } from "@/layouts";

export default function AnalyticsPage() {
  return (
    <PageLayout title="Analytics" BottomLinkComponent={<>Posts</>} bottomLinkHref="/">
      <AnalyticsList />
    </PageLayout>
  );
}
