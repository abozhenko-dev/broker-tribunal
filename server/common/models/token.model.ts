import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

@Schema({ autoIndex: true }) // Expired at 1 week
export class Token {
  @Prop({ default: Date.now, expires: "1w" })
  createdAt: Date;

  @Prop({ unique: true, required: true })
  userId: string;

  @Prop({ unique: true, required: true })
  refreshToken: string;
}

export type TokenDocument = Token & Document;
export const TokenModel = SchemaFactory.createForClass(Token);
