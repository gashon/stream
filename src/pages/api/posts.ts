import type { NextApiRequest, NextApiResponse } from "next";
import { postsHandler } from "@/controllers";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  postsHandler.handle(req, res);
}
