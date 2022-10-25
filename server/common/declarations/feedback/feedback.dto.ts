import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { PaginationDto } from "../dto";
import { SortEnum } from "../enums";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class FeedbackGetAllQuery extends PaginationDto {
  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional({ default: SortEnum.DESC })
  sortByDate?: SortEnum = SortEnum.DESC;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class FeedbackComplaintBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  brokerName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  comment?: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class FeedbackConsultationBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  tradingExperience: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  comment?: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class FeedbackPromotionBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  comment?: string;
}
