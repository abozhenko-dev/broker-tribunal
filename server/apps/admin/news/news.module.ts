import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { File, FileModel, News, NewsModel } from "@common/models";
import { BucketService } from "@common/services";

import { NewsController } from "./news.controller";

import { NewsService } from "./news.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsModel },
      { name: File.name, schema: FileModel }
    ])
  ],
  controllers: [NewsController],
  providers: [NewsService, BucketService]
})
export class AdminNewsModule {}
