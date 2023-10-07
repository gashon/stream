import { FC } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillPushpin } from "react-icons/ai";

import { PostPriority } from "@/const";
import type { Post, PostGetResponse } from "@/types";
import { useDeletePostMutation, useUpdatePostMutation } from "@/features";

type PostPageWithDelete = {
  posts: PostGetResponse["data"];
};

type PostComponent = {
  post: Post;
  onDelete: (postId: string) => void;
  onPin: (postId: string, pinIt: boolean) => void;
};

const PostComponent: FC<PostComponent> = ({ onDelete, onPin, post }) => {
  const formattedContent = post.content.split("\n").map((str, index, array) =>
    index === array.length - 1 ? (
      str
    ) : (
      <>
        {str}
        <br />
      </>
    )
  );

  return (
    <div className="my-5  w-full border-b py-2 border-gray-500">
      <div className="flex justify-between">
        <p className="opacity-50 text-sm">{new Date(post.created_at).toDateString()} </p>
        <div className="flex flex-row gap-2 items-center">
          {post.priority === PostPriority.Pinned && (
            <p className="opacity-25 text-md font-semibold">Pinned</p>
          )}
          {post.is_private && <p className="opacity-25 text-md underline">(Private)</p>}
          <div
            className="cursor-pointer opacity-75"
            onClick={() => onPin(post.post_id, post.priority == 0)}
          >
            <AiFillPushpin />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-1">
        <p className="text-md">{formattedContent}</p>

        <div className="flex justify-end mt-1">
          <div
            className="cursor-pointer opacity-75"
            onClick={() => onDelete(post.post_id)}
          >
            <BsFillTrash3Fill />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostPageWithDelete: FC<PostPageWithDelete> = ({ posts }) => {
  const deletePostMutation = useDeletePostMutation();
  const updatePostMutation = useUpdatePostMutation();

  const onDelete = (postId: string) => {
    deletePostMutation.mutate({ postId });
  };

  const onPin = (postId: string, pinIt: boolean) => {
    updatePostMutation.mutate({ postId, pinIt });
  };

  return (
    <div className="w-full p-0">
      {posts.map((post) => {
        return (
          <PostComponent
            key={`post:delete:${post.post_id}`}
            onDelete={onDelete}
            onPin={onPin}
            post={post}
          />
        );
      })}
    </div>
  );
};
