import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginOkResponse {
  @ApiProperty()
  token: string;
}

export class AuthRefreshOkResponse {
  @ApiProperty()
  token: string;
}

export class AuthUserOkResponse {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
