import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { UserDocument } from "../models";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly UserModel: Model<UserDocument>) {}

  getById(id: string) {
    return this.UserModel.findById(id);
  }
}
