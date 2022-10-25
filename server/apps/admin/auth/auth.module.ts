import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { User, UserModel } from "@common/models";

import { AuthController } from "./auth.controller";

import { AuthService } from "./auth.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserModel }])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AdminAuthModule {}
