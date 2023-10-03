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
    deleted_at: undefined,
  };

  const db = admin.firestore();
  const docRef = await db.collection("posts").add(post);

  const doc = await docRef.get();
  const data = doc.data();

  res.status(201).json(data);
};
