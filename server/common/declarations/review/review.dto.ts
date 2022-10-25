import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

import { IsSlug } from "@common/decorators";

import { PaginationDto } from "../dto";
import { SortEnum } from "../enums";

import { ReviewEntityEnum } from "./review.enums";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class ReviewGetAllQuery extends PaginationDto {
  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional()
  sortByDate?: SortEnum;

  @IsOptional()
  @IsEnum(SortEnum)
  @ApiPropertyOptional({ default: SortEnum.ASC })
  sortByStatus?: SortEnum = SortEnum.ASC;

  @IsEnum(ReviewEntityEnum)
  @ApiProperty({ type: ReviewEntityEnum, enum: ReviewEntityEnum })
  filterByEntity: ReviewEntityEnum;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class ReviewCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  authorName: string;

  @IsEmail()
  @ApiProperty()
  authorEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  authorPhone: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  @ApiProperty()
  problem: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  @ApiProperty()
  comment: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty()
  rating: number;

  @IsEnum(ReviewEntityEnum)
  @ApiProperty({ enum: ReviewEntityEnum })
  entity: ReviewEntityEnum;

  @IsSlug()
  @ApiProperty()
  entitySlug: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class ReviewApproveBody {
  @IsMongoId({ each: true })
  @ApiProperty()
  ids: string[];
}
