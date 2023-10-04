import type { Resource } from "@/types";

export type Post = {
  post_id: string;

  content: string;
  is_draft: boolean;
  is_private: boolean;
} & Resource;

export type PostCreateRequest = {
  content: string;
  is_draft: boolean;
  is_private: boolean;

  password?: string;
};

export type PostGetResponse = {
  data: Post[];
  has_more: boolean;
  cursor: string | null;
};

export type PostCreateResponse = {
  data: Post;
};
