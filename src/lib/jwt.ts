import { sign, verify } from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

export const createToken = (payload: object, expiresIn = undefined) => {
  return sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  return verify(token, secret);
};
