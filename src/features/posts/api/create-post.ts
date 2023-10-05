import { useMutation, InfiniteQueryObserverResult } from "@tanstack/react-query";

import { queryClient } from "@/lib/react-query";
import type { PostCreateResponse, PostCreateRequest, ErrorMessage } from "@/types";

export const useCreatePostMutation = () => {
  return useMutation<PostCreateResponse, Error, PostCreateRequest>(
    async (body) => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data: PostCreateResponse = await res.json();

      //@ts-ignore
      if (!res.ok || data?.error) {
        throw new Error("Failed");
      }

      return data;
    },
    {
      // add post to state
      onSuccess: ({ data: postData }) => {
        queryClient.setQueryData<any>(["posts"], (prev: any) => {
          // Add the new post data to the first page of the existing data
          const updatedPage = {
            ...prev.pages[0],
            data: [postData, ...prev.pages[0].data],
          };
          const updatedPages = [updatedPage, ...prev.pages.slice(1)];

          // Return the updated data object
          return {
            ...prev,
            pages: updatedPages,
          };
        });
      },
      onError: (error) => {
        console.log("Post failed", error);
      },
    }
  );
};
