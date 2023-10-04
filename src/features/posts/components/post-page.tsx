import { FC, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import storage from "@/lib/storage";
import type { Post, Favorites } from "@/types";

type Props = {
  posts: Post[];
};

const Post: FC<
  Post & {
    isStarred: boolean;
  }
> = ({ isStarred: initStarredState, ...post }) => {
  const [isStarred, setIsStarred] = useState<boolean>(initStarredState);

  const onStarClick = () => {
    // TODO add append method to storage lib
    storage.set<Favorites>(
      "favorites",
      isStarred
        ? storage
            .get<Favorites>("favorites")
            ?.filter(({ post_id: id }) => id !== post.post_id) ?? []
        : [...(storage.get<Favorites>("favorites") ?? []), post]
    );

    setIsStarred((prev) => !prev);
  };

  return (
    <div className="my-5 w-full">
      <p className="opacity-50">{new Date(post.created_at).toLocaleDateString()} </p>

      <div className="flex flex-row items-center justify-between">
        <p>{post.content}</p>

        <div className="cursor-pointer" onClick={onStarClick}>
          {isStarred ? <AiFillStar /> : <AiOutlineStar />}
        </div>
      </div>
    </div>
  );
};

export const PostPage: FC<Props> = ({ posts }) => {
  const starredPostIds =
    storage.get<Favorites>("favorites")?.map(({ post_id }) => post_id) || [];

  return (
    <div className="w-full border-r pr-2">
      {posts.map((post) => {
        const isStarred = starredPostIds.includes(post.post_id);

        return <Post key={`post:${post.post_id}`} isStarred={isStarred} {...post} />;
      })}
    </div>
  );
};
