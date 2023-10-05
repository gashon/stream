import { FC } from "react";

import { PostForm, PostsList, PostPageWithDelete } from "@/features";
import { PageLayout } from "@/layouts";

const PostPage: FC = () => {
  return (
    <PageLayout
      title="Create a Stream."
      BottomLinkComponent={<>Posts</>}
      bottomLinkHref="/"
    >
      <div className="w-full">
        <PostForm />
      </div>
      <PostsList PageComponent={PostPageWithDelete} />
    </PageLayout>
  );
};

export default PostPage;
