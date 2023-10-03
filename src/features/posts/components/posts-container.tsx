import { FC } from "react";

import { useInfinitePostsQuery, PostPage } from "@/features";

export const PostsContainer: FC = () => {
  // TODO isFetchingNextPage loading icon
  const { data, isFetching, isFetchingNextPage } = useInfinitePostsQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      {data.pages.map(({ data: posts }, i) => (
        <PostPage key={`posts:page:${i}`} posts={posts} />
      ))}
    </div>
  );
};
