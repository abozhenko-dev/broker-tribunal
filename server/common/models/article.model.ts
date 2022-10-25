/* eslint-disable no-use-before-define */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { LanguagesEnum } from "@common/declarations";

import { File } from "./file.model";
import { Meta, MetaModel } from "./meta.model";

@Schema(schemaConfig)
export class Article {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "File", required: true })
  @ApiProperty({ type: File, required: true })
  poster: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  content: string;

  @Prop()
  @ApiPropertyOptional()
  shortDescription?: string;

  @Prop()
  @ApiPropertyOptional()
  tags?: string[];

  @Prop({ default: 0, minlength: 1 })
  @ApiProperty()
  views?: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }] })
  @ApiPropertyOptional({ type: [Article] })
  relatedArticles?: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true })
  @ApiProperty({ type: Date })
  createdDate: Date;

  @Prop({ type: MetaModel })
  @ApiPropertyOptional({ type: Meta })
  meta?: Meta;

  @Prop({ required: true, index: true })
  @ApiProperty({ required: true })
  slug: string;

  @Prop({ required: true, index: true })
  lang: LanguagesEnum;
}

export type ArticleDocument = Article & mongoose.Document;
export const ArticleModel = SchemaFactory.createForClass(Article);
