import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";

import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";

import { IsSlug } from "@common/decorators";

import { LangDto, PaginationDto } from "../dto";
import { LanguagesEnum, SortEnum, SortWithDefaultEnum } from "../enums";
import { FaqDto } from "../faq/faq.dto";
import { MetaDto } from "../meta/meta.dto";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class AdminRegulatorGetAllQuery extends IntersectionType(PaginationDto, LangDto) {
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

export class SiteRegulatorGetAllQuery extends IntersectionType(PaginationDto, LangDto) {
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

class RegulatorInfo {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  country?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  website?: string;
}

export class RegulatorCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsMongoId()
  @ApiProperty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  jurisdiction: string;

  @IsNumber()
  @ApiProperty()
  minDeposit: number;

  @IsDateString()
  @ApiProperty()
  foundingDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  about: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => RegulatorInfo)
  @ApiPropertyOptional()
  info?: RegulatorInfo;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MetaDto)
  @ApiProperty({ type: MetaDto })
  meta?: MetaDto;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  @Type(() => FaqDto)
  @ApiProperty({ type: [FaqDto] })
  faqs?: FaqDto[];

  @IsSlug()
  @ApiProperty()
  slug: string;

  @IsEnum(LanguagesEnum)
  @ApiProperty({ enum: LanguagesEnum })
  lang: LanguagesEnum;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class RegulatorUpdateBody extends PartialType(RegulatorCreateBody) {}
