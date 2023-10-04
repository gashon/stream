import type { NextApiRequest, NextApiResponse } from "next";
import { postsHandler } from "@/controllers";
import { PostGetResponse, PostCreateResponse } from "@/types";

type Response = PostGetResponse | PostCreateResponse;

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  postsHandler.handle(req, res);
}
