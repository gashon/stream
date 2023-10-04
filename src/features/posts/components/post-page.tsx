import { FC } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import storage from "@/lib/storage";
import type { Post, Favorites } from "@/types";

type Props = {
  posts: Post[];
};

export const PostPage: FC<Props> = ({ posts }) => {
  const starredPostIds =
    storage.get<Favorites>("favorites")?.map(({ post_id }) => post_id) || [];

  return (
    <div className="w-full border-r pr-2">
      {posts.map(({ post_id, content, created_at }) => {
        const isStarred = starredPostIds.includes(post_id);

        return (
          <div key={`post:${post_id}`} className="my-5 w-full">
            <p className="opacity-50">{new Date(created_at).toLocaleDateString()} </p>

            <div className="flex flex-row items-center justify-between">
              <p>{content}</p>

              <div className="cursor-pointer">
                {isStarred ? <AiFillStar /> : <AiOutlineStar />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
