import type { NextApiRequest, NextApiResponse } from "next";

import { admin } from "@/lib/firebase-admin";
import type { Post, PostCreateRequest } from "@/types";

type PostWithoutId = Omit<Post, "post_id">;

export const postsHandler = {
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

// TODO implement + infinite scroll
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO authorization check
  // TODO Add anon cookie if not present

  const cursor: string | null = req.query.cursor?.toString() || null;
  const limit = 10;

  const db = admin.firestore();
  let query = db
    .collection("posts")
    .where("deleted_at", "==", null)
    .where("is_draft", "==", false)
    .where("is_private", "==", false)
    .orderBy("created_at", "desc")
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

  const posts: Post[] = [];
  querySnapshot.forEach((doc) => {
    posts.push({
      post_id: doc.id,
      ...doc.data(),
    } as Post);
  });

  res.status(200).json({
    data: posts,
    has_more: posts.length === limit,
    cursor: posts.length > 0 ? posts[posts.length - 1].post_id : null,
  });
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO authorization check

  const { content, is_draft, is_private } = req.body as PostCreateRequest;

  // id is autogenerated by Firestore
  const post: PostWithoutId = {
    content,
    is_draft,
    is_private,

    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp(),
    deleted_at: null,
  };

  const db = admin.firestore();
  const docRef = await db.collection("posts").add(post);

  const doc = await docRef.get();
  const data = doc.data();

  res.status(201).json({ data });
};