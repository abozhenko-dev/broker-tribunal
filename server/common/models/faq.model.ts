import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({ _id: false })
export class Faq {
  @Prop({ required: true })
  @ApiProperty({ required: true })
  title: string;

  @Prop({ required: true })
  @ApiProperty({ required: true })
  content: string[];
}

export const FaqModel = SchemaFactory.createForClass(Faq);
