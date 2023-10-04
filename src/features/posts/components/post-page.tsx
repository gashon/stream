import { FC, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import storage from "@/lib/storage";
import type { Post, Favorites } from "@/types";
import { useFavoritePostMutation } from "@/features";

type Props = {
  posts: (Post | { is_favorite: boolean })[];
};

const Post: FC<
  Post & {
    isStarred: boolean;
  }
> = ({ isStarred: initStarredState, ...post }) => {
  const { isStarred, favoritePostMutation } = useFavoritePostMutation({
    isStarred: initStarredState,
    postId: post.post_id,
  });

  const onStarClick = () => {
    // TODO add append method to storage lib
    favoritePostMutation.mutate();
  };

  return (
    <div className="my-5 w-full">
      <p className="opacity-50">{new Date(post.created_at).toLocaleDateString()} </p>

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
  const starredPostIds =
    storage.get<Favorites>("favorites")?.map(({ post_id }) => post_id) || [];

  return (
    <div className="w-full p-0">
      {posts.map((post) => {
        return (
          <Post key={`post:${post.post_id}`} isStarred={post.is_favorite} {...post} />
        );
      })}
    </div>
  );
};
