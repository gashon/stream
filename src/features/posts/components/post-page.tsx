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

  const formattedContent = post.content.split("\n").map((str, index, array) =>
    index === array.length - 1 ? (
      str
    ) : (
      <>
        {str}
        <br />
      </>
    )
  );

  return (
    <div className="my-5  w-full border-b py-2 border-gray-500">
      <div className="flex justify-between">
        <p className="opacity-50 text-sm">{new Date(post.created_at).toDateString()} </p>

        <div className="flex flex-row gap-2">
          {post.priority === 1 && (
            <p className="opacity-25 text-md font-semibold">Pinned</p>
          )}
          {post.is_private && <p className="opacity-25 text-md underline">(Private)</p>}
        </div>
      </div>
      <div className="flex flex-col justify-between mt-1">
        <p className="text-md">{formattedContent}</p>

        <div className="flex justify-end mt-1">
          <div className="cursor-pointer opacity-75" onClick={onStarClick}>
            {favoritePostMutation.isLoading ? (
              <div className="relative">
                <AiFillStar className="text-yellow-300" />
                <AiOutlineStar
                  className="absolute top-0 left-0 text-yellow-300"
                  style={{ opacity: 0.5 }}
                />
              </div>
            ) : isStarred ? (
              <AiFillStar className="text-yellow-300" />
            ) : (
              <AiOutlineStar />
            )}
          </div>
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
