import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";

import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { LangDto, PaginationDto } from "../dto";
import { LanguagesEnum, SortEnum } from "../enums";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class NewsTagGetAllQueryDto extends IntersectionType(PaginationDto, LangDto) {
  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional({ default: SortEnum.DESC })
  sortByDate?: SortEnum = SortEnum.DESC;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class NewsTagCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @IsEnum(LanguagesEnum)
  @ApiProperty({ enum: LanguagesEnum })
  lang: LanguagesEnum;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class NewsTagUpdateBody extends PartialType(NewsTagCreateBody) {}
