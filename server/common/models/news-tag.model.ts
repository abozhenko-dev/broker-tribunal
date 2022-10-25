import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { LanguagesEnum } from "@common/declarations";

@Schema(schemaConfig)
export class NewsTag {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  name: string;

  @Prop()
  @ApiPropertyOptional()
  description?: string;

  @Prop({ required: true, index: true })
  lang: LanguagesEnum;
}

export type NewsTagDocument = NewsTag & mongoose.Document;
export const NewsTagModel = SchemaFactory.createForClass(NewsTag);
