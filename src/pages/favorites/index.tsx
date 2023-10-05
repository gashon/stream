import { Inter } from "next/font/google";

import { FavoritePostsList } from "@/features";
import { PageLayout } from "@/layouts";

export default function FavoritePostsPage() {
  return (
    <PageLayout
      title="Favorite Streams."
      BottomLinkComponent={<>Posts</>}
      bottomLinkHref="/"
    >
      <FavoritePostsList />
    </PageLayout>
  );
}
