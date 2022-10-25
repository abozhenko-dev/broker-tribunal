import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import * as mongoose from "mongoose";

import { schemaConfig } from "@common/configs";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema({ _id: false })
class FileMeta {
  @Prop()
  @ApiPropertyOptional()
  name?: string;

  @Prop()
  @ApiPropertyOptional()
  type?: string;

  @Prop()
  @ApiPropertyOptional()
  alt?: string;

  @Prop()
  @ApiPropertyOptional()
  title?: string;

  @Prop()
  @ApiPropertyOptional()
  width?: number;

  @Prop()
  @ApiPropertyOptional()
  height?: number;
}

const FileMetaModel = SchemaFactory.createForClass(FileMeta);

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema(schemaConfig)
export class File {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  link: string;

  @Prop({ type: FileMetaModel })
  @ApiPropertyOptional({ type: FileMeta })
  meta?: FileMeta;

  @Prop({ default: false })
  @ApiProperty({ default: false })
  isApproved: boolean;
}

export type FileDocument = File & mongoose.Document;
export const FileModel = SchemaFactory.createForClass(File);
