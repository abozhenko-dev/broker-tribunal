import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";

import { Transform, Type } from "class-transformer";
import { IsEnum, IsMongoId, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

import { IsSlug } from "@common/decorators";

import { LangDto, PaginationDto } from "../dto";
import { LanguagesEnum, SortEnum } from "../enums";
import { MetaDto } from "../meta/meta.dto";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class OverviewGetAllQuery extends IntersectionType(PaginationDto, LangDto) {
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsString({ each: true })
  @ApiPropertyOptional()
  categories?: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  searchByTitle?: string;

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

export class OverviewGetByCategoryQuery extends IntersectionType(PaginationDto, LangDto) {}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class OverviewCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsMongoId()
  @ApiProperty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  shortDescription?: string;

  @IsMongoId({ each: true })
  @ApiProperty()
  categories: string[];

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

export class OverviewUpdateBody extends PartialType(OverviewCreateBody) {}
