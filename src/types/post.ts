import type { Resource } from "@/types";

export type Post = {
  post_id: string;

  is_legacy: boolean;
  priority: number; //is_pinned = true
  content: string;
  is_draft: boolean;
  is_private: boolean;
} & Resource;

export type PostGetRequest = {
  cursor?: string;
  limit?: number;
  is_draft?: boolean;
};

export type PostCreateRequest = {
  content: string;
  is_draft: boolean;
  is_private: boolean;

  password?: string;
};

export type PostPatchRequest = Partial<
  Pick<Post, "content" | "is_draft" | "is_private" | "priority">
>;

export type PostGetResponse = {
  data: Post[];
  has_more: boolean;
  cursor: string | null;
};

export type PostCreateResponse = {
  data: Post;
};

export type PostDeleteResponse = {
  data: Post;
};

export type PostPatchResponse = {
  data: Post;
};
