import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";

import { Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";

import { IsSlug } from "@common/decorators";

import { LangDto, PaginationDto } from "../dto";
import { LanguagesEnum, SortEnum } from "../enums";
import { MetaDto } from "../meta/meta.dto";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class ArticleGetAllQuery extends IntersectionType(PaginationDto, LangDto) {
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsString({ each: true })
  @ApiPropertyOptional()
  tags?: string[];

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

export class ArticleCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsMongoId()
  @ApiProperty()
  poster: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  shortDescription?: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty()
  tags: string[];

  @IsOptional()
  @IsMongoId({ each: true })
  @ApiPropertyOptional()
  relatedArticles?: string[];

  @IsDateString()
  @ApiProperty()
  createdDate: Date;

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

export class ArticleUpdateBody extends PartialType(ArticleCreateBody) {}
