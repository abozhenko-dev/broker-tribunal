import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";

@Schema(schemaConfig)
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password?: string;
}

export type UserDocument = User & mongoose.Document;
export const UserModel = SchemaFactory.createForClass(User);
