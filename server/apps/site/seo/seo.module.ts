import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Seo, SeoModel } from "@common/models";

import { SeoController } from "./seo.controller";

import { SeoService } from "./seo.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Seo.name, schema: SeoModel }])],
  controllers: [SeoController],
  providers: [SeoService]
})
export class SiteSeoModule {}
