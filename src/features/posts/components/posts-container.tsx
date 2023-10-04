import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { LoadingSkeleton } from "@/components";
import { useInfinitePostsQuery, PostPage } from "@/features";

export const PostsContainer: FC = () => {
  const { data, error, isFetching, fetchNextPage } = useInfinitePostsQuery();

  if (isFetching) {
    return <LoadingSkeleton num={10} />;
  }

  if (!data) {
    return <div>Error fetching posts</div>;
  }

  if (data.pages[0]?.data.length === 0) {
    return <div>No posts</div>;
  }

  const dataLength = data.pages.reduce((acc, { data: posts }) => {
    return acc + posts.length;
  }, 0);
  const hasMore = data.pages[data.pages.length - 1]?.has_more;

  return (
    <div
      className="w-full"
      style={{
        height: "calc(100vh - 10rem)",
      }}
    >
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<h4 className="text-white">Loading...</h4>}
      >
        {data.pages.map(({ data: posts }, i) => (
          <PostPage key={`posts:page:${i}`} posts={posts} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
