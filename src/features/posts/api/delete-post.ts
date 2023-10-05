import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";
import { Post, PostDeleteResponse } from "@/types";

type DeletePostMutation = {
  postId: Post["post_id"];
};

export const useDeletePostMutation = ({ postId }: DeletePostMutation) => {
  return useMutation<PostDeleteResponse, Error, DeletePostMutation>(
    async () => {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId }),
      });

      const data: PostDeleteResponse = await res.json();
      return data;
    },
    {
      // use post_id to remove post from state
      onSuccess: (data) => {
        queryClient.setQueryData<Post[]>(["posts"], (prev: any) => {
          const updatedPages = prev.pages.map((page: any) => {
            return {
              ...page,
              data: page.data.filter((post: Post) => post.post_id !== postId),
            };
          });

          return {
            ...prev,
            pages: updatedPages,
          };
        });
      },
    }
  );
};
