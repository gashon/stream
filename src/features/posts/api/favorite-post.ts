import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Post } from "@/types";

type FavoritePostMutation = {
  isStarred: boolean;
  postId: Post["post_id"];
};

export const useFavoritePostMutation = ({
  isStarred: currentlyStarred,
  postId,
}: FavoritePostMutation) => {
  const [isStarred, setIsStarred] = useState<boolean>(currentlyStarred);

  const favoritePostMutation = useMutation(
    () => {
      return fetch("/api/posts/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postId, is_starred: !isStarred }),
      });
    },
    {
      onSuccess: () => {
        setIsStarred((prev) => !prev);
      },
    }
  );

  return { isStarred, favoritePostMutation };
};
