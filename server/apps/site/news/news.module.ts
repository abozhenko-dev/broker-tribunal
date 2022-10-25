import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { News, NewsModel } from "@common/models";

import { NewsController } from "./news.controller";

import { NewsService } from "./news.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: News.name, schema: NewsModel }])],
  controllers: [NewsController],
  providers: [NewsService]
})
export class SiteNewsModule {}
