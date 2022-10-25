import { ApiProperty } from "@nestjs/swagger";

import { IsEnum } from "class-validator";

import { LanguagesEnum } from "../enums";

export class TranslationUpdateBody {
  @IsEnum(LanguagesEnum)
  @ApiProperty({ enum: LanguagesEnum })
  lang: LanguagesEnum;

  @ApiProperty()
  translations: any;
}
