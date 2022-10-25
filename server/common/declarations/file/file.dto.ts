import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";

import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class FileUploadBody {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  alt?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiPropertyOptional()
  width?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @ApiPropertyOptional()
  height?: number;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class FileUpdateBody extends PartialType(FileUploadBody) {}
