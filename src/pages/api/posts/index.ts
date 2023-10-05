import type { NextApiRequest, NextApiResponse } from "next";
import { postsHandler } from "@/controllers";
import { PostGetResponse, PostCreateResponse } from "@/types";

type PostResponse = PostGetResponse | PostCreateResponse;

export default function handler(req: NextApiRequest, res: NextApiResponse<PostResponse>) {
  postsHandler.handle(req, res);
}
