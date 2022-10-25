import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Article, ArticleModel } from "@common/models";

import { BlogController } from "./blog.controller";

import { BlogService } from "./blog.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleModel }])],
  controllers: [BlogController],
  providers: [BlogService]
})
export class SiteBlogModule {}
