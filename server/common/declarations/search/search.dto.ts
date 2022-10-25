import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { LangDto } from "../dto";

export class SearchGetAllQuery extends LangDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  filter: string;
}
