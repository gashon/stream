import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "@/types";
import { useInfinitePostsQuery } from "@/features";
import { LoadingSkeleton } from "@/components";

type Props = {
  PageComponent: React.ComponentType<{ posts: Post[] }>;
};

export const PostsList: FC<Props> = ({ PageComponent }) => {
  const { data, error, isFetching, fetchNextPage, isFetchingNextPage } =
    useInfinitePostsQuery();

  if (isFetching && !isFetchingNextPage) {
    return <LoadingSkeleton num={15} />;
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
        loader={<LoadingSkeleton num={5} />}
        pullDownToRefreshThreshold={50}
      >
        {data.pages.map(({ data: posts }, i) => (
          <PageComponent key={`posts:page:${i}`} posts={posts} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
