import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ArticleTag, ArticleTagModel } from "@common/models";

import { BlogTagController } from "./blog-tag.controller";

import { BlogTagService } from "./blog-tag.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: ArticleTag.name, schema: ArticleTagModel }])],
  controllers: [BlogTagController],
  providers: [BlogTagService]
})
export class SiteBlogTagModule {}
