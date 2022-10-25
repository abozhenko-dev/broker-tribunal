import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";

import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

import { IsSlug } from "@common/decorators";

import { LangDto, PaginationDto } from "../dto";
import { LanguagesEnum, SortEnum, SortWithDefaultEnum } from "../enums";
import { MetaDto } from "../meta/meta.dto";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class CategoryGetAllQuery extends IntersectionType(PaginationDto, LangDto) {
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

export class CategoryGetOneQuery extends IntersectionType(PaginationDto, LangDto) {
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

export class CategoryCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString({ each: true })
  @IsNotEmpty()
  @ApiProperty()
  description: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MetaDto)
  @ApiProperty({ type: MetaDto })
  meta?: MetaDto;

  @IsSlug()
  @ApiProperty()
  slug: string;

  @IsOptional()
  @IsEnum(LanguagesEnum)
  @ApiPropertyOptional({ enum: LanguagesEnum })
  lang?: LanguagesEnum;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class CategoryUpdateBody extends PartialType(CategoryCreateBody) {}
