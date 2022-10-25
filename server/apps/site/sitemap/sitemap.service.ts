import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import {
  Article,
  ArticleDocument,
  Broker,
  BrokerDocument,
  Category,
  CategoryDocument,
  News,
  NewsDocument,
  Overview,
  OverviewCategory,
  OverviewCategoryDocument,
  OverviewDocument,
  Regulator,
  RegulatorDocument
} from "@common/models";

@Injectable()
export class SitemapService {
  constructor(
    @InjectModel(Article.name) private readonly BlogModel: Model<ArticleDocument>,
    @InjectModel(Broker.name) private readonly BrokerModel: Model<BrokerDocument>,
    @InjectModel(News.name) private readonly NewsModel: Model<NewsDocument>,
    @InjectModel(OverviewCategory.name) private readonly OverviewCategoryModel: Model<OverviewCategoryDocument>,
    @InjectModel(Overview.name) private readonly OverviewModel: Model<OverviewDocument>,
    @InjectModel(Category.name) private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel(Regulator.name) private readonly RegulatorModel: Model<RegulatorDocument>
  ) {}

  async getOne() {
    const articles = await this.BlogModel.find().select("lang slug");
    const news = await this.NewsModel.find().select("lang slug");
    const regulators = await this.RegulatorModel.find().select("lang slug");
    const categories = await this.CategoryModel.find().select("lang slug").lean();
    const brokers = await this.BrokerModel.find().select("lang slug");

    const overviewsCatsResponse = await this.OverviewCategoryModel.find().select("lang slug").lean();
    const overviewsCategories = [];
    for (const overviewsCategory of overviewsCatsResponse) {
      const overviews = await this.OverviewModel.find({ categories: overviewsCategory._id }).select("lang slug").lean();
      overviewsCategories.push({ ...overviewsCategory, overviews });
    }

    return { articles, brokers, news, categories, regulators, overviewsCategories };
  }
}
