import { AiFillStar } from "react-icons/ai";

import { PostsList } from "@/features";
import { PageLayout } from "@/layouts";


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
