import { ApiProperty } from "@nestjs/swagger";

import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AuthLoginBody {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @ApiProperty()
  password: string;
}

export class AuthRegisterBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(6)
  @MaxLength(32)
  @ApiProperty()
  password: string;
}
