import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";

import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

import { IsSlug } from "@common/decorators";

import { LangDto, PaginationDto } from "../dto";
import { LanguagesEnum, SortEnum, SortWithDefaultEnum } from "../enums";
import { MetaDto } from "../meta/meta.dto";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class OverviewCategoryGetAllQuery extends IntersectionType(PaginationDto, LangDto) {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  searchByName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  searchBySlug?: string;

  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional({ default: SortEnum.DESC })
  sortByDate?: SortEnum = SortEnum.DESC;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class OverviewCategoryGetOneQuery extends IntersectionType(PaginationDto, LangDto) {
  @IsOptional()
  @IsEnum(SortWithDefaultEnum)
  @ApiPropertyOptional({ enum: SortWithDefaultEnum })
  sort?: SortWithDefaultEnum;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  search?: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class OverviewCategoryCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  description: string[];

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  showOnHome?: boolean;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MetaDto)
  @ApiProperty({ type: MetaDto })
  meta?: MetaDto;

  @IsSlug()
  @ApiProperty()
  slug: string;

  @IsEnum(LanguagesEnum)
  @ApiProperty({ enum: LanguagesEnum })
  lang: LanguagesEnum;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class OverviewCategoryUpdateBody extends PartialType(OverviewCategoryCreateBody) {}
