import { FC } from "react";

import { PostForm } from "@/features";

const PostPage: FC = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl mb-10">Create a Stream</h1>
      <PostForm />
    </div>
  );
};

export default PostPage;
