import type { NextApiRequest, NextApiResponse } from "next";

import { ANON_AUTH_TOKEN } from "@/const";
import { createAnonToken, setAuthToken, getAuthToken } from "@/utils";
import { verifyToken } from "@/lib/jwt";
import { admin } from "@/lib/firebase-admin";
import type { Post, PostCreateRequest, AuthToken } from "@/types";

type PostWithoutId = Omit<Post, "post_id">;

export const favoritesHandler = {
  handle: (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case "GET":
        handleGetRequest(req, res);
        break;
      case "POST":
        handlePostRequest(req, res);
        break;
      default:
        res.status(405).end(); // Method Not Allowed
        break;
    }
  },
};

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // add anon cookie
  if (!getAuthToken(req)) {
    const token = createAnonToken({ is_editor: false });

    // set cookie
    setAuthToken(res, token);
  }

  // in token, get user id
  const userId = verifyToken<AuthToken>(getAuthToken(req)!).user_id;

  const cursor: string | null = req.query.cursor?.toString() || null;
  const limit = 20;

  const db = admin.firestore();
  let query = db
    .collection("users")
    .doc(userId)
    .collection("favorites")
    .where("is_starred", "==", true)
    .limit(limit);

  if (cursor) {
    const cursorDoc = await db.collection("posts").doc(cursor).get();

    if (!cursorDoc.exists) {
      res.status(404).end(); // Not Found
      return;
    }

    query = query.startAfter(cursorDoc);
  }

  const querySnapshot = await query.get();

  const postIds: string[] = [];
  querySnapshot.forEach((doc) => {
    postIds.push(doc.id);
  });

  const postsSnap = await db.collection("posts").where("post_id", "in", postIds).get();
  const posts: Post[] = [];
  postsSnap.forEach((doc) => {
    posts.push(doc.data() as Post);
  });

  res.status(200).json({
    data: posts,
    has_more: posts.length === limit,
    cursor: posts.length > 0 ? posts[posts.length - 1].post_id : null,
  });
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // add anon cookie
  let token = getAuthToken(req);
  if (!token) {
    token = createAnonToken({ is_editor: false });

    // set cookie
    setAuthToken(res, token);
  }

  const userId = verifyToken<AuthToken>(token!).user_id;

  const { is_starred, post_id } = req.body;

  const db = admin.firestore();
  const favoritesRef = db.collection("users").doc(userId).collection("favorites");

  favoritesRef.doc(post_id).set({ is_starred });

  const data = { post_id, is_starred };

  res.status(201).json({ data });
};
