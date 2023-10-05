import { Inter } from "next/font/google";

import { PostsList } from "@/features";
import { PageLayout } from "@/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function FavoritePostsPage() {
  return (
    <PageLayout title="Stream.">
      <PostsList />
    </PageLayout>
  );
}
