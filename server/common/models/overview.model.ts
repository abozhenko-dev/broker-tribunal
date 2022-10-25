import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { LanguagesEnum } from "@common/declarations";

import { File } from "./file.model";
import { Meta, MetaModel } from "./meta.model";
import { OverviewCategory } from "./overview-category.model";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema(schemaConfig)
export class Overview {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "File", required: true })
  @ApiProperty({ type: File, required: true })
  logo: mongoose.Schema.Types.ObjectId;

  @Prop()
  @ApiPropertyOptional()
  shortDescription?: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  content: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "OverviewCategory" }], required: true })
  @ApiProperty({ type: [OverviewCategory], required: true })
  categories: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: MetaModel })
  @ApiPropertyOptional({ type: Meta })
  meta?: Meta;

  @Prop({ required: true, index: true })
  @ApiProperty({ required: true })
  slug: string;

  @Prop({ required: true, index: true })
  @ApiProperty({ required: true })
  lang: LanguagesEnum;
}

export type OverviewDocument = Overview & mongoose.Document;
export const OverviewModel = SchemaFactory.createForClass(Overview);
