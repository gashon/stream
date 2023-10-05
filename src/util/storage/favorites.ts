import storage from "@/lib/storage";
import { Post } from "@/types";

type PostId = Post["post_id"];

const STORAGE_KEY = "favorites";

export const addFavorite = (postId: PostId) => {
  const favorites = storage.get<PostId[]>(STORAGE_KEY);
  const newFavorites = [...(favorites ?? []), postId];
  storage.set(STORAGE_KEY, newFavorites);
};

export const removeFavorite = (postId: PostId) => {
  const favorites = storage.get<PostId[]>(STORAGE_KEY);
  const newFavorites = favorites?.filter((favorite) => favorite !== postId);
  storage.set(STORAGE_KEY, newFavorites);
};

export const toggleFavorite = (postId: PostId) => {
  const favorites = storage.get<PostId[]>(STORAGE_KEY);
  if (favorites?.includes(postId)) {
    removeFavorite(postId);
  } else {
    addFavorite(postId);
  }
};
