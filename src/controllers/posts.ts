import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import { ANON_AUTH_TOKEN } from "@/const";
import { createAnonToken, setAuthToken, getAuthToken } from "@/utils";
import { verifyToken } from "@/lib/jwt";
import { admin } from "@/lib/firebase-admin";
import type { Post, PostCreateRequest, AuthToken } from "@/types";

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

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  // add anon cookie
  let token = getAuthToken(req);
  if (!getAuthToken(req)) {
    token = createAnonToken({ is_editor: false });

    // set cookie
    setAuthToken(res, token);
  }

  const cursor: string | null = req.query.cursor?.toString() || null;
  const limit = 20;

  const db = admin.firestore();
  let query = db
    .collection("posts")
    .where("deleted_at", "==", null)
    .where("is_draft", "==", false)
    .where("is_private", "==", false)
    .orderBy("priority", "desc")
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
  // if no auth, check password in body
  if (!getAuthToken(req)) {
    const { password } = req.body as PostCreateRequest;

    if (password !== process.env.POST_PASSWORD) {
      res.status(401).send({
        error: "password is incorrect",
      }); // Unauthorized
      return;
    }

    // create auth token
    const token = createAnonToken({ is_editor: true });

    // set cookie
    setAuthToken(res, token);
  }

  // get authToken from cookie
  try {
    const authToken = verifyToken(getAuthToken(req)!) as AuthToken;

    if (!authToken ?? !authToken.is_editor) {
      if (req.body.password !== process.env.POST_PASSWORD) {
        res.status(401).send({
          error: "password is incorrect",
        }); // Unauthorized
        return;
      }

      // create auth token
      const token = createAnonToken({ is_editor: true });

      // set cookie
      setAuthToken(res, token);
    }
  } catch (err) {
    res.status(401).send({
      error: "token is invalid",
    }); // Unauthorized
  }

  const { content, is_draft, is_private } = req.body as PostCreateRequest;
  if ((content ?? "").length == 0) {
    res.status(400).send({
      error: "content is required",
    });
    return;
  }

  const postId = uuidv4();

  // id is autogenerated by Firestore
  const post: Post = {
    content,
    is_draft,
    is_private,
    priority: 0,
    post_id: postId,
    is_legacy: false,

    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
    deleted_at: null,
  };

  const db = admin.firestore();
  await db.collection("posts").doc(postId).set(post);

  res.status(201).json({ data: post });
};
