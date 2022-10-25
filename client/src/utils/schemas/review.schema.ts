
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class ReviewDto {
  @IsNotEmpty({
    message: "required"
  })
  rating: number;

  @IsNotEmpty({
    message: "required"
  })
  authorName: string;

  @IsEmail({}, {
    message: "email"
  })
  @IsNotEmpty({
    message: "required"
  })
  authorEmail: string;

  @MinLength(7, {
    message: "incorrectPhone"
  })
  @IsNotEmpty({
    message: "required"
  })
  authorPhone: string;

  @IsNotEmpty({
    message: "required"
  })
  problem: string;

  @IsString()
  entity: string;

  @IsString()
  entitySlug: string;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class ReviewSchema {
  @IsNotEmpty({
    message: "required"
  })
  rating: number;

  @IsNotEmpty({
    message: "required"
  })
  authorName: string;

  @IsEmail({}, {
    message: "email"
  })
  @IsNotEmpty({
    message: "required"
  })
  authorEmail: string;

  @MinLength(7, {
    message: "incorrectPhone"
  })
  @IsNotEmpty({
    message: "required"
  })
  authorPhone: string;

  @IsNotEmpty({
    message: "required"
  })
  problem: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
