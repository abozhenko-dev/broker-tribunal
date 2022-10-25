import { Body, Controller, Get, HttpCode, Post, Req, Res } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { Request, Response } from "express";

import {
  ApiResponseDto,
  AuthLoginBody,
  AuthLoginOkResponse,
  AuthRefreshOkResponse,
  AuthRegisterBody,
  AuthUserOkResponse,
  IAuthRequest
} from "@common/declarations";
import { Auth } from "@common/decorators";

import { AuthService } from "./auth.service";

@Controller()
@ApiTags("admin/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("login")
  @ApiOkResponse({ type: AuthLoginOkResponse })
  login(@Res({ passthrough: true }) res: Response, @Body() body: AuthLoginBody) {
    return this.authService.login(res, body);
  }

  @HttpCode(200)
  @Post("register")
  @ApiOkResponse({ type: ApiResponseDto })
  register(@Body() body: AuthRegisterBody) {
    return this.authService.register(body);
  }

  @HttpCode(200)
  @Post("refresh")
  @ApiOkResponse({ type: AuthRefreshOkResponse })
  refresh(@Req() req: Request) {
    return this.authService.refresh(req);
  }

  @Auth()
  @HttpCode(200)
  @Post("logout")
  @ApiOkResponse({ type: ApiResponseDto })
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  @Auth()
  @HttpCode(200)
  @Get("user")
  @ApiOkResponse({ type: AuthUserOkResponse })
  user(@Req() req: IAuthRequest) {
    return this.authService.user(req);
  }
}
