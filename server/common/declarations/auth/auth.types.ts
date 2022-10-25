import { Request } from "express";

import { IUser } from "../user/user.types";

export interface IAuthRequest extends Request {
  user: IUser;
}
