import { createToken } from "@/lib/jwt";
import type { AuthToken } from "@/types";

export const createAnonToken = ({ is_editor }: Pick<AuthToken, "is_editor">): string => {
  const token = createToken({
    is_editor,
    created_at: new Date().toISOString(),
  } as AuthToken);

  return token;
};
