import type { NextApiRequest, NextApiResponse } from "next";

import { admin } from "@/lib/firebase-admin";
import { verifyToken } from "@/lib/jwt";
import { getAuthToken } from "@/utils";
import { UserAnalytic, AuthToken, AnalyticsGetResponse } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsGetResponse>,
) {
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res);
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

const handleGetRequest = async (
  req: NextApiRequest,
  res: NextApiResponse<AnalyticsGetResponse>,
) => {
  const authToken = verifyToken<AuthToken>(getAuthToken(req)!);

  if (!authToken?.is_editor) {
    res.status(401).end(); // Unauthorized
    return;
  }

  const db = admin.firestore();

  let query = db.collection("analytics").doc("views");

  const analyticsDoc = await query.get();

  if (!analyticsDoc.exists) {
    res.status(404).end(); // Not Found
    return;
  }

  const analytics = analyticsDoc.data() as UserAnalytic[];

  res.status(200).json({
    data: analytics,
  });
};
