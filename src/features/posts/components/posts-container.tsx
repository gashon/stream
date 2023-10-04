import { FC } from "react";

import { useInfinitePostsQuery, PostPage } from "@/features";

export const PostsContainer: FC = () => {
  // TODO isFetchingNextPage loading icon
  const { data, error, isFetching, isFetchingNextPage } = useInfinitePostsQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error fetching posts</div>;
  }

  if (data.pages[0]?.data.length === 0) {
    return <div>No posts</div>;
  }

  return (
    <>
      {data.pages.map(({ data: posts }, i) => (
        <PostPage key={`posts:page:${i}`} posts={posts} />
      ))}
    </>
  );
};
