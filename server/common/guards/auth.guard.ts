import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, Type, mixin } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { HttpStatusMessages } from "@common/declarations";
import { TokenService, UserService } from "@common/services";

export const AuthGuard = (): Type<CanActivate> => {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService,
      private readonly tokenService: TokenService
    ) {}

    async canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest();
      const accessToken = req.headers.authorization?.replace("Bearer ", "");

      if (this.configService.get("NODE_ENV") !== "development" && req.headers.origin !== this.configService.get("ADMIN_URL")) {
        throw new HttpException(HttpStatusMessages.FORBIDDEN, HttpStatus.FORBIDDEN);
      }

      if (!accessToken) throw new HttpException(HttpStatusMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);

      const { userId } = await this.tokenService.verifyAccessToken(accessToken);
      if (!userId) throw new HttpException(HttpStatusMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);

      const tokenEntity = await this.tokenService.find(userId);
      if (!tokenEntity) {
        throw new HttpException(HttpStatusMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
      }

      const user = await this.userService.getById(userId);

      if (!user) throw new HttpException(HttpStatusMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);

      req.user = user;

      return true;
    }
  }

  return mixin(AuthGuardMixin);
};
