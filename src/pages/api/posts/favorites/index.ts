import type { NextApiRequest, NextApiResponse } from "next";
import { favoritesHandler } from "@/controllers";
import { PostGetResponse, PostCreateResponse } from "@/types";

type Response = PostGetResponse | PostCreateResponse;

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  favoritesHandler.handle(req, res);
}
