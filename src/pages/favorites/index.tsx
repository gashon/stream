import { Inter } from "next/font/google";

import { FavoritePostsList } from "@/features";
import { PageLayout } from "@/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function FavoritePostsPage() {
  return (
    <PageLayout
      title="Favoirte Streams."
      BottomLinkComponent={<>Posts</>}
      bottomLinkHref="/"
    >
      <FavoritePostsList />
    </PageLayout>
  );
}
