import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { LanguagesEnum } from "@common/declarations";

import { Faq, FaqModel } from "./faq.model";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema(schemaConfig)
export class Metadata {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  title: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  description: string;

  @Prop()
  @ApiPropertyOptional()
  seo?: string;

  @Prop({ type: [FaqModel] })
  @ApiPropertyOptional({ type: [Faq] })
  faqs?: Faq[];

  @Prop({ default: false })
  @ApiProperty({ default: false })
  noIndex: boolean;

  @Prop()
  @ApiPropertyOptional()
  breadcrumb?: string;

  @Prop({ required: true, index: true })
  @ApiProperty({ required: true })
  slug: string;

  @Prop({ required: true, index: true })
  lang: LanguagesEnum;
}

export type MetadataDocument = Metadata & mongoose.Document;
export const MetadataModel = SchemaFactory.createForClass(Metadata);
