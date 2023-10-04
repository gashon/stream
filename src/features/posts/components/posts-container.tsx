import { FC } from "react";

import { LoadingSkeleton } from "@/components";
import { useInfinitePostsQuery, PostPage } from "@/features";

export const PostsContainer: FC = () => {
  // TODO isFetchingNextPage loading icon
  const { data, error, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfinitePostsQuery();

  if (isFetching) {
    return <LoadingSkeleton num={10} />;
  }

  if (!data) {
    return <div>Error fetching posts</div>;
  }

  if (data.pages[0]?.data.length === 0) {
    return <div>No posts</div>;
  }

  return (
    <div className="w-full border-r pr-6 ">
      {data.pages.map(({ data: posts }, i) => (
        <PostPage key={`posts:page:${i}`} posts={posts} />
      ))}
    </div>
  );
};
