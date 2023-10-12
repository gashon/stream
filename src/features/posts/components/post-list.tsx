import { FC, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Post } from "@/types";
import { useInfinitePostsQuery } from "@/features";
import { LoadingSkeleton } from "@/components";

type Props = {
  PageComponent: React.ComponentType<{ posts: Post[] }>;
  isEditor?: boolean;
};

export const PostsContainer: FC<Props> = ({ PageComponent, isEditor }) => {
  const [isDraft, setIsDraft] = useState<boolean>(false);

  return (
    <div
      className="w-full"
      style={{
        height: "calc(100vh - 10rem)",
      }}
    >
      {isEditor && (
        <div className="w-full mt-10">
          <button
            className="bg-gray-200 text-black rounded font-bold py-2 px-4 inline-flex items-center"
            type="button"
            onClick={() => {
              setIsDraft(!isDraft);
            }}
          >
            {isDraft ? "Published" : "Drafts"}
          </button>
        </div>
      )}
      <PostsList PageComponent={PageComponent} isEditor={isEditor} isDraft={isDraft} />
    </div>
  );
};

export const PostsList: FC<Props & { isDraft: boolean }> = ({
  PageComponent,
  isDraft,
}) => {
  const { data, error, isFetching, fetchNextPage, isFetchingNextPage, refetch } =
    useInfinitePostsQuery({ isDraft });

  useEffect(() => {
    refetch();
  }, [isDraft, refetch]);

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
  );
};
