import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { Transform } from "class-transformer";
import { IsEnum, IsMongoId, IsNumber, IsOptional } from "class-validator";

import { IsSlug } from "@common/decorators";

import { HttpStatusMessages, LanguagesEnum } from "./enums";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class MongoIdDto {
  @IsMongoId()
  @ApiProperty()
  id: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class SlugDto {
  @IsSlug()
  slug: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class LangDto {
  @IsOptional()
  @IsEnum(LanguagesEnum)
  @ApiPropertyOptional({ enum: LanguagesEnum })
  lang?: LanguagesEnum;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiPropertyOptional()
  page?: number = 0;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiPropertyOptional()
  size?: number = 0;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class ApiResponseDto {
  @ApiProperty({ enum: HttpStatusMessages, example: HttpStatusMessages.OK })
  message: HttpStatusMessages;
}
