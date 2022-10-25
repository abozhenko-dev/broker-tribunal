import { ApiProperty, ApiPropertyOptional, IntersectionType, PartialType } from "@nestjs/swagger";

import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
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
import { LanguagesEnum, SortEnum } from "../enums";
import { FaqDto } from "../faq/faq.dto";
import { MetaDto } from "../meta/meta.dto";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class BrokerGetAllQuery extends IntersectionType(PaginationDto, LangDto) {
  @IsOptional()
  @Transform(({ value }) => value.split(","))
  @IsString({ each: true })
  @ApiPropertyOptional()
  categories?: string[];

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

class BrokerInfo {
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

export class BrokerCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsMongoId({ each: true })
  @ApiProperty()
  categories: string[];

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
  @Type(() => BrokerInfo)
  @ApiPropertyOptional()
  info?: BrokerInfo;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isInCatalog?: boolean;

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

export class BrokerUpdateBody extends PartialType(BrokerCreateBody) {}
