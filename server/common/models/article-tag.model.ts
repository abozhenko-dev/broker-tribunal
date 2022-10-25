import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { LanguagesEnum } from "@common/declarations";

@Schema(schemaConfig)
export class ArticleTag {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  name: string;

  @Prop()
  @ApiPropertyOptional()
  description?: string;

  @Prop({ required: true, index: true })
  lang: LanguagesEnum;
}

export type ArticleTagDocument = ArticleTag & mongoose.Document;
export const ArticleTagModel = SchemaFactory.createForClass(ArticleTag);
