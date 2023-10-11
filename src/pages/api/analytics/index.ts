import type { NextApiRequest, NextApiResponse } from "next";

import { admin } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/jwt";
import { getAuthToken } from "@/utils";
import { UserAnalytic, AuthToken } from "@/types";

type Response = {
  data: UserAnalytic[];
  has_more: boolean;
  cursor: string | null;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const authToken = verifyToken<AuthToken>(getAuthToken(req)!);

  if (!authToken?.is_editor) {
    res.status(401).end(); // Unauthorized
    return;
  }

  const db = admin.firestore();

  const cursor: string | null = req.query.cursor?.toString() || null;
  const limit = 20;

  let query = db
    .collection("analytics")
    // .where("is_editor", "==", false)
    .orderBy("created_at", "desc")
    .limit(limit);

  if (cursor) {
    const cursorDoc = await db.collection("analytics").doc(cursor).get();

    if (!cursorDoc.exists) {
      res.status(404).end(); // Not Found
      return;
    }

    query = query.startAfter(cursorDoc);
  }

  const snapshot = await query.get();

  const analytics: UserAnalytic[] = [];
  snapshot.forEach((doc) => {
    analytics.push(doc.data() as UserAnalytic);
  });

  res.status(200).json({
    data: analytics,
    has_more: analytics.length === limit,
    cursor: analytics.length > 0 ? analytics[analytics.length - 1].user_id : null,
  });
};
