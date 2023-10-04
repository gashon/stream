import { FC } from "react";

import { useInfinitePostsQuery, PostPage } from "@/features";

export const PostsContainer: FC = () => {
  // TODO isFetchingNextPage loading icon
  const { data, error, isFetching, isFetchingNextPage } = useInfinitePostsQuery();

  if (isFetching) {
    return (
      <ul className="mt-5 space-y-8">
        {new Array(10).fill(0).map((_, i) => (
          <li
            key={`post:loading:${i}`}
            className="w-full h-10 bg-gray-200 rounded-md dark:bg-zinc-700"
          ></li>
        ))}
      </ul>
    );
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
