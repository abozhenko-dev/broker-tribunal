import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";

import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

import { IsSlug } from "@common/decorators";

import { LangDto, PaginationDto } from "../dto";
import { LanguagesEnum } from "../enums";
import { FaqDto } from "../faq/faq.dto";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class MetadataGetAllQuery extends IntersectionType(PaginationDto, LangDto) {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  searchByTitle?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  searchBySlug?: string;
}

export class MetadataCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  seo?: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  @Type(() => FaqDto)
  @ApiProperty({ type: [FaqDto] })
  faqs?: FaqDto[];

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  noIndex?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  breadcrumb?: string;

  @IsSlug()
  @ApiProperty()
  slug: string;

  @IsEnum(LanguagesEnum)
  @ApiProperty({ enum: LanguagesEnum })
  lang: LanguagesEnum;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class MetadataUpdateBody extends PartialType(MetadataCreateBody) {}
