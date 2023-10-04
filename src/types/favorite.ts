import { Post } from "@/types/post";

export type Favorites = Post[];

export type FavoritePostsResponse = {
  data: Favorites;
  has_more: boolean;
  cursor: string | null;
};
