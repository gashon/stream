import { FC } from "react";

import { PostForm } from "@/features";
import { PageLayout } from "@/layouts";

const PostPage: FC = () => {
  return (
    <PageLayout
      title="Create a Stream."
      BottomLinkComponent={<>Posts</>}
      bottomLinkHref="/posts"
    >
      <div className="w-full">
        <PostForm />
      </div>
    </PageLayout>
  );
};

export default PostPage;
