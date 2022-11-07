import { ApiProperty } from "@nestjs/swagger";

import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

import { Match } from "@common/decorators";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class AuthResetInitBody {
  @IsEmail()
  email: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class AuthResetFinishBody {
  @IsString()
  @IsNotEmpty()
  token: string;

  @MinLength(6)
  @MaxLength(32)
  password: string;

  @Match("password")
  passwordConfirm: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class AuthChangePasswordBody {
  @MinLength(6)
  @MaxLength(32)
  oldPassword: string;

  @MinLength(6)
  @MaxLength(32)
  newPassword: string;

  @Match("newPassword")
  newPasswordConfirm: string;
}
