import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { LanguagesEnum } from "@common/declarations";

import { Meta, MetaModel } from "./meta.model";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema(schemaConfig)
export class Category {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  description: string[];

  @Prop({ type: MetaModel })
  @ApiPropertyOptional({ type: Meta })
  meta?: Meta;

  @Prop({ required: true, index: true })
  @ApiProperty({ required: true })
  slug: string;

  @Prop({ required: true, index: true })
  lang: LanguagesEnum;
}

export type CategoryDocument = Category & mongoose.Document;
export const CategoryModel = SchemaFactory.createForClass(Category);
