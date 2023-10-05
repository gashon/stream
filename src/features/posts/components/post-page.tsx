import { FC, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import storage from "@/lib/storage";
import type { Post, Favorites, PostGetResponse } from "@/types";
import { useFavoritePostMutation } from "@/features";
import { getFavorites } from "@/util/storage";

type Props = {
  posts: PostGetResponse["data"];
};

const PostComponent: FC<
  Post & {
    isStarred: boolean;
  }
> = ({ isStarred: initStarredState, ...post }) => {
  const { isStarred, favoritePostMutation } = useFavoritePostMutation({
    isStarred: initStarredState,
    postId: post.post_id,
  });

  const onStarClick = () => {
    favoritePostMutation.mutate();
  };

  return (
    <div className="my-5 w-full">
      <p className="opacity-50">{new Date(post.created_at).toDateString()} </p>

      <div className="flex flex-row items-center justify-between">
        <p>{post.content}</p>

        <div className="cursor-pointer p-2 opacity-75" onClick={onStarClick}>
          {isStarred ? <AiFillStar className="text-yellow-300" /> : <AiOutlineStar />}
        </div>
      </div>
    </div>
  );
};

export const PostPage: FC<Props> = ({ posts }) => {
  const starredPostIds = getFavorites();

  return (
    <div className="w-full p-0">
      {posts.map((post) => {
        const isStarred = starredPostIds.includes(post.post_id);

        return (
          <PostComponent key={`post:${post.post_id}`} isStarred={isStarred} {...post} />
        );
      })}
    </div>
  );
};
