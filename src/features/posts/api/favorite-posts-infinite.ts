import { useInfiniteQuery } from "@tanstack/react-query";

import type { FavoritePostsResponse } from "@/types";

const fetchPosts = async ({ pageParam = null }): Promise<FavoritePostsResponse> => {
  const query = pageParam ? `?cursor=${pageParam}` : "";

  const res = await fetch(`/api/posts/favorites${query}`);
  const data: FavoritePostsResponse = await res.json();

  return data;
};

export const useInfiniteFavoritePostsQuery = () => {
  return useInfiniteQuery({
    queryKey: ["posts", "favorites"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.cursor,
    refetchOnWindowFocus: false,
  });
};
