import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { NewsTag, NewsTagModel } from "@common/models";

import { NewsTagController } from "./news-tag.controller";

import { NewsTagService } from "./news-tag.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: NewsTag.name, schema: NewsTagModel }])],
  controllers: [NewsTagController],
  providers: [NewsTagService]
})
export class SiteNewsTagModule {}
