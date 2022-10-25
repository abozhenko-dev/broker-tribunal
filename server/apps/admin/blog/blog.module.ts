import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Article, ArticleModel, File, FileModel } from "@common/models";
import { BucketService } from "@common/services";

import { BlogController } from "./blog.controller";

import { BlogService } from "./blog.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleModel },
      { name: File.name, schema: FileModel }
    ])
  ],
  controllers: [BlogController],
  providers: [BlogService, BucketService]
})
export class AdminBlogModule {}
