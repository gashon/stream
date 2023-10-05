import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";
import { Post, PostPatchResponse } from "@/types";

type PatchPostMutation = {
  postId: Post["post_id"];
  pinIt: boolean;
};

export const useUpdatePostMutation = () => {
  return useMutation<PostPatchResponse, Error, PatchPostMutation>(
    async ({ postId, pinIt }) => {
      const res = await fetch("/api/posts", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId, priority: pinIt ? 1 : 0 }),
      });

      const data: PostPatchResponse = await res.json();
      return data;
    },
    {
      // use post_id to remove post from state
      onSuccess: ({ data }) => {
        queryClient.setQueryData<Post[]>(["posts"], (prev: any) => {
          // replace the post with the updated post
          const updatedPages = prev.pages.map((page: any) => {
            return {
              ...page,
              data: page.data.map((post: Post) =>
                post.post_id === data.post_id ? data : post
              ),
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
