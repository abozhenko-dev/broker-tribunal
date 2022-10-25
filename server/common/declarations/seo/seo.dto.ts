import { ApiProperty, PartialType } from "@nestjs/swagger";

import { IsNotEmpty, IsString } from "class-validator";

export class SeoCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  robots: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class SeoUpdateBody extends PartialType(SeoCreateBody) {}
