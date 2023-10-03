import { useInfiniteQuery } from "@tanstack/react-query";

import type { PostGetResponse } from "@/types";

const fetchPosts = async ({ pageParam = null }): Promise<PostGetResponse> => {
  const query = pageParam ? `?cursor=${pageParam}` : "";

  const res = await fetch(`/api/posts${query}`);
  const data: PostGetResponse = await res.json();

  return data;
};

export const useInfinitePostsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });
};
