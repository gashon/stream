import { AiFillStar } from "react-icons/ai";

import { AnalyticsList } from "@/features/analytics";
import { PageLayout } from "@/layouts";

export default function AnalyticsPage() {
  return (
    <PageLayout
      title="Stream."
      BottomLinkComponent={
        <>
          Favorites
          <AiFillStar className="text-yellow-300" />
        </>
      }
      bottomLinkHref="/favorites"
    >
      <AnalyticsList />
    </PageLayout>
  );
}
