import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {
  Article,
  ArticleModel,
  Broker,
  BrokerModel,
  Category,
  CategoryModel,
  News,
  NewsModel,
  Overview,
  OverviewCategory,
  OverviewCategoryModel,
  OverviewModel,
  Regulator,
  RegulatorModel
} from "@common/models";

import { SitemapController } from "./sitemap.controller";

import { SitemapService } from "./sitemap.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleModel },
      { name: Broker.name, schema: BrokerModel },
      { name: News.name, schema: NewsModel },
      { name: OverviewCategory.name, schema: OverviewCategoryModel },
      { name: Overview.name, schema: OverviewModel },
      { name: Category.name, schema: CategoryModel },
      { name: Regulator.name, schema: RegulatorModel }
    ])
  ],
  controllers: [SitemapController],
  providers: [SitemapService]
})
export class SiteSitemapModule {}
