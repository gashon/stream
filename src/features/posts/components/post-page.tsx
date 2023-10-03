import { FC } from "react";

import type { Post } from "@/types";

type Props = {
  posts: Post[];
};

export const PostPage: FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map(({ post_id, content }) => (
        <div key={`post:${post_id}`}>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
};
