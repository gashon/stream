import { useMutation } from "@tanstack/react-query";

import type { PostGetResponse, PostCreateRequest } from "@/types";

export const useCreatePostMutation = () => {
  return useMutation<PostGetResponse, Error, PostCreateRequest>(
    async (body) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data: PostGetResponse = await res.json();

      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};
