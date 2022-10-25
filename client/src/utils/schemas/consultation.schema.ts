import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class ConsultationSchema {
  @IsNotEmpty({
    message: "required"
  })
  name: string;

  @IsEmail({}, {
    message: "email"
  })
  @IsNotEmpty({
    message: "required"
  })
  email: string;

  @MinLength(7, {
    message: "incorrectPhone"
  })
  @IsNotEmpty({
    message: "required"
  })
  phone: string;

  @IsNotEmpty({
    message: "required"
  })
  @IsString()
  agreement: string;

  @IsOptional()
  @IsString()
  tradingExperience?: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
