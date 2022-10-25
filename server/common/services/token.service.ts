import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { HttpStatusMessages, TokenPayload } from "../declarations";
import { TokenDocument } from "../models";

@Injectable()
export class TokenService {
  constructor(
    @InjectModel("Token") private readonly TokenModel: Model<TokenDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async generateTokensPair(userId: string) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        expiresIn: "1h",
        secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET")
      }
    );

    const refreshToken = await this.jwtService.signAsync(
      { userId },
      {
        expiresIn: "1w",
        secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET")
      }
    );

    return {
      accessToken,
      refreshToken
    };
  }

  async verifyAccessToken(token: string) {
    try {
      const resp = await this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET")
      });

      return resp;
    } catch (e) {
      throw new HttpException(HttpStatusMessages.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
    }
  }

  async verifyRefreshToken(token: string) {
    try {
      const resp = await this.jwtService.verifyAsync<TokenPayload>(token, {
        secret: this.configService.get("JWT_REFRESH_TOKEN_SECRET")
      });

      return resp;
    } catch (e) {
      throw new HttpException(HttpStatusMessages.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
    }
  }

  // Additional layer of security for refresh tokens.
  // If refresh token is not valid, user will be logged out.
  save(userId: string, refreshToken: string) {
    return this.TokenModel.findOneAndUpdate({ userId }, { refreshToken }, { new: true, upsert: true }).lean().exec();
  }

  remove(refreshToken: string) {
    return this.TokenModel.deleteOne({ refreshToken }).exec();
  }

  find(userId: string) {
    return this.TokenModel.findOne({ userId }).lean().exec();
  }
}
