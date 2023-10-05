import { sign, verify } from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;
console.log("TOKEN", secret);

export const createToken = (payload: object, expiresIn = undefined) => {
  return sign(payload, secret, expiresIn ? { expiresIn } : {});
};

export const verifyToken = <T>(token: string) => {
  return verify(token, secret) as T;
};
