import { Inter } from "next/font/google";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";

import { PostsList } from "@/features";
import { PageLayout } from "@/layouts";

const inter = Inter({ subsets: ["latin"] });

export default function FavoritePostsPage() {
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
      <PostsList />
    </PageLayout>
  );
}
