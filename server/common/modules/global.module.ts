import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import { Token, TokenModel, User, UserModel } from "@common/models";
import { TokenService, UserService } from "@common/services";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel },
      { name: Token.name, schema: TokenModel }
    ])
  ],
  controllers: [],
  providers: [JwtService, TokenService, UserService],
  exports: [JwtService, TokenService, UserService]
})
export class GlobalModule {}
