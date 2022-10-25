import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";

import { ArticleTagGetAllQueryDto } from "@common/declarations";
import { ArticleTag, ArticleTagDocument } from "@common/models";

@Injectable()
export class BlogTagService {
  constructor(@InjectModel(ArticleTag.name) private readonly BlogTagModel: Model<ArticleTagDocument>) {}

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  async getAll(query: ArticleTagGetAllQueryDto) {
    const tags = await this.BlogTagModel.find({ lang: query.lang });
    return tags;
  }
}
