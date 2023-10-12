import { useInfiniteQuery } from "@tanstack/react-query";

import type { PostGetResponse } from "@/types";

type GetParams = {
  isDraft: boolean;
};

const fetchPosts = async (
  { pageParam = null },
  { isDraft }: GetParams
): Promise<PostGetResponse> => {
  let query = pageParam ? `&cursor=${pageParam}` : "";

  if (isDraft) {
    query += `&is_draft=${isDraft}`;
  }
  const res = await fetch(`/api/posts?limit=20${query}`);
  const data: PostGetResponse = await res.json();

  return data;
};

export const useInfinitePostsQuery = ({ isDraft }: GetParams) => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: (params) => fetchPosts(params, { isDraft }),
    getNextPageParam: (lastPage) => lastPage.cursor,
    refetchOnWindowFocus: false,
  });
};
