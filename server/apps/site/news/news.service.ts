import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model } from "mongoose";

import { LangDto, NewsGetAllQuery, SlugDto } from "@common/declarations";
import { News, NewsDocument } from "@common/models";

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private readonly NewsModel: Model<NewsDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: NewsGetAllQuery) {
    const options: FilterQuery<NewsDocument> = { lang: query.lang };

    if (query.tags?.length) options.tags = { $in: query.tags };

    const skip = query.size * (query.page - 1);
    const news = await this.NewsModel.find(options).populate("poster").sort({ createdAt: -1 }).skip(skip).limit(query.size);
    const total = await this.NewsModel.count(options);

    return { data: news, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getLast(query: LangDto) {
    const news = await this.NewsModel.find({ lang: query.lang }).populate("poster").sort({ createdAt: -1 }).limit(4);
    return news;
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: SlugDto, query: LangDto) {
    const news = await this.NewsModel.findOne({ slug: params.slug, lang: query.lang }).populate([
      {
        path: "poster"
      },
      {
        path: "relatedNews",
        populate: "poster"
      }
    ]);

    if (news) {
      await news.updateOne({ $set: { views: news.views + 1 } });
    }

    return news;
  }
}
