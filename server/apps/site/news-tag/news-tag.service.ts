import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { NewsTagGetAllQueryDto } from "@common/declarations";
import { NewsTag, NewsTagDocument } from "@common/models";

@Injectable()
export class NewsTagService {
  constructor(@InjectModel(NewsTag.name) private readonly NewsTagModel: Model<NewsTagDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: NewsTagGetAllQueryDto) {
    const tags = await this.NewsTagModel.find({ lang: query.lang });
    return tags;
  }
}
