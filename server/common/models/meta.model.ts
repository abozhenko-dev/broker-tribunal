import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiPropertyOptional } from "@nestjs/swagger";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

@Schema({ _id: false })
export class Meta {
  @Prop()
  @ApiPropertyOptional()
  title?: string;

  @Prop()
  @ApiPropertyOptional()
  description?: string;

  @Prop({ default: false })
  @ApiPropertyOptional({ default: false })
  noIndex?: boolean;

  @Prop()
  @ApiPropertyOptional()
  breadcrumb?: string;

  @Prop()
  @ApiPropertyOptional()
  seo?: string;
}

export const MetaModel = SchemaFactory.createForClass(Meta);
