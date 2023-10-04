import { FC } from "react";

import { PostForm } from "@/features";

const PostPage: FC = () => {
  return (
    <main className="w-full">
      <h1>Posts</h1>
      <PostForm />
    </main>
  );
};

export default PostPage;
