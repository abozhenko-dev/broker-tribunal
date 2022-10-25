import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";
import { FeedbackTypesEnum } from "@common/declarations";

@Schema(schemaConfig)
export class Feedback {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  type: FeedbackTypesEnum;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  email: string;

  @Prop()
  @ApiPropertyOptional()
  phone?: string;

  @Prop()
  @ApiPropertyOptional()
  brokerName?: string;

  @Prop()
  @ApiPropertyOptional()
  tradingExperience?: string;

  @Prop()
  @ApiPropertyOptional()
  comment: string;
}

export type FeedbackDocument = Feedback & mongoose.Document;
export const FeedbackModel = SchemaFactory.createForClass(Feedback);
