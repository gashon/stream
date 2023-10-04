import type { NextApiRequest, NextApiResponse } from "next";

import { ANON_AUTH_TOKEN } from "@/const";
import { createToken } from "@/lib/jwt";
import type { AuthToken } from "@/types";

export const createAnonToken = ({ is_editor }: Pick<AuthToken, "is_editor">): string => {
  const token = createToken({
    is_editor,
    created_at: new Date().toISOString(),
  } as AuthToken);

  return token;
};

export const getAuthToken = (req: NextApiRequest): string | undefined =>
  req.cookies[ANON_AUTH_TOKEN];

export const setAuthToken = (res: NextApiResponse, token: string): void => {
  res.setHeader("Set-Cookie", `${ANON_AUTH_TOKEN}=${token}; Path=/`);
};
