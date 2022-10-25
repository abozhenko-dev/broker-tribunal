import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import { Model } from "mongoose";

import { AuthLoginBody, AuthRegisterBody, HttpStatusMessages, IAuthRequest } from "@common/declarations";
import { UserDocument } from "@common/models";
import { TokenService } from "@common/services";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private readonly UserModel: Model<UserDocument>,
    private readonly tokenService: TokenService
  ) {}

  async login(res: Response, body: AuthLoginBody) {
    const user = await this.UserModel.findOne({ email: body.email, isRegistered: true }).lean();
    if (!user) {
      throw new HttpException(HttpStatusMessages.USER_NOT_EXIST, HttpStatus.CONFLICT);
    }

    const isPasswordValid = await compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException(HttpStatusMessages.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    const tokens = await this.tokenService.generateTokensPair(user._id);

    // Saving tokens to db for additional security layer
    await this.tokenService.save(user._id, tokens.refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax"
    });

    return { token: tokens.accessToken };
  }

  async register(body: AuthRegisterBody) {
    const candidate = await this.UserModel.findOne({ email: body.email });
    if (candidate) throw new HttpException(HttpStatusMessages.USER_EXIST, HttpStatus.CONFLICT);

    // If there is no candidate or candidate is not registered, then we either create new candidate or update unregistered candidate
    // Else throw exception, because there already is registered candidate
    const password = await hash(body.password, 12);

    await this.UserModel.create({
      name: body.name,
      email: body.email,
      password
    });

    return { message: HttpStatusMessages.OK };
  }

  async refresh(req: Request) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new HttpException(HttpStatusMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const { userId } = await this.tokenService.verifyRefreshToken(refreshToken);
    const tokenEntity = await this.tokenService.find(userId);
    if (!tokenEntity) {
      throw new HttpException(HttpStatusMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const { accessToken } = await this.tokenService.generateTokensPair(userId);

    return { token: accessToken };
  }

  async logout(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new HttpException(HttpStatusMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    await this.tokenService.remove(refreshToken);

    res.clearCookie("refreshToken");

    return { message: HttpStatusMessages.OK };
  }

  user(req: IAuthRequest) {
    const { user } = req;
    if (!user) throw new HttpException(HttpStatusMessages.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);

    return {
      email: user.email,
      name: user.name
    };
  }
}
