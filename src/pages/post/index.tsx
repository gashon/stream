import { FC } from "react";

import { PostForm, PostsContainer, PostPageWithDelete } from "@/features";
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
      <PostsContainer PageComponent={PostPageWithDelete} isEditor={true} />
    </PageLayout>
  );
};

export default PostPage;
