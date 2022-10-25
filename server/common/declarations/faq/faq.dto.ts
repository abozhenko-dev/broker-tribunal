import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString } from "class-validator";

export class FaqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty()
  content: string[];
}
