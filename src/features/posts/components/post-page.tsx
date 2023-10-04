import { FC } from "react";

import type { Post } from "@/types";

type Props = {
  posts: Post[];
};

export const PostPage: FC<Props> = ({ posts }) => {
  console.log(posts);
  return (
    <div>
      {posts.map(({ post_id, content, created_at }) => (
        <div key={`post:${post_id}`}>
          <p>{content}</p>
          {/* @ts-ignore */}
          <p>{new Date(created_at).toLocaleDateString()} </p>
        </div>
      ))}
    </div>
  );
};
