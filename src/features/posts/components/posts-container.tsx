import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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

  const dataLength = data.pages.reduce((acc, { data: posts }) => {
    return acc + posts.length;
  }, 0);
  const hasMore = data.pages[data.pages.length - 1]?.has_more;

  console.log("dataLength", dataLength, hasMore);

  return (
    <div className="w-full border-r pr-6 ">
      <InfiniteScroll
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={hasMore}
        onScroll={() => {
          console.log("SCROLLING");
        }}
        loader={<h4 className="text-white"></h4>}
      >
        {data.pages.map(({ data: posts }, i) => (
          <PostPage key={`posts:page:${i}`} posts={posts} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
