import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";

@Schema({ ...schemaConfig, autoIndex: true }) // Expired at 1 day
export class Reset {
  @Prop({ default: Date.now, expires: "1d" })
  createdAt: Date;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  token: string;
}

export type ResetDocument = Reset & mongoose.Document;
export const ResetModel = SchemaFactory.createForClass(Reset);
