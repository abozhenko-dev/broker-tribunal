import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { ReviewEntityEnum } from "@common/declarations";

import { File } from "./file.model";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema(schemaConfig)
export class Review {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  authorName: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  authorEmail: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  authorPhone: string;

  @Prop({ maxlength: 2000, required: true })
  @ApiProperty({ maxLength: 2000, required: true })
  problem: string;

  @Prop({ maxlength: 10000, required: true })
  @ApiProperty({ maxLength: 10000, required: true })
  comment: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  rating: number;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  entity: ReviewEntityEnum;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  entitySlug: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "File" })
  @ApiProperty({ type: File })
  entityLogo: mongoose.Schema.Types.ObjectId;

  @Prop({ default: false })
  @ApiPropertyOptional({ default: false })
  isApproved?: boolean;
}

export type ReviewDocument = Review & mongoose.Document;
export const ReviewModel = SchemaFactory.createForClass(Review);
