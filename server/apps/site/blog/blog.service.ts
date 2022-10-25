import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { FilterQuery, Model } from "mongoose";

import { ArticleGetAllQuery, LangDto, SlugDto } from "@common/declarations";
import { Article, ArticleDocument } from "@common/models";

@Injectable()
export class BlogService {
  constructor(@InjectModel(Article.name) private readonly ArticleModel: Model<ArticleDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: ArticleGetAllQuery) {
    const options: FilterQuery<ArticleDocument> = { lang: query.lang };

    if (query.tags?.length) options.tags = { $in: query.tags };

    const skip = query.size * (query.page - 1);
    const articles = await this.ArticleModel.find(options)
      .populate("poster")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(query.size);

    const total = await this.ArticleModel.count(options);

    return { data: articles, total };
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getOne(params: SlugDto, query: LangDto) {
    const article = await this.ArticleModel.findOne({ slug: params.slug, lang: query.lang }).populate([
      {
        path: "poster"
      },
      {
        path: "relatedArticles",
        populate: "poster"
      }
    ]);

    if (article) {
      await article.updateOne({ $set: { views: article.views + 1 } });
    }

    return article;
  }
}
