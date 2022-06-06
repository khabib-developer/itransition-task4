import { IUser } from "../interfaces";
import { env } from "process";

import * as jwt from "jsonwebtoken";

class TokenService {
  generateToken(payload: IUser) {
    const accessToken = jwt.sign(payload, env.jwtSecretAccess!);
    return { ...payload, accessToken };
  }

  validateAccessToken(token: string): IUser | null {
    try {
      return jwt.verify(token, env.jwtSecretAccess!) as IUser;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
