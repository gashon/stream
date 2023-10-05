import { FC } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

import type { Post, PostGetResponse } from "@/types";
import { useDeletePostMutation } from "@/features";

type Props = {
  posts: PostGetResponse["data"];
};

const PostComponent: FC<Post> = (post) => {
  const deletePostMutation = useDeletePostMutation({
    postId: post.post_id,
  });

  const onTrashClick = () => {
    deletePostMutation.mutate();
  };

  return (
    <div className="my-5  w-full border-b py-2 border-gray-500">
      <div className="flex justify-between">
        <p className="opacity-50 text-sm">{new Date(post.created_at).toDateString()} </p>
        {post.priority === 1 && (
          <p className="opacity-25 text-md font-semibold">Pinned</p>
        )}
      </div>
      <div className="flex flex-col justify-between mt-1">
        <p className="text-md">{post.content}</p>

        <div className="flex justify-end mt-1">
          <div className="cursor-pointer opacity-75" onClick={onTrashClick}>
            <BsFillTrash3Fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostPageWithDelete: FC<Props> = ({ posts }) => {
  return (
    <div className="w-full p-0">
      {posts.map((post) => {
        return <PostComponent key={`post:delete:${post.post_id}`} {...post} />;
      })}
    </div>
  );
};
