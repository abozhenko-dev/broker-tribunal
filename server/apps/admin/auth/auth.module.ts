import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Reset, ResetModel, User, UserModel } from "@common/models";
import { MailService } from "@common/services";

import { AuthController } from "./auth.controller";

import { AuthService } from "./auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel },
      { name: Reset.name, schema: ResetModel }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService]
})
export class AdminAuthModule {}
