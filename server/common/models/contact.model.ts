import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";

@Schema(schemaConfig)
export class Contact {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  telegram: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  facebook: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  instagram: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  whatsapp: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  email: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  phone: string;
}

export type ContactDocument = Contact & mongoose.Document;
export const ContactModel = SchemaFactory.createForClass(Contact);
