import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { LanguagesEnum } from "@common/declarations";

import { Faq, FaqModel } from "./faq.model";
import { File } from "./file.model";
import { Meta, MetaModel } from "./meta.model";
import { Review } from "./review.model";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema({ _id: false })
class RegulatorInfo {
  @Prop()
  @ApiPropertyOptional()
  email?: string;

  @Prop()
  @ApiPropertyOptional()
  phone?: string;

  @Prop()
  @ApiPropertyOptional()
  country?: string;

  @Prop()
  @ApiPropertyOptional()
  website?: string;
}

const RegulatorInfoModel = SchemaFactory.createForClass(RegulatorInfo);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema(schemaConfig)
export class Regulator {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  name: string;

  @Prop({ default: 0, min: 0, max: 5 })
  @ApiPropertyOptional({ default: 0, minimum: 0, maximum: 5 })
  rating?: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "File", required: true })
  @ApiProperty({ type: File, required: true })
  logo: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  jurisdiction: string; // юрисдикция

  @Prop({ required: true })
  @ApiProperty({ required: true })
  minDeposit: number;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  foundingDate: Date; // дата основания

  @Prop({ required: true })
  @ApiProperty({ required: true })
  about: string;

  @Prop({ type: RegulatorInfoModel })
  @ApiPropertyOptional({ type: RegulatorInfoModel })
  info?: RegulatorInfo;

  @Prop({ type: MetaModel })
  @ApiPropertyOptional({ type: Meta })
  meta?: Meta;

  @Prop({ type: [FaqModel] })
  @ApiPropertyOptional({ type: [Faq] })
  faqs?: Faq[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }] })
  @ApiPropertyOptional({ type: [Review] })
  reviews?: mongoose.Schema.Types.ObjectId[];

  @Prop({ required: true, index: true })
  @ApiProperty({ required: true })
  slug: string;

  @Prop({ required: true, index: true })
  @ApiProperty({ required: true })
  lang: LanguagesEnum;
}

export type RegulatorDocument = Regulator & mongoose.Document;
export const RegulatorModel = SchemaFactory.createForClass(Regulator);
