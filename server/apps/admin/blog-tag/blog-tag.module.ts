import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Article, ArticleModel, ArticleTag, ArticleTagModel } from "@common/models";

import { BlogTagController } from "./blog-tag.controller";

import { BlogTagService } from "./blog-tag.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArticleTag.name, schema: ArticleTagModel },
      { name: Article.name, schema: ArticleModel }
    ])
  ],
  controllers: [BlogTagController],
  providers: [BlogTagService]
})
export class AdminBlogTagModule {}
