import { FC } from "react";

import type { Post } from "@/types";

type Props = {
  posts: Post[];
};

export const PostPage: FC<Props> = ({ posts }) => {
  return (
    <div className="w-full border-r pr-2">
      {posts.map(({ post_id, content, created_at }) => (
        <div key={`post:${post_id}`} className="my-5 w-full">
          <p className="opacity-50">{new Date(created_at).toLocaleDateString()} </p>

          <p>{content}</p>
          {/* @ts-ignore */}
        </div>
      ))}
    </div>
  );
};
