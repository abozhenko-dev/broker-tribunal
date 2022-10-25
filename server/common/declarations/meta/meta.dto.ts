import { ApiPropertyOptional } from "@nestjs/swagger";

import { IsBoolean, IsOptional, IsString } from "class-validator";

export class MetaDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  noIndex?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  breadcrumb?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  seo?: string;
}
