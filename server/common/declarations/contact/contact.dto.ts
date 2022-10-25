import { ApiProperty, PartialType } from "@nestjs/swagger";

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ContactCreateBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  telegram: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  facebook: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  instagram: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  whatsapp: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export class ContactUpdateBody extends PartialType(ContactCreateBody) {}
